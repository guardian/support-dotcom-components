import type { PurchaseInfo } from './shared';

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    countryCode: string;
    mvtId: number;
    numArticles?: number;
    purchaseInfo?: PurchaseInfo;
    isSignedIn: boolean;
    inHoldbackGroup?: boolean;
    tagIds?: string[];
    sectionId?: string;
    contentType?: string;
}

export type HeaderPayload = {
    targeting: HeaderTargeting;
};
