import { isProd } from '../lib/env';
import * as AWS from 'aws-sdk';
import { buildReloader, ValueProvider } from '../utils/valueReloader';
import { EpicTest } from '@sdc/shared/dist/types';

interface VariantSample {
    variantName: string;
    avGbp: number;
    avGbpPerView: number;
    views: number;
}

export interface TestSample {
    testName: string;
    variants: VariantSample[];
    // the start of the interval
    timestamp: string;
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

function getBanditSamplesForTest(testName: string): Promise<TestSample[]> {
    // TODO - fetch + validate
    return Promise.resolve([]);
}

interface BanditData {
    testName: string;
    variants: {
        variantName: string;
        mean: number;
    };
}

function buildBanditDataForTest(testName: string): Promise<BanditData> {
    // TODO - get samples and calculate variant means
}

function buildBanditData(epicTestsProvider: ValueProvider<EpicTest[]>): Promise<BanditData[]> {
    const testNames = epicTestsProvider.get().map((test) => test.name);
    return Promise.all(testNames.map((name) => buildBanditDataForTest(name)));
}

const buildBanditDataReloader = (epicTestsProvider: ValueProvider<EpicTest[]>) =>
    buildReloader(buildBanditData(epicTestsProvider), 60 * 1000);

// TODO - pass to epicRouter and use
export { getBanditSamplesForTest };
