import { isProd } from '../lib/env';
import * as AWS from 'aws-sdk';
import { buildReloader, ValueProvider } from '../utils/valueReloader';
import { EpicTest } from '@sdc/shared/dist/types';
import * as z from 'zod';
import { logError } from '../utils/logging';
import { putMetric } from '../utils/cloudwatch';

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
function queryForTestSamples(testName: string, sampleCount?: number) {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
    return docClient
        .query({
            TableName: `support-bandit-${isProd ? 'PROD' : 'CODE'}`,
            KeyConditionExpression: 'testName = :testName',
            ExpressionAttributeValues: {
                ':testName': testName,
            },
            ScanIndexForward: false, // newest first
            ...(sampleCount ? { Limit: sampleCount } : {}),
        })
        .promise();
}

async function getBanditSamplesForTest(testName: string): Promise<TestSample[]> {
    const queryResult = await queryForTestSamples(testName);

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

function getDefaultWeighting(epicTest: EpicTest): BanditData {
    // No samples yet, set all means to zero to allow random selection
    return {
        testName: epicTest.name,
        bestVariants: epicTest.variants.map((variant) => ({
            variantName: variant.name,
            mean: 0,
        })),
    };
}

function calculateMeanPerVariant(samples: TestSample[], epicTest: EpicTest): BanditVariantData[] {
    const allVariantSamples = samples.flatMap((sample) => sample.variants);
    const variantNames = epicTest.variants.map((variant) => variant.name);

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

async function buildBanditDataForTest(epicTest: EpicTest): Promise<BanditData> {
    const samples = await getBanditSamplesForTest(epicTest.name);

    if (samples.length === 0) {
        return getDefaultWeighting(epicTest);
    }

    const variantMeans = calculateMeanPerVariant(samples, epicTest);
    const bestVariants = calculateBestVariants(variantMeans);

    return {
        testName: epicTest.name,
        bestVariants,
    };
}

function buildBanditData(epicTestsProvider: ValueProvider<EpicTest[]>): Promise<BanditData[]> {
    const banditTests = epicTestsProvider.get().filter((epicTest) => epicTest.isBanditTest);
    return Promise.all(
        banditTests.map((epicTest) =>
            buildBanditDataForTest(epicTest).catch((error) => {
                logError(
                    `Error fetching bandit samples for test ${epicTest.name} from Dynamo: ${error.message}`,
                );
                putMetric('bandit-data-load-error');
                return Promise.reject(error);
            }),
        ),
    );
}

const buildBanditDataReloader = (epicTestsProvider: ValueProvider<EpicTest[]>) =>
    buildReloader(() => buildBanditData(epicTestsProvider), 60 * 5);

export { buildBanditDataReloader };
