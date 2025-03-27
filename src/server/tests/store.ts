import { isNonNullable } from '@guardian/libs';
import * as AWS from 'aws-sdk';
import type { ZodSchema } from 'zod';
import type { BannerDesignFromTool, Channel } from '../../shared/types';
import { isProd } from '../lib/env';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';
import { removeNullValues } from '../utils/removeNullValues';

const stage = isProd ? 'PROD' : 'CODE';

export const getTests = <T extends { priority: number }>(
    channel: Channel,
    schema: ZodSchema<T>,
): Promise<T[]> =>
    queryChannel(channel, stage)
        .then((tests) =>
            (tests.Items ?? [])
                .map((test) => {
                    const testWithNullValuesRemoved = removeNullValues(test);

                    const parseResult = schema.safeParse(testWithNullValuesRemoved);

                    if (parseResult.success) {
                        return parseResult.data;
                    } else {
                        logError(
                            `Error parsing test (${test.name}) from Dynamo: ${parseResult.error.message}`,
                        );
                        putMetric('channel-tests-error');
                        return null;
                    }
                })
                .filter(isNonNullable)
                .sort((a, b) => a.priority - b.priority),
        )
        .catch((error) => {
            logError(`Error reading tests from Dynamo: ${error.message}`);
            putMetric('channel-tests-error');
            return Promise.reject(error);
        });

function queryChannel(channel: Channel, stage: string) {
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
            ExpressionAttributeValues: {
                ':draft': 'Draft',
            },
            ExpressionAttributeNames: {
                '#status': 'status', // Necessary because status is a reserved word in dynamodb
            },
            FilterExpression: '#status <> :draft',
        })
        .promise()
        .then((results) => (results.Items || []) as BannerDesignFromTool[])
        .catch((error) => {
            logError(`Error reading banner designs from Dynamo: ${error.message}`);
            putMetric('banner-designs-load-error');
            return error;
        });
};
