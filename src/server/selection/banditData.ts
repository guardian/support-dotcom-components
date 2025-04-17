import * as AWS from 'aws-sdk';
import { z } from 'zod';
import type {
    BanditMethodology,
    BannerTest,
    Channel,
    EpicTest,
    Test,
    Variant,
} from '../../shared/types';
import { isProd } from '../lib/env';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';
import { buildReloader } from '../utils/valueReloader';
import type { ValueProvider } from '../utils/valueReloader';

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

interface BanditTestConfig {
    testName: string; // this may be specific to the methodology, e.g. MY_TEST_EpsilonGreedyBandit-0.5
    channel: Channel;
    variantNames: string[];
    sampleCount?: number;
}

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

async function getBanditSamplesForTest(
    testName: string,
    channel: Channel,
    sampleCount?: number,
): Promise<TestSample[]> {
    const queryResult = await queryForTestSamples(testName, channel, sampleCount);

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
    sortedVariants: BanditVariantData[];  // sorted by mean, highest first
}

function getDefaultWeighting(test: BanditTestConfig): BanditData {
    // No samples yet, set all means to zero to allow random selection
    return {
        testName: test.testName,
        sortedVariants: test.variantNames.map((variantName) => ({
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

async function buildBanditDataForTest(test: BanditTestConfig): Promise<BanditData> {
    if (test.variantNames.length === 0) {
        // No variants have been added to the test yet
        return {
            testName: test.testName,
            sortedVariants: [],
        };
    }

    const samples = await getBanditSamplesForTest(test.testName, test.channel, test.sampleCount);

    if (samples.length < MINIMUM_SAMPLES) {
        return getDefaultWeighting(test);
    }

    const variantMeans = calculateMeanPerVariant(samples, test);
    const variantsSortedByMeanDescending = variantMeans.sort((a, b) => b.mean - a.mean);

    return {
        testName: test.testName,
        sortedVariants: variantsSortedByMeanDescending,
    };
}

// Return config for each bandit methodology in this test
function getBanditTestConfigs<V extends Variant, T extends Test<V>>(test: T): BanditTestConfig[] {
    const bandits: BanditMethodology[] = (test.methodologies ?? []).filter(
        (method) => method.name === 'EpsilonGreedyBandit' || method.name === 'Roulette',
    ) as BanditMethodology[];

    return bandits.map((method) => ({
        testName: method.testName ?? test.name, // if the methodology should be tracked with a different name then use that
        channel: test.channel,
        variantNames: test.variants.map((v) => v.name),
        sampleCount: method.sampleCount,
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
                    `Error fetching bandit samples for test ${banditTestConfig.testName} from Dynamo: ${error.message}`,
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
