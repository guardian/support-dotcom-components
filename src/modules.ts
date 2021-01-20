export interface ModuleInfo {
    name: string;
    srcPath: string;
    distPath: string;
    endpointPath: string;
    devServerPath: string;
    prodServerPath: string;
}

export const getDefaultModuleInfo = (name: string, path: string): ModuleInfo => ({
    name: name,
    srcPath: `src/components/modules/${path}.tsx`,
    distPath: `dist/modules/${path}.js`,
    endpointPath: `${name}.js`,
    devServerPath: `/../dist/modules/${path}.js`,
    prodServerPath: `/modules/${path}.js`,
});

export const epic: ModuleInfo = getDefaultModuleInfo('epic', 'epics/ContributionsEpic');
export const epicACAbove: ModuleInfo = getDefaultModuleInfo(
    'epic-ac-above',
    'epics/ContributionsEpicWithArticleCountAbove',
);
export const epicACInline: ModuleInfo = getDefaultModuleInfo(
    'epic-ac-inline',
    'epics/ContributionsEpicWithArticleCountInline',
);

export const liveblogEpic: ModuleInfo = getDefaultModuleInfo(
    'liveblog-epic',
    'epics/ContributionsLiveblogEpic',
);

export const liveblogEpicSmallHeader: ModuleInfo = getDefaultModuleInfo(
    'liveblog-epic-small-header',
    'epics/ContributionsLiveblogEpicSmallHeader',
);

export const liveblogEpicYellowHeader: ModuleInfo = getDefaultModuleInfo(
    'liveblog-epic-yellow-header',
    'epics/ContributionsLiveblogEpicYellowHeader',
);

export const contributionsBanner: ModuleInfo = getDefaultModuleInfo(
    'contributions-banner',
    'banners/contributions/ContributionsBanner',
);

export const digiSubs: ModuleInfo = getDefaultModuleInfo(
    'digital-subscriptions-banner',
    'banners/digitalSubscriptions/DigitalSubscriptionsBanner',
);

export const guardianWeekly: ModuleInfo = getDefaultModuleInfo(
    'guardian-weekly-banner',
    'banners/guardianWeekly/GuardianWeeklyBanner',
);

export const globalEoy: ModuleInfo = getDefaultModuleInfo(
    'global-eoy-banner',
    'banners/globalEoy/GlobalEoy',
);

export const moduleInfos: ModuleInfo[] = [
    epic,
    // epicACAbove,
    // epicACInline,
    liveblogEpic,
    liveblogEpicSmallHeader,
    liveblogEpicYellowHeader,
    // contributionsBanner,
    // digiSubs,
    // guardianWeekly,
    // globalEoy,
];
