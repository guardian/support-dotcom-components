import { PageTracking } from './shared';

export type Edition = 'UK' | 'US' | 'AU' | 'INT';

export interface purchaseInfo {
    userType?: 'new' | 'guest' | 'current';
    product?: 'Contribution' | 'DigitalPack' | 'GuardianWeekly' | 'Paper';
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
