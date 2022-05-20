import * as AWS from 'aws-sdk';
import { isProd } from '../lib/env';
import { logError } from '../utils/logging';

const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const stage = isProd ? 'PROD' : 'CODE';

export type ChannelTypes = 'Epic' | 'EpicAMP' | 'EpicAppleNews' | 'EpicLiveblog' | 'EpicHoldback' | 'Banner1' | 'Banner2' | 'Header';

export const getTests = <T>(channel: ChannelTypes): Promise<T[]> => queryChannel(channel, stage, docClient)
    .then(tests => {
        console.log(tests.Items);
        return (tests.Items ?? []) as T[];
    })
    .catch(error => {
        logError(`Error reading tests from Dynamo: ${error.message}`);
        return [];
    });

function queryChannel(
    channel: ChannelTypes,
    stage: string,
    docClient: AWS.DynamoDB.DocumentClient,
) {
    return docClient
        .query({
            TableName: `support-admin-console-channel-tests-${stage.toUpperCase()}`,
            KeyConditionExpression: 'channel = :channel',
            ExpressionAttributeValues: {
                ':channel': channel
            },
        })
        .promise();
}