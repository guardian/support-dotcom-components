import path from 'path';
import { CfnInclude } from '@aws-cdk/cloudformation-include';
import type { App } from '@aws-cdk/core';
import type { GuStackProps, GuStageParameter } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';

const yamlTemplateFilePath = path.join(__dirname, '../cfn.yaml');

export class DotcomComponents extends GuStack {
    constructor(scope: App, id: string, props: GuStackProps) {
        super(scope, id, props);

        new CfnInclude(this, 'Template', {
            templateFile: yamlTemplateFilePath,
            parameters: {
                Stage: this.getParam<GuStageParameter>('Stage'),
            },
        });
    }
}
