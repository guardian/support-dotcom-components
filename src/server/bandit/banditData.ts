import { isProd } from '../lib/env';
import * as AWS from 'aws-sdk';
import { buildReloader, ValueProvider } from '../utils/valueReloader';
import { BannerTest, Channel, EpicTest, Methodology, Test, Variant } from '../../shared/types';
import { z } from 'zod';
import { logError } from '../utils/logging';
import { putMetric } from '../utils/cloudwatch';

// We must have this many hourly samples before the bandit strategy begins. Variants will be selected at random until then
const MINIMUM_SAMPLES = 6;

const variantSampleSchema = z.object({
    variantName: z.string(),
    annualisedValueInGBP: z.number(),
    annualisedValueInGBPPerView: z.number(),
    views: z.number(),
});

type VariantSample = z.infer<typeof variantSampleSchema>;

const testSampleSchema = z.object({
    testName: z.string(),
    variants: z.array(variantSampleSchema),
    // the start of the interval
    timestamp: z.string(),
});

const queryResultSchema = z.array(testSampleSchema);

type TestSample = z.infer<typeof testSampleSchema>;

// If sampleCount is not provided, all samples will be returned
function queryForTestSamples(testName: string, channel: Channel, sampleCount?: number) {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
    return docClient
        .query({
            TableName: `support-bandit-${isProd ? 'PROD' : 'CODE'}`,
            KeyConditionExpression: 'testName = :testName',
            ExpressionAttributeValues: {
                // In the bandit data table we prefix the testName with the channel
                ':testName': `${channel}_${testName}`,
            },
            ScanIndexForward: false, // newest first
            ...(sampleCount ? { Limit: sampleCount } : {}),
        })
        .promise();
}

async function getBanditSamplesForTest(testName: string, channel: Channel): Promise<TestSample[]> {
    const queryResult = await queryForTestSamples(testName, channel);

    const parsedResults = queryResultSchema.safeParse(queryResult.Items);

    if (!parsedResults.success) {
        throw new Error(`Error parsing bandit samples: ${parsedResults.error.toString()}`);
    }

    return parsedResults.data;
}

interface BanditVariantData {
    variantName: string;
    mean: number;
}

export interface BanditData {
    testName: string;
    bestVariants: BanditVariantData[]; // will contain more than 1 variant if there is a tie
}

function getDefaultWeighting(test: BanditTestConfig): BanditData {
    // No samples yet, set all means to zero to allow random selection
    return {
        testName: test.testName,
        bestVariants: test.variantNames.map((variantName) => ({
            variantName,
            mean: 0,
        })),
    };
}

function calculateMeanPerVariant(
    samples: TestSample[],
    test: BanditTestConfig,
): BanditVariantData[] {
    const allVariantSamples = samples.flatMap((sample) => sample.variants);

    return test.variantNames.map((variantName) => {
        const variantSamples = allVariantSamples.filter(
            (variantSample) => variantSample.variantName === variantName,
        );

        const mean = calculateOverallMeanForVariant(variantSamples);

        return {
            variantName,
            mean,
        };
    });
}

function calculateOverallMeanForVariant(samples: VariantSample[]): number {
    const population = samples.reduce((acc, sample) => acc + sample.views, 0);
    return samples.reduce(
        (acc, sample) => acc + (sample.views / population) * sample.annualisedValueInGBPPerView,
        0,
    );
}

function calculateBestVariants(variantMeans: BanditVariantData[]): BanditVariantData[] {
    const variantsSortedByMeanDescending = variantMeans.sort((a, b) => b.mean - a.mean);
    const highestMean = variantsSortedByMeanDescending[0].mean;
    return variantMeans.filter((variant) => variant.mean === highestMean);
}

async function buildBanditDataForTest(test: BanditTestConfig): Promise<BanditData> {
    if (test.variantNames.length === 0) {
        // No variants have been added to the test yet
        return {
            testName: test.testName,
            bestVariants: [],
        };
    }

    const samples = await getBanditSamplesForTest(test.testName, test.channel);

    if (samples.length < MINIMUM_SAMPLES) {
        return getDefaultWeighting(test);
    }

    const variantMeans = calculateMeanPerVariant(samples, test);
    const bestVariants = calculateBestVariants(variantMeans);

    return {
        testName: test.testName,
        bestVariants,
    };
}

interface BanditTestConfig {
    testName: string;
    channel: Channel;
    variantNames: string[];
}

// Return config for each bandit methodology in this test
function getBanditTestConfigs<V extends Variant, T extends Test<V>>(test: T): BanditTestConfig[] {
    const bandits: Methodology[] = test.methodologies?.filter(
        (method) => method.name === 'EpsilonGreedyBandit',
    );
    return bandits.map((method) => ({
        testName: method.testName ?? test.name, // if the methodology should be tracked with a different name then use that
        channel: test.channel,
        variantNames: test.variants.map((v) => v.name),
    }));
}

function buildBanditData(
    epicTestsProvider: ValueProvider<EpicTest[]>,
    bannerTestsProvider: ValueProvider<BannerTest[]>,
): Promise<BanditData[]> {
    const allTests = [...epicTestsProvider.get(), ...bannerTestsProvider.get()];
    // For each test, get any bandit methodologies so that we can fetch sample data
    const banditTests: BanditTestConfig[] = allTests.flatMap((test) => getBanditTestConfigs(test));

    return Promise.all(
        banditTests.map((banditTestConfig) =>
            buildBanditDataForTest(banditTestConfig).catch((error) => {
                logError(
                    `Error fetching bandit samples for test ${banditTestConfig.name} from Dynamo: ${error.message}`,
                );
                putMetric('bandit-data-load-error');
                return Promise.reject(error);
            }),
        ),
    );
}

const buildBanditDataReloader = (
    epicTestsProvider: ValueProvider<EpicTest[]>,
    bannerTestsProvider: ValueProvider<BannerTest[]>,
) => buildReloader(() => buildBanditData(epicTestsProvider, bannerTestsProvider), 60 * 5);

export { buildBanditDataReloader };
