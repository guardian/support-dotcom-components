export const MODULES_VERSION = 'v3'; // The latest version of the modules

export interface ModuleInfo {
    name: string;
    srcPath: string; // where the source lives
    distPath: string; // where to put the built module
    endpointPathBuilder: (version?: string) => string; // path used by the client
    devServerPath: string; // local path of the modules, so we can serve them when running locally
}

export const getDefaultModuleInfo = (name: string, path: string): ModuleInfo => ({
    name: name,
    srcPath: `src/modules/${path}.tsx`,
    distPath: `dist/modules/${MODULES_VERSION}/${path}.js`,
    endpointPathBuilder: (version: string = MODULES_VERSION) => `modules/${version}/${path}.js`,
    devServerPath: `/../../modules/dist/modules/${MODULES_VERSION}/${path}.js`,
});

export const epic: ModuleInfo = getDefaultModuleInfo('epic', 'epics/ContributionsEpic');
export const epicTopReaderAcBadgeV1: ModuleInfo = getDefaultModuleInfo(
    'epic',
    'epics/ContributionsEpicTopReaderArticleCountBadgeV1',
);
export const epicTopReaderAcBadgeV2: ModuleInfo = getDefaultModuleInfo(
    'epic',
    'epics/ContributionsEpicTopReaderArticleCountBadgeV2',
);

export const liveblogEpic: ModuleInfo = getDefaultModuleInfo(
    'liveblog-epic',
    'epics/ContributionsLiveblogEpic',
);

export const contributionsBanner: ModuleInfo = getDefaultModuleInfo(
    'contributions-banner',
    'banners/contributions/ContributionsBanner',
);

export const contributionsBannerWithSignIn: ModuleInfo = getDefaultModuleInfo(
    'contributions-banner-with-sign-in',
    'banners/contributions/ContributionsBannerWithSignIn',
);

export const investigationsMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'investigations-moment-banner',
    'banners/investigationsMoment/InvestigationsMomentBanner',
);

export const environmentMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'environment-moment-banner',
    'banners/environmentMoment/EnvironmentMomentBanner',
);

export const globalNewYearBanner: ModuleInfo = getDefaultModuleInfo(
    'global-new-year-banner',
    'banners/globalNewYear/GlobalNewYearBanner',
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

export const header: ModuleInfo = getDefaultModuleInfo('header', 'header/Header');

export const moduleInfos: ModuleInfo[] = [
    epic,
    epicTopReaderAcBadgeV1,
    epicTopReaderAcBadgeV2,
    liveblogEpic,
    contributionsBanner,
    contributionsBannerWithSignIn,
    investigationsMomentBanner,
    environmentMomentBanner,
    globalNewYearBanner,
    digiSubs,
    guardianWeekly,
    puzzlesBanner,
    header,
];
