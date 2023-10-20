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

export const liveblogEpic: ModuleInfo = getDefaultModuleInfo(
    'liveblog-epic',
    'epics/ContributionsLiveblogEpic',
);

export const ausAnniversaryMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'aus-anniversary-moment-banner',
    'banners/aus10yrAnniversaryMoment/Aus10yrAnniversaryMomentBanner',
);

export const contributionsBanner: ModuleInfo = getDefaultModuleInfo(
    'contributions-banner',
    'banners/contributions/ContributionsBanner',
);

export const contributionsBannerWithSignIn: ModuleInfo = getDefaultModuleInfo(
    'contributions-banner-with-sign-in',
    'banners/contributions/ContributionsBannerWithSignIn',
);

export const designableBanner: ModuleInfo = getDefaultModuleInfo(
    'designable-banner',
    'banners/designableBanner/DesignableBanner',
);

export const investigationsMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'investigations-moment-banner',
    'banners/investigationsMoment/InvestigationsMomentBanner',
);

export const environmentBanner: ModuleInfo = getDefaultModuleInfo(
    'environment-banner',
    'banners/environment/EnvironmentBanner',
);

export const globalNewYearMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'global-new-year-moment-banner',
    'banners/globalNYMoment/GlobalNYMomentBanner',
);

export const choiceCardsMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'choice-cards-moment-banner',
    'banners/choiceCardsMoment/ChoiceCardsMomentBanner',
);

export const supporterMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'supporter-moment-banner',
    'banners/supporterMoment/SupporterMomentBanner',
);

export const europeMomentLocalLanguageBanner: ModuleInfo = getDefaultModuleInfo(
    'europe-moment-local-language-banner',
    'banners/europeMomentLocalLanguage/EuropeMomentLocalLanguageBanner',
);

export const environmentMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'environment-moment-banner',
    'banners/environmentMoment/EnvironmentMomentBanner',
);

export const guardianWeekly: ModuleInfo = getDefaultModuleInfo(
    'guardian-weekly-banner',
    'banners/guardianWeekly/GuardianWeeklyBanner',
);

export const puzzlesBanner: ModuleInfo = getDefaultModuleInfo(
    'puzzles-banner',
    'puzzles/puzzlesBanner/PuzzlesBanner',
);

export const signInPromptBanner: ModuleInfo = getDefaultModuleInfo(
    'sign-in-prompt-banner',
    'banners/signInPrompt/SignInPromptBanner',
);

export const header: ModuleInfo = getDefaultModuleInfo('header', 'headers/Header');

export const signInPromptHeader: ModuleInfo = getDefaultModuleInfo(
    'sign-in-prompt-header',
    'headers/SignInPromptHeader',
);

export const ukraineMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'ukraine-moment-banner',
    'banners/ukraineMoment/UkraineMomentBanner',
);

export const scotus2023MomentBanner: ModuleInfo = getDefaultModuleInfo(
    'scotus-2023-moment-banner',
    'banners/usSupremeCourt2023/Scotus2023MomentBanner',
);

export const wpfdBanner: ModuleInfo = getDefaultModuleInfo(
    'wpfd-banner',
    'banners/worldPressFreedomDay/WorldPressFreedomDayBanner',
);

export const moduleInfos: ModuleInfo[] = [
    epic,
    liveblogEpic,
    ausAnniversaryMomentBanner,
    contributionsBanner,
    contributionsBannerWithSignIn,
    investigationsMomentBanner,
    environmentBanner,
    globalNewYearMomentBanner,
    choiceCardsMomentBanner,
    supporterMomentBanner,
    europeMomentLocalLanguageBanner,
    environmentMomentBanner,
    guardianWeekly,
    puzzlesBanner,
    signInPromptBanner,
    header,
    signInPromptHeader,
    ukraineMomentBanner,
    scotus2023MomentBanner,
    wpfdBanner,
    designableBanner,
];
