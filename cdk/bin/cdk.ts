import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { DotcomComponents } from '../lib/dotcom-components';

const app = new App();

new DotcomComponents(app, 'sdc-CODE', {
	stack: 'support',
	stage: 'CODE',
	domainName: 'dotcom-components-code.support.guardianapis.com',
});

new DotcomComponents(app, 'sdc-PROD', {
	stack: 'support',
	stage: 'PROD',
	domainName: 'dotcom-components.support.guardianapis.com',
});
