// import { PageTracking, PurchaseInfo } from './shared';
import { PageTracking } from './shared';

export interface GutterTargeting {
    showSupportMessaging: boolean;
    countryCode: string;
    mvtId: number;
    // numArticles?: number;
    // purchaseInfo?: PurchaseInfo;
    isSignedIn: boolean;
}

export type GutterPayload = {
    tracking: PageTracking;
    targeting: GutterTargeting;
};
