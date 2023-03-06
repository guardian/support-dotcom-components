import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DotcomComponents } from './dotcom-components';

describe('The DotcomComponents stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new DotcomComponents(app, 'DotcomComponents', {
			stack: 'support',
			stage: 'TEST',
			domainName: 'dotcom-components-test.support.guardianapis.com',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});
