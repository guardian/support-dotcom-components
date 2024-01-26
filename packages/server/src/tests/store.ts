import { BannerDesignFromTool } from '@sdc/shared/src/types';
import * as AWS from 'aws-sdk';
import { isProd } from '../lib/env';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';
import type { ZodSchema } from 'zod';

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

export function removeNullValues(obj: object): object {
    return Object.entries(obj)
        .filter(([, v]) => v != null)
        .reduce((acc, [k, v]) => {
            if (Array.isArray(v)) {
                return {
                    ...acc,
                    [k]: v
                        .filter((item) => item !== null)
                        .map((item) => {
                            if (item === Object(item)) {
                                return removeNullValues(item);
                            } else {
                                return item;
                            }
                        }),
                };
            } else if (v === Object(v)) {
                return {
                    ...acc,
                    [k]: removeNullValues(v),
                };
            }
            return {
                ...acc,
                [k]: v,
            };
        }, {});
}

// Stolen from Guardian/libs! todo, actually import
/** Type guard for values that are neither `null` nor `undefined` */
export const isNonNullable = <T>(_: T): _ is NonNullable<T> => _ !== undefined && _ !== null;

export const getTests = <T extends { priority: number }>(
    channel: ChannelTypes,
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
                        logError(`Error parsing test from Dynamo: ${parseResult.error.message}`);
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
