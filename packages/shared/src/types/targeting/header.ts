import { PageTracking } from './shared';

export type Edition = 'UK' | 'US' | 'AU' | 'INT';

export interface purchaseInfo {
    userType?: 'new' | 'guest' | 'current';
    productType?: 'RECURRING_CONTRIBUTION' | 'DIGITAL_SUBSCRIPTION' | 'PRINT_SUBSCRIPTION';
}

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    edition: Edition;
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
    lastOneOffContributionDate?: string;
    numArticles?: number;
    purchaseInfo?: purchaseInfo;
    isSignedIn: boolean;
}

export type HeaderPayload = {
    tracking: PageTracking;
    targeting: HeaderTargeting;
};
