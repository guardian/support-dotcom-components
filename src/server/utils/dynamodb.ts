import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { fromIni, fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { isDev } from '../lib/env';

export const getDynamoDbClient = (): DynamoDBDocumentClient => {
    return DynamoDBDocumentClient.from(
        new DynamoDB({
            credentials: isDev ? fromIni({ profile: 'membership' }) : fromNodeProviderChain(),
            region: 'eu-west-1',
        }),
    );
};
