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

export const puzzlesBanner: ModuleInfo = getDefaultModuleInfo(
    'puzzles-banner',
    'puzzles/puzzlesBanner/PuzzlesBanner',
);

export const moduleInfos: ModuleInfo[] = [
    epic,
    epicACAbove,
    epicACInline,
    liveblogEpic,
    contributionsBanner,
    digiSubs,
    guardianWeekly,
    puzzlesBanner,
];
