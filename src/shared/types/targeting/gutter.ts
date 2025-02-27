export interface GutterTargeting {
    showSupportMessaging: boolean;
    countryCode: string;
    mvtId: number;
    isSignedIn: boolean;
    tagIds?: string[];
    sectionId?: string;
    pageId?: string;
}

export type GutterPayload = {
    targeting: GutterTargeting;
};
