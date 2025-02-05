import { PageTracking } from './shared';

export interface GutterTargeting {
    showSupportMessaging: boolean;
    countryCode: string;
    mvtId: number;
    isSignedIn: boolean;
    tagIds?: string[];
    sectionId?: string;
}

export type GutterPayload = {
    tracking: PageTracking;
    targeting: GutterTargeting;
};
