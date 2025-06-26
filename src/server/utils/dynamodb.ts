import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { isDev } from '../lib/env';

export const getDynamoDbClient = (): DynamoDBDocumentClient => {
    if (isDev) {
        return DynamoDBDocumentClient.from(
            new DynamoDB({
                credentials: fromIni({ profile: 'membership' }),
                region: 'eu-west-1',
            }),
        );
    }
    return DynamoDBDocumentClient.from(new DynamoDB({ region: 'eu-west-1' }));
};
