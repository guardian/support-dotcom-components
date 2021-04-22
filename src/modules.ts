const MODULES_VERSION = 'v1'; // The latest version of the modules

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

export const epicAdventure: ModuleInfo = getDefaultModuleInfo(
    'epic-adventure',
    'epics/ContributionsEpicAdventure',
);

export const epicChooser: ModuleInfo = getDefaultModuleInfo(
    'epic-chooser',
    'epics/ProductChooserEpicAdventure',
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

export const header: ModuleInfo = getDefaultModuleInfo('header', 'header/Header');

export const moduleInfos: ModuleInfo[] = [
    epicAdventure,
    epicChooser,
    epic,
    liveblogEpic,
    contributionsBanner,
    digiSubs,
    guardianWeekly,
    puzzlesBanner,
    header,
];
