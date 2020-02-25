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

interface View {
    date: number;
    testId: string;
}
export type ViewLog = View[];

export type EpicTargeting = {
    contentType: string;
    sectionName: string;
    shouldHideReaderRevenue: boolean;
    isMinuteArticle: boolean;
    isPaidContent: boolean;
    tags: Tag[];
    epicViewLog?: ViewLog;

    // Note, it turns out that showSupportMessaging (defined in the Members Data
    // API) does not capture every case of recurring contributors or last
    // contributions (i.e. the latter two are not simply a subset of the first -
    // we need all three!).
    showSupportMessaging?: boolean; // TODO make required once clients updated
    isRecurringContributor?: boolean; // TODO make required once clients updated
    lastOneOffContributionDate?: string; // Platform to send undefined or date as string -> Date.now().toString()
};

export type EpicPayload = {
    tracking: EpicTracking;
    localisation: EpicLocalisation;
    targeting: EpicTargeting;
};
