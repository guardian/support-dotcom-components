import { GuEc2App } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import { GuAlarm } from '@guardian/cdk/lib/constructs/cloudwatch';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import {
	GuDistributionBucketParameter,
	GuStack,
	GuStringParameter,
} from '@guardian/cdk/lib/constructs/core';
import {
	GuDynamoDBReadPolicy,
	GuGetS3ObjectsPolicy,
	GuPutCloudwatchMetricsPolicy,
} from '@guardian/cdk/lib/constructs/iam';
import type { GuAsgCapacity } from '@guardian/cdk/lib/types';
import type { App } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import {
	ComparisonOperator,
	Metric,
	TreatMissingData,
} from 'aws-cdk-lib/aws-cloudwatch';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';
import type { Policy } from 'aws-cdk-lib/aws-iam';

interface DotcomComponentsProps extends GuStackProps {
	domainName: string;
}

export class DotcomComponents extends GuStack {
	constructor(scope: App, id: string, props: DotcomComponentsProps) {
		super(scope, id, props);

		const appName = 'dotcom-components';
		const baseUrl = new GuStringParameter(this, 'BaseUrl', {
			description: 'Base URL of the service.',
		});
		const elkStream = new GuStringParameter(this, 'ELKStream', {
			description:
				'Name of the Kinesis stream used to send logs to the central ELK stack.',
		});

		// Cloudwatch alarms
		const snsTopicName = 'reader-revenue-dev';
		const namespace = `support-${appName}-${this.stage}`;

		new GuAlarm(this, 'SuperModeAlarm', {
			app: appName,
			alarmName: `support-${appName}: Super Mode error - ${this.stage}`,
			alarmDescription:
				'Error fetching Epic Super Mode data from Dynamodb',
			snsTopicName,
			metric: new Metric({
				metricName: 'super-mode-error',
				namespace,
				period: Duration.minutes(60),
				statistic: 'sum',
			}),
			threshold: 1,
			evaluationPeriods: 1,
			comparisonOperator:
				ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
			treatMissingData: TreatMissingData.NOT_BREACHING,
		});

		new GuAlarm(this, 'ChannelTestsAlarm', {
			app: appName,
			alarmName: `support-${appName}: Channel Tests error - ${this.stage}`,
			alarmDescription: 'Error fetching channel tests data from Dynamodb',
			snsTopicName,
			metric: new Metric({
				metricName: 'channel-tests-error',
				namespace,
				period: Duration.minutes(60),
				statistic: 'sum',
			}),
			threshold: 1,
			evaluationPeriods: 1,
			comparisonOperator:
				ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
			treatMissingData: TreatMissingData.NOT_BREACHING,
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
					`${this.stage}/guardian-weekly-propensity-test/*`,
				],
			}),
			new GuGetS3ObjectsPolicy(
				this,
				'S3ReadPolicyGuContributionsPublic',
				{
					bucketName: 'gu-contributions-public',
					paths: [
						`epic/${this.stage}/*`,
						`header/${this.stage}/*`,
						`banner/${this.stage}/*`,
					],
				},
			),
			new GuDynamoDBReadPolicy(this, 'DynamoReadPolicy', {
				tableName: `super-mode-${this.stage}`,
			}),
			// TODO: remove when secondary indexes are included in GuDynamoDBRead
			new GuDynamoDBReadPolicy(this, 'DynamoReadPolicySecondaryIndex', {
				tableName: `super-mode-${this.stage}/index/*`,
			}),
			new GuPutCloudwatchMetricsPolicy(this),
			new GuDynamoDBReadPolicy(this, 'DynamoTestsReadPolicy', {
				tableName: `support-admin-console-channel-tests-${this.stage}`,
			}),
		];

		const scaling: GuAsgCapacity = {
			minimumInstances: this.stage === 'CODE' ? 1 : 3,
			maximumInstances: this.stage === 'CODE' ? 2 : 18,
		};

		const ec2App = new GuEc2App(this, {
			instanceType: InstanceType.of(
				InstanceClass.T4G,
				InstanceSize.SMALL,
			),
			applicationPort: 3030,
			app: appName,
			access: { scope: AccessScope.PUBLIC },
			certificateProps: {
				domainName: props.domainName,
			},
			monitoringConfiguration: {
				http5xxAlarm: {
					tolerated5xxPercentage: 0.5,
					numberOfMinutesAboveThresholdBeforeAlarm: 1,
					alarmName: `URGENT 9-5 - high 5XX error rate on ${this.stage} support-dotcom-components`,
				},
				unhealthyInstancesAlarm: true,
				snsTopicName,
			},
			userData,
			roleConfiguration: {
				additionalPolicies: policies,
			},
			scaling,
		});

		ec2App.autoScalingGroup.scaleOnCpuUtilization('CpuScalingPolicy', {
			targetUtilizationPercent: 40,
		});
	}
}
