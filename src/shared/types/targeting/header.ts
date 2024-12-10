import { PageTracking, PurchaseInfo } from './shared';

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    countryCode: string;
    mvtId: number;
    numArticles?: number;
    purchaseInfo?: PurchaseInfo;
    isSignedIn: boolean;
}

export type HeaderPayload = {
    tracking: PageTracking;
    targeting: HeaderTargeting;
};
