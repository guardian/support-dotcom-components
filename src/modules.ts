export const MODULES_VERSION = 'v2'; // The latest version of the modules

export interface ModuleInfo {
    name: string;
    srcPath: string; // where the source lives
    distPath: string; // where to put the built module
    endpointPathBuilder: (version?: string) => string; // path used by the client
    devServerPath: string; // local path of the modules, so we can serve them when running locally
}

export const getDefaultModuleInfo = (name: string, path: string): ModuleInfo => ({
    name: name,
    srcPath: `src/components/modules/${path}.tsx`,
    distPath: `dist/modules/${MODULES_VERSION}/${path}.js`,
    endpointPathBuilder: (version: string = MODULES_VERSION) => `modules/${version}/${path}.js`,
    devServerPath: `/../dist/modules/${MODULES_VERSION}/${path}.js`,
});

export const epic: ModuleInfo = getDefaultModuleInfo('epic', 'epics/ContributionsEpic');

export const liveblogEpic: ModuleInfo = getDefaultModuleInfo(
    'liveblog-epic',
    'epics/ContributionsLiveblogEpic',
);

export const contributionsBanner: ModuleInfo = getDefaultModuleInfo(
    'contributions-banner',
    'banners/contributions/ContributionsBanner',
);

export const g200Banner: ModuleInfo = getDefaultModuleInfo(
    'g200-banner',
    'banners/g200/G200Banner',
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

export const headerSupportAgain: ModuleInfo = getDefaultModuleInfo(
    'header-support-again',
    'header/HeaderSupportAgain',
);

export const ausMomentHeaderSupporter: ModuleInfo = getDefaultModuleInfo(
    'aus-moment-header-supporter',
    'header/HeaderAusMomentSupporter',
);

export const ausMomentHeaderNonSupporter: ModuleInfo = getDefaultModuleInfo(
    'aus-moment-header-nonsupporter',
    'header/HeaderAusMomentNonSupporter',
);

export const moduleInfos: ModuleInfo[] = [
    epic,
    liveblogEpic,
    contributionsBanner,
    g200Banner,
    digiSubs,
    guardianWeekly,
    puzzlesBanner,
    header,
    headerSupportAgain,
    ausMomentHeaderSupporter,
    ausMomentHeaderNonSupporter,
];
