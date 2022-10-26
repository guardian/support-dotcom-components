import { PageTracking, PurchaseInfo } from './shared';

export interface HeaderTargeting {
    showSupportMessaging: boolean; // Deprecated - use isRecurringSupporter + lastOneOffContributionDate
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
    lastOneOffContributionDate?: string;
    isRecurringSupporter?: boolean;
    numArticles?: number;
    purchaseInfo?: PurchaseInfo;
    isSignedIn: boolean;
}

export type HeaderPayload = {
    tracking: PageTracking;
    targeting: HeaderTargeting;
};
