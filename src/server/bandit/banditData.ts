import { isProd } from '../lib/env';
import * as AWS from 'aws-sdk';
import { buildReloader, ValueProvider } from '../utils/valueReloader';
import { BannerTest, EpicTest, Test, Variant } from '../../shared/types';
import { z } from 'zod';
import { logError } from '../utils/logging';
import { putMetric } from '../utils/cloudwatch';
import { ChannelTypes } from '../tests/store';

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
function queryForTestSamples(testName: string, channel: ChannelTypes, sampleCount?: number) {
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
    channel: ChannelTypes,
): Promise<TestSample[]> {
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

function getDefaultWeighting<V extends Variant, T extends Test<V>>(test: T): BanditData {
    // No samples yet, set all means to zero to allow random selection
    return {
        testName: test.name,
        bestVariants: test.variants.map((variant) => ({
            variantName: variant.name,
            mean: 0,
        })),
    };
}

function calculateMeanPerVariant<V extends Variant, T extends Test<V>>(
    samples: TestSample[],
    test: T,
): BanditVariantData[] {
    const allVariantSamples = samples.flatMap((sample) => sample.variants);
    const variantNames = test.variants.map((variant) => variant.name);

    return variantNames.map((variantName) => {
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

async function buildBanditDataForTest<V extends Variant, T extends Test<V>>(
    test: T,
    channel: ChannelTypes,
): Promise<BanditData> {
    if (test.variants.length === 0) {
        // No variants have been added to the test yet
        return {
            testName: test.name,
            bestVariants: [],
        };
    }

    const samples = await getBanditSamplesForTest(test.name, channel);

    if (samples.length === 0) {
        return getDefaultWeighting(test);
    }

    const variantMeans = calculateMeanPerVariant(samples, test);
    const bestVariants = calculateBestVariants(variantMeans);

    return {
        testName: test.name,
        bestVariants,
    };
}

function hasBanditMethodology<V extends Variant, T extends Test<V>>(test: T): boolean {
    return !!test.methodologies?.find((method) => method.name === 'EpsilonGreedyBandit');
}

function buildBanditData(
    epicTestsProvider: ValueProvider<EpicTest[]>,
    bannerTestsProvider: ValueProvider<BannerTest[]>,
): Promise<BanditData[]> {
    const banditTests = [...epicTestsProvider.get(), ...bannerTestsProvider.get()].filter(
        hasBanditMethodology,
    );
    return Promise.all(
        banditTests.map((test) =>
            buildBanditDataForTest(test, test.channel).catch((error) => {
                logError(
                    `Error fetching bandit samples for test ${test.name} from Dynamo: ${error.message}`,
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
