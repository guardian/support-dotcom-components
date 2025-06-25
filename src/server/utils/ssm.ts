import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';
import { fromIni } from '@aws-sdk/credential-providers';
import { isDev } from '../lib/env';

const getSSMClient = () => {
    if (isDev) {
        return new SSMClient({
            credentials: fromIni({ profile: 'membership' }),
            region: 'eu-west-1',
        });
    }
    return new SSMClient();
};

export async function getSsmValue(stage: string, id: string): Promise<string | undefined> {
    const name = `/membership/support-dotcom-components/${stage}/${id}`;
    const client = getSSMClient();

    const response = await client.send(
        new GetParameterCommand({
            Name: name,
        }),
    );

    return response.Parameter?.Value;
}
