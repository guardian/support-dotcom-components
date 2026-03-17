import 'source-map-support/register';
import { App } from 'aws-cdk-lib/core';
import { DotcomComponents } from '../lib/dotcom-components';

const app = new App();

const codeProps = {
	stack: 'support',
	stage: 'CODE',
	domainName: 'dotcom-components-code.support.guardianapis.com',
};

new DotcomComponents(app, 'sdc-CODE', codeProps);

const prodProps = {
	stack: 'support',
	stage: 'PROD',
	domainName: 'dotcom-components.support.guardianapis.com',
};

new DotcomComponents(app, 'sdc-PROD', prodProps);
