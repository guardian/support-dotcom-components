import { fromIni, fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { isDev } from '../lib/env';

export const region = 'eu-west-1';

export const credentials = () =>
    isDev ? fromIni({ profile: 'membership' }) : fromNodeProviderChain();
