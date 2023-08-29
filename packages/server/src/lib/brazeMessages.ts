import * as AWS from 'aws-sdk';
import { isProd } from './env';
import { logError, logInfo } from '../utils/logging';
import { putMetric } from '../utils/cloudwatch';
import { Cta } from '@sdc/shared/dist/types';

const stage = isProd ? 'PROD' : 'CODE';

export interface BrazeEpicTest {
    testName: string;
    variantName: string;
    tagIds: string[];
    paragraphs: string[];
    highlightedText?: string;
    cta: Cta;
}

export const fetchBrazeEpicTests = async (brazeUUID: string): Promise<BrazeEpicTest[]> => {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

    const tests = await docClient
        .query({
            TableName: `braze-messages-${stage.toUpperCase()}`,
            KeyConditionExpression: 'brazeUUID = :brazeUUID',
            ExpressionAttributeValues: {
                ':brazeUUID': brazeUUID,
            },
        })
        .promise()
        .then(result => result.Items ?? [])
        .catch(error => {
            logError(`Error fetching super mode articles from dynamo: ${error}`);
            putMetric('super-mode-error');
            return [];
        });

    logInfo(`Got braze epic tests: ${tests}`);

    return tests as BrazeEpicTest[];
};
