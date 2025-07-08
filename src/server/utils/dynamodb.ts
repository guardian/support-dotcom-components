import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { credentials, region } from './aws';

export const dynamoDbClient = DynamoDBDocumentClient.from(
    new DynamoDB({
        credentials: credentials(),
        region,
    }),
);
