import cdk = require('@aws-cdk/core');
import apigateway = require('@aws-cdk/aws-apigateway');
import lambda = require('@aws-cdk/aws-lambda');
import s3 = require('@aws-cdk/aws-s3');

export class LambdaService extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id, { env: { region: 'eu-west-1' } });

        const stage = new cdk.CfnParameter(this, 'Stage', {
            type: 'String',
            default: 'CODE',
        });

        const bucket = 'aws-frontend-contributions-service';
        const key = `frontend/${stage.value}/lambda/lambda.zip`;
        const functionName = `frontend-contributions-service-${stage.value}`;

        const handler = new lambda.Function(this, functionName, {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromBucket(
                s3.Bucket.fromBucketName(this, 'lambda-code-bucket', bucket),
                key,
            ),
            handler: 'server.handler',
            functionName,
        });

        // If you need access to parameter store then uncomment and adjust the following:
        // handler.addToRolePolicy(
        //     new iam.PolicyStatement({
        //         effect: iam.Effect.ALLOW,
        //         resources: ['arn:aws:ssm:eu-west-1:[your account ID goes here]:parameter/*'],
        //         actions: ['ssm:GetParameter'],
        //     }),
        // );

        const restApiName = `contributions-service-${stage.value}`;

        // tslint:disable-next-line: no-unused-expression
        new apigateway.LambdaRestApi(this, restApiName, {
            restApiName,
            description: 'Service to serve contributions components',
            proxy: true,
            handler,
            deployOptions: {
                loggingLevel: apigateway.MethodLoggingLevel.INFO,
                dataTraceEnabled: true,
            },
        });
    }
}

const app = new cdk.App();
// tslint:disable-next-line: no-unused-expression
new LambdaService(app, 'contributions-service');
