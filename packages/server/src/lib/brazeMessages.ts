import * as AWS from 'aws-sdk';
import { z } from 'zod';
import { isProd } from './env';
import { logError, logInfo } from '../utils/logging';
import { putMetric } from '../utils/cloudwatch';
import { Cta } from '@sdc/shared/dist/types';

const stage = isProd ? 'PROD' : 'CODE';

export interface BrazeEpicTest {
    testName: string;
    variantName: string;
    tagIds: string[];
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    cta: Cta;
}

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
        .then(result => result.Items ?? [])
        .catch(error => {
            logError(`Error fetching super mode articles from dynamo: ${error}`);
            putMetric('super-mode-error');
            return [];
        });

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

export const brazeLiveblogEpicSchema = z.object({
    brazeUUID: z.string(),
    testName: z.string(),
    variantName: z.string(),
    tagIds: z.string(),
    heading: z.string().optional(),
    paragraphs: z.string(),
    ctaText: z.string(),
    ctaBaseUrl: z.string(),
    highlightedText: z.string().optional(),
});

export type BrazeLiveBlogEpic = z.infer<typeof brazeLiveblogEpicSchema>;

export const transformBrazeLiveblogEpicToTest = (
    liveblogEpic: BrazeLiveBlogEpic,
): BrazeEpicTest => {
    return {
        testName: liveblogEpic.testName,
        variantName: liveblogEpic.variantName,
        heading: liveblogEpic.heading,
        highlightedText: liveblogEpic.highlightedText,
        paragraphs: liveblogEpic.paragraphs.split('|'),
        tagIds: liveblogEpic.tagIds.split('|'),
        cta: {
            text: liveblogEpic.ctaText,
            baseUrl: liveblogEpic.ctaBaseUrl,
        },
    };
};
