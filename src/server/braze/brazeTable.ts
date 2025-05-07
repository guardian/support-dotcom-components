import * as AWS from 'aws-sdk';
import { isProd } from '../lib/env';
import { logError, logInfo } from '../utils/logging';
import type { BrazeEpicTest } from './brazeEpic';

const stage = isProd ? 'PROD' : 'CODE';
const getDocClient = () => new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const getTableName = (stage: string) => `braze-messages-${stage.toUpperCase()}`;

export const fetchBrazeEpicTests = async (brazeUUID: string): Promise<BrazeEpicTest[]> => {
    const docClient = getDocClient();

    const tests = await docClient
        .query({
            TableName: getTableName(stage),
            KeyConditionExpression: 'brazeUUID = :brazeUUID',
            ExpressionAttributeValues: {
                ':brazeUUID': brazeUUID,
            },
        })
        .promise()
        .then((result) => result.Items ?? [])
        .catch((error) => {
            logError(`Error fetching braze epic tests from dynamo: ${error}`);
            return [];
        });

    // eslint-disable-next-line @typescript-eslint/no-base-to-string,@typescript-eslint/restrict-template-expressions -- no
    logInfo(`Got braze epic tests: ${tests}`);

    return tests as BrazeEpicTest[];
};

export const addBrazeEpicTest = async (brazeUUID: string, test: BrazeEpicTest): Promise<void> => {
    const docClient = getDocClient();

    return docClient
        .put({
            TableName: getTableName(stage),
            Item: { brazeUUID, ...test },
        })
        .promise()
        .then(() => undefined);
};

export const removeBrazeEpicTest = async (brazeUUID: string, testName: string): Promise<void> => {
    const docClient = getDocClient();

    return docClient
        .delete({
            TableName: getTableName(stage),
            Key: {
                brazeUUID,
                testName,
            },
        })
        .promise()
        .then(() => undefined);
};
