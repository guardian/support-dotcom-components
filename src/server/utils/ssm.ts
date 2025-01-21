// import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'; // ES Modules import
import * as AWS from 'aws-sdk';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ssm/command/GetParametersByPathCommand/

export async function getSsmValue(stage: string, id: string): Promise<string | undefined> {
    const name = `/membership/support-dotcom-components/${stage}/${id}`;
    const client = new AWS.SSM({ region: 'eu-west-1' });

    const response = await client
        .getParameter({
            Name: name,
        })
        .promise();

    return response.Parameter?.Value;
}
