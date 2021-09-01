import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { DotcomComponents } from '../lib/dotcom-components';

const app = new App();

new DotcomComponents(app, 'Cfn', { stack: 'support' });
