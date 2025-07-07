import { fromIni, fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { chain as providerChain } from '@smithy/property-provider';

export const region = 'eu-west-1';

export const credentials = () =>
    providerChain(fromIni({ profile: 'membership' }), fromNodeProviderChain());
