import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'; // ES Modules import

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ssm/command/GetParametersByPathCommand/

export async function getSsmValue(
    stage: string,
    id: string,
): Promise<string | undefined> {
    const name = `/membership/support-dotcom-components/${stage}/${id}`;
    const client = new SSMClient({ region: 'eu-west-1' });
    const input = {
        Name: name,
    };
    const command = new GetParameterCommand(input);
    const response = await client.send(command);
    return response.Parameter?.Value;
}
