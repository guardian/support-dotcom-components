import { QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { isNonNullable } from '@guardian/libs';
import type { ZodSchema } from 'zod';
import type { BannerDesignFromTool, Channel } from '../../shared/types';
import { stage } from '../lib/env';
import { putMetric } from '../utils/cloudwatch';
import { dynamoDbClient } from '../utils/dynamodb';
import { logError } from '../utils/logging';
import { removeNullValues } from '../utils/removeNullValues';

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
        .catch((error: Error) => {
            logError(`Error reading tests from Dynamo: ${error.message}`);
            putMetric('channel-tests-error');
            return Promise.reject(error);
        });

function queryChannel(channel: Channel, stage: string) {
    return dynamoDbClient.send(
        new QueryCommand({
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
        }),
    );
}

export const getBannerDesigns = (): Promise<BannerDesignFromTool[]> => {
    return dynamoDbClient
        .send(
            new ScanCommand({
                TableName: `support-admin-console-banner-designs-${stage.toUpperCase()}`,
                ExpressionAttributeValues: {
                    ':draft': 'Draft',
                },
                ExpressionAttributeNames: {
                    '#status': 'status', // Necessary because status is a reserved word in dynamodb
                },
                FilterExpression: '#status <> :draft',
            }),
        )
        .then((results) => (results.Items ?? []) as BannerDesignFromTool[])
        .catch((error: Error) => {
            logError(`Error reading banner designs from Dynamo: ${error.message}`);
            putMetric('banner-designs-load-error');
            return Promise.reject(error);
        });
};
