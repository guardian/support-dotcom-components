export type EpicLocalisation = {
    countryCode?: string;
};

export type EpicTracking = {
    ophanPageId: string;
    ophanComponentId: string;
    platformId: string;
    campaignCode: string;
    abTestName: string;
    abTestVariant: string;
    referrerUrl: string;
};

export type Tag = {
    id: string;
    type: string;
};

export type EpicTargeting = {
    contentType: string;
    sectionName: string;
    shouldHideReaderRevenue: boolean;
    isMinuteArticle: boolean;
    isPaidContent: boolean;
    tags: Tag[];
};

export type EpicPayload = {
    tracking: EpicTracking;
    localisation: EpicLocalisation;
    targeting: EpicTargeting;
};
