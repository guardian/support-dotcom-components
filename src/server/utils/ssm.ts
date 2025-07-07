import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';
import { credentials, region } from './aws';

const client = new SSMClient({
    credentials: credentials(),
    region,
});

export async function getSsmValue(stage: string, id: string): Promise<string | undefined> {
    const name = `/membership/support-dotcom-components/${stage}/${id}`;

    const response = await client.send(
        new GetParameterCommand({
            Name: name,
        }),
    );

    return response.Parameter?.Value;
}
