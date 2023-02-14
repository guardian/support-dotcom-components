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

export const contributionsBanner: ModuleInfo = getDefaultModuleInfo(
    'contributions-banner',
    'banners/contributions/ContributionsBanner',
);

export const charityAppealBanner: ModuleInfo = getDefaultModuleInfo(
    'charity-appeal-banner',
    'banners/charityAppeal/CharityAppealBanner',
);

export const researchSurveyBanner: ModuleInfo = getDefaultModuleInfo(
    'research-survey-banner',
    'banners/researchSurveyBanner/ResearchSurveyBanner',
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
    'banners/globalNYMoment/GlobalNYMomentBanner',
);

export const digiSubs: ModuleInfo = getDefaultModuleInfo(
    'digital-subscriptions-banner',
    'banners/digitalSubscriptions/DigitalSubscriptionsBanner',
);

export const printSubs: ModuleInfo = getDefaultModuleInfo(
    'print-subscriptions-banner',
    'banners/printSubscriptions/PrintSubscriptionsBanner',
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

export const auBrandMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'au-brand-moment-banner',
    'banners/auBrandMoment/AuBrandMomentBanner',
);

export const climateCrisisMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'climate-crisis-moment-banner',
    'banners/climateCrisisMoment/ClimateCrisisMomentBanner',
);

export const usEoyMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'us-eoy-banner',
    'banners/usEoyMoment/UsEoyMomentBanner',
);
export const usEoyGivingTuesMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'us-eoy-giving-tues-banner',
    'banners/usEoyGivingTuesMoment/UsEoyGivingTuesMomentBanner',
);

export const ausEoyMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'aus-eoy-banner',
    'banners/ausEoyMoment/AusEoyMomentBanner',
);

export const usEoyMomentBannerV3: ModuleInfo = getDefaultModuleInfo(
    'us-eoy-banner-v3',
    'banners/usEoyMomentV3/UsEoyMomentBannerV3',
);

export const ukraineMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'ukraine-moment-banner',
    'banners/ukraineMoment/UkraineMomentBanner',
);

export const moduleInfos: ModuleInfo[] = [
    epic,
    liveblogEpic,
    contributionsBanner,
    charityAppealBanner,
    researchSurveyBanner,
    contributionsBannerWithSignIn,
    investigationsMomentBanner,
    environmentMomentBanner,
    globalNewYearBanner,
    digiSubs,
    printSubs,
    guardianWeekly,
    puzzlesBanner,
    signInPromptBanner,
    header,
    signInPromptHeader,
    auBrandMomentBanner,
    climateCrisisMomentBanner,
    usEoyMomentBanner,
    usEoyGivingTuesMomentBanner,
    ausEoyMomentBanner,
    usEoyMomentBannerV3,
    ukraineMomentBanner,
];
