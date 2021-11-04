import type { Policy } from '@aws-cdk/aws-iam';
import type { App } from '@aws-cdk/core';
import { AccessScope, GuEc2App } from '@guardian/cdk';
import { Stage } from '@guardian/cdk/lib/constants/stage';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import {
    GuDistributionBucketParameter,
    GuStack,
    GuStringParameter,
} from '@guardian/cdk/lib/constructs/core';
import { GuDynamoDBReadPolicy, GuGetS3ObjectsPolicy } from '@guardian/cdk/lib/constructs/iam';

export class DotcomComponents extends GuStack {
    constructor(scope: App, id: string, props: GuStackProps) {
        super(scope, id, props);

        const appName = 'dotcom-components';
        const baseUrl = new GuStringParameter(this, 'BaseUrl', {
            description: 'Base URL of the service.',
        });
        const elkStream = new GuStringParameter(this, 'ELKStream', {
            description: 'Name of the Kinesis stream used to send logs to the central ELK stack.',
        });

        const userData = `#!/bin/bash

groupadd support
useradd -r -m -s /usr/bin/nologin -g support dotcom-components
cd /home/dotcom-components

aws --region eu-west-1 s3 cp s3://${
            GuDistributionBucketParameter.getInstance(this).valueAsString
        }/support/${this.stage}/${appName}/${appName}.tar ./
mkdir ${appName}
tar -xvf ${appName}.tar --directory ${appName}

chown -R dotcom-components:support ${appName}

cd ${appName}

export TERM=xterm-256color
export NODE_ENV=production
export stage=${this.stage}
export base_url=${baseUrl.valueAsString}

mkdir /var/log/dotcom-components
chown -R dotcom-components:support /var/log/dotcom-components

/usr/local/node/pm2 start --uid dotcom-components --gid support server.js

/opt/aws-kinesis-agent/configure-aws-kinesis-agent ${this.region} ${
            elkStream.valueAsString
        } /var/log/dotcom-components/dotcom-components.log`;

        const policies: Policy[] = [
            new GuGetS3ObjectsPolicy(this, 'S3ReadPolicySupportAdminConsole', {
                bucketName: 'support-admin-console',
                paths: [
                    `${this.stage}/banner-deploy/*`,
                    `${this.stage}/channel-switches.json`,
                    `${this.stage}/configured-amounts.json`,
                ],
            }),
            new GuGetS3ObjectsPolicy(this, 'S3ReadPolicyGuContributionsPublic', {
                bucketName: 'gu-contributions-public',
                paths: [`epic/${this.stage}/*`, `banner/${this.stage}/*`],
            }),
            new GuDynamoDBReadPolicy(this, 'DynamoReadPolicy', {
                tableName: `super-mode-${this.stage}`,
            }),
            // TODO: remove when secondary indexes are included in GuDynamoDBRead
            new GuDynamoDBReadPolicy(this, 'DynamoReadPolicySecondaryIndex', {
                tableName: `super-mode-${this.stage}/index/*`,
            }),
        ];

        const ec2App = new GuEc2App(this, {
            applicationPort: 8082,
            app: appName,
            access: { scope: AccessScope.PUBLIC },
            certificateProps: {
                [Stage.CODE]: {
                    // TODO: should be dotcom-components.support.code.dev-guardianapis.com
                    domainName: 'dotcom-components-code.support.guardianapis.com',
                },
                [Stage.PROD]: {
                    domainName: 'dotcom-components.support.guardianapis.com',
                },
            },
            monitoringConfiguration: {
                http5xxAlarm: {
                    tolerated5xxPercentage: 0.1,
                    numberOfMinutesAboveThresholdBeforeAlarm: 1,
                    alarmName: `URGENT 9-5 - high 5XX error rate on ${this.stage} support-dotcom-components`,
                },
                unhealthyInstancesAlarm: true,
                snsTopicName: 'reader-revenue-dev',
            },
            userData,
            roleConfiguration: {
                additionalPolicies: policies,
            },
            scaling: { PROD: { minimumInstances: 3, maximumInstances: 18 } },
        });

        ec2App.autoScalingGroup.scaleOnCpuUtilization('CpuScalingPolicy', {
            targetUtilizationPercent: 50,
        });
    }
}
