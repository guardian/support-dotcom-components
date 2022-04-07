import { PageTracking } from './shared';

export type Edition = 'UK' | 'US' | 'AU' | 'INT';

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    // TODO: decide actual contract for targeting users we want to sign in / complete registration
    showLoginMessaging: boolean;
    edition: Edition;
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
    lastOneOffContributionDate?: string;
    numArticles?: number;
}

export type HeaderPayload = {
    tracking: PageTracking;
    targeting: HeaderTargeting;
};
