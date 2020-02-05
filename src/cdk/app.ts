import cdk = require('@aws-cdk/core');
import apigatewayv2 = require('@aws-cdk/aws-apigatewayv2');
import lambda = require('@aws-cdk/aws-lambda');
import s3 = require('@aws-cdk/aws-s3');
import iam = require('@aws-cdk/aws-iam');
import { Tag } from '@aws-cdk/core';

export class LambdaService extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id, { env: { region: 'eu-west-1' } });

        const stage = new cdk.CfnParameter(this, 'Stage', {
            type: 'String',
            default: 'CODE',
        });

        Tag.add(this, 'Stack', 'frontend');
        Tag.add(this, 'Stage', stage.value.toString());
        Tag.add(this, 'App', 'contributions-service');
        Tag.add(this, 'Owner', 'slot-machine');

        const bucket = 'aws-frontend-contributions-service';
        const key = `frontend/${stage.value}/lambda/lambda.zip`;
        const functionName = `frontend-contributions-service-${stage.value}`;

        const handler = new lambda.Function(this, 'frontend-contributions-service', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromBucket(
                s3.Bucket.fromBucketName(this, 'lambda-code-bucket', bucket),
                key,
            ),
            handler: 'server.handler',
            functionName,
        });

        const restApiName = `contributions-service-${stage.value}`;

        // https://aws.amazon.com/blogs/compute/announcing-http-apis-for-amazon-api-gateway/
        const api = new apigatewayv2.CfnApi(this, 'contributions-service', {
            name: restApiName,
            description: 'Service to serve contributions components',
            protocolType: 'HTTP',
            target: handler.functionArn,
        });

        handler.addPermission('grant-invoke', {
            action: 'lambda:InvokeFunction',
            principal: new iam.ServicePrincipal('apigateway.amazonaws.com'),
            sourceArn: `arn:aws:execute-api:eu-west-1:${this.account}:${api.ref}*`,
        });
    }
}

const app = new cdk.App();
// tslint:disable-next-line: no-unused-expression
new LambdaService(app, 'contributions-service');
