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

export const usEoyAppeal: ModuleInfo = getDefaultModuleInfo(
    'us-eoy-appeal-banner',
    'banners/usEoyAppeal/UsEoyAppeal',
);

export const usEoyAppealWithVisual: ModuleInfo = getDefaultModuleInfo(
    'us-eoy-appeal-banner-with-visual',
    'banners/usEoyAppeal/UsEoyAppealWithVisual',
);

export const globalEoy: ModuleInfo = getDefaultModuleInfo(
    'global-eoy-banner',
    'banners/globalEoy/GlobalEoy',
);

export const moduleInfos: ModuleInfo[] = [
    epic,
    epicACAbove,
    epicACInline,
    contributionsBanner,
    digiSubs,
    guardianWeekly,
    usEoyAppeal,
    usEoyAppealWithVisual,
    globalEoy,
];
