import { isProd } from '../lib/env';
import * as AWS from 'aws-sdk';
import { buildReloader, ValueProvider } from '../utils/valueReloader';
import { EpicTest } from '@sdc/shared/dist/types';
import * as z from 'zod';

const variantSampleSchema = z.object({
    variantName: z.string(),
    avGbp: z.number(),
    avGbpPerView: z.number(),
    views: z.number(),
});

const testSampleSchema = z.object({
    testName: z.string(),
    variants: z.array(variantSampleSchema),
    // the start of the interval
    timestamp: z.string(),
});

const queryResultSchema = z.array(testSampleSchema);

type TestSample = z.infer<typeof testSampleSchema>;

export async function testBanditLocally(): Promise<string> {
    const queryResult = await buildBanditDataForTest('2024-03-05_EPIC_PRIMARY__US');
    console.log('buildBanditDataForTest', queryResult);
    return 'success';
}

function queryForTestSamples(testName: string, nSamples: number) {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
    return docClient
        .query({
            TableName: `support-bandit-${isProd ? 'PROD' : 'CODE'}`,
            KeyConditionExpression: 'testName = :testName',
            ExpressionAttributeValues: {
                ':testName': testName,
            },
            ScanIndexForward: false, // newest first
            Limit: nSamples,
        })
        .promise();
}

async function getBanditSamplesForTest(testName: string): Promise<TestSample[]> {
    const queryResult = await queryForTestSamples(testName, 2);

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

interface BanditData {
    testName: string;
    variants: BanditVariantData[];
}

async function buildBanditDataForTest(testName: string): Promise<BanditData> {
    const samples = await getBanditSamplesForTest(testName);

    const variantsData = samples.flatMap((sample) => sample.variants);
    const variantNames = Array.from(new Set(variantsData.map((variant) => variant.variantName)));

    const variantMeans = variantNames.map((variantName) => {
        const filteredVariantsData = variantsData.filter(
            (variant) => variant.variantName === variantName,
        );

        const sum = filteredVariantsData.reduce((acc, curr) => acc + curr.avGbpPerView, 0);
        const mean = sum / filteredVariantsData.length;

        return {
            variantName,
            mean,
        };
    });

    return {
        testName,
        variants: variantMeans,
    };
}

// function buildBanditData(epicTestsProvider: ValueProvider<EpicTest[]>): Promise<BanditData[]> {
//     const testNames = epicTestsProvider.get().map((test) => test.name);
//     return Promise.all(testNames.map((name) => buildBanditDataForTest(name)));
// }

// const buildBanditDataReloader = (epicTestsProvider: ValueProvider<EpicTest[]>) =>
//     buildReloader(buildBanditData(epicTestsProvider), 60 * 1000);

// // TODO - pass to epicRouter and use
// export { getBanditSamplesForTest };
