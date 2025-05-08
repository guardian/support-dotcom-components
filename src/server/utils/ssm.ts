import * as AWS from 'aws-sdk';

export async function getSsmValue(stage: string, id: string): Promise<string | undefined> {
    const name = `/membership/support-dotcom-components/${stage}/${id}`;
    const client = new AWS.SSM({ region: 'eu-west-1' });

    const response = await client
        .getParameter({
            Name: name,
            WithDecryption: true,
        })
        .promise();

    return response.Parameter?.Value;
}
