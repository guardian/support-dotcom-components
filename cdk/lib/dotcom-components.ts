import path from 'path';
import { CfnInclude } from '@aws-cdk/cloudformation-include';
import type { App } from '@aws-cdk/core';
import { AccessScope, GuEc2App } from '@guardian/cdk';
import { Stage } from '@guardian/cdk/lib/constants/stage';
import type {
    GuParameter,
    GuStackProps,
    GuStageParameter,
} from '@guardian/cdk/lib/constructs/core';
import {
    GuDistributionBucketParameter,
    GuStack,
    GuStringParameter,
} from '@guardian/cdk/lib/constructs/core';

const yamlTemplateFilePath = path.join(__dirname, '../cfn.yaml');

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

        new GuEc2App(this, {
            applicationPort: 3030,
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
            // TODO: review monitoring config
            monitoringConfiguration: { noMonitoring: true },
            userData,
        });

        // TODO: Once this code has been removed we can delete old acm certificates
        new CfnInclude(this, 'Template', {
            templateFile: yamlTemplateFilePath,
            parameters: {
                Stage: this.getParam<GuStageParameter>('Stage'),
                BaseUrl: baseUrl,
                ELKStream: elkStream,
                VpcId: this.getParam<GuParameter>('VpcId'),
            },
        });
    }
}
