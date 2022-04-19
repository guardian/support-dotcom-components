import { Factory } from 'fishery';
import { HeaderPayload } from '@sdc/shared/types';

export const headerPayloadFactory = Factory.define<HeaderPayload>(() => ({
    targeting: {
        countryCode: 'GB',
        edition: 'UK',
        mvtId: 0,
        showSupportMessaging: false,
    },
    tracking: {
        clientName: 'frontend',
        ophanPageId: 'ophanPageId',
        platformId: 'GUARDIAN_WEB',
        referrerUrl: 'https://theguardian.com/uk',
    },
}));
