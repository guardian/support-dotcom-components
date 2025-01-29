import { PageTracking, Tag } from './shared';

export interface GutterTargeting {
    showSupportMessaging: boolean;
    countryCode: string;
    mvtId: number;
    isSignedIn: boolean;
    tags: Tag[];
    sectionId?: string;
}

export type GutterPayload = {
    tracking: PageTracking;
    targeting: GutterTargeting;
};
