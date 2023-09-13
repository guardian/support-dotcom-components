import { BannerDesignFromTool } from '@sdc/shared/src/types';
import * as AWS from 'aws-sdk';
import { isProd } from '../lib/env';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';

const stage = isProd ? 'PROD' : 'CODE';

export type ChannelTypes =
    | 'Epic'
    | 'EpicAMP'
    | 'EpicAppleNews'
    | 'EpicLiveblog'
    | 'EpicHoldback'
    | 'Banner1'
    | 'Banner2'
    | 'Header';

export const getTests = <T>(channel: ChannelTypes): Promise<T[]> =>
    queryChannel(channel, stage)
        .then(tests => (tests.Items ?? []).sort((a, b) => a.priority - b.priority) as T[])
        .catch(error => {
            logError(`Error reading tests from Dynamo: ${error.message}`);
            putMetric('channel-tests-error');
            return error;
        });

function queryChannel(channel: ChannelTypes, stage: string) {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
    return docClient
        .query({
            TableName: `support-admin-console-channel-tests-${stage.toUpperCase()}`,
            KeyConditionExpression: 'channel = :channel',
            ExpressionAttributeValues: {
                ':channel': channel,
                ':archived': 'Archived',
            },
            ExpressionAttributeNames: {
                '#status': 'status', // Necessary because status is a reserved word in dynamodb
            },
            FilterExpression: '#status <> :archived',
        })
        .promise();
}

export const getBannerDesigns = (): Promise<BannerDesignFromTool[]> => {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
    return docClient
        .scan({
            TableName: `support-admin-console-banner-designs-${stage.toUpperCase()}`,
        })
        .promise()
        .then(results => (results.Items || []) as BannerDesignFromTool[]);
};
