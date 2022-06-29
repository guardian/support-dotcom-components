import { PageTracking } from './shared';

export type Edition = 'UK' | 'US' | 'AU' | 'INT';

export interface PurchaseInfo {
    userType: 'new' | 'guest' | 'current';
    product: 'Contribution' | 'DigitalPack' | 'GuardianWeekly' | 'Paper';
}

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    edition: Edition;
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
    lastOneOffContributionDate?: string;
    numArticles?: number;
    purchaseInfo?: PurchaseInfo;
    isSignedIn: boolean;
}

export type HeaderPayload = {
    tracking: PageTracking;
    targeting: HeaderTargeting;
};
