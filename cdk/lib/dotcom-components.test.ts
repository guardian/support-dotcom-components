import '@aws-cdk/assert/jest';
import { SynthUtils } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import { DotcomComponents } from './dotcom-components';

describe('The Cfn stack', () => {
    it('matches the snapshot', () => {
        const app = new App();
        const stack = new DotcomComponents(app, 'cfn', { stack: 'support' });
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    });
});
