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

export const ausAnniversaryBanner: ModuleInfo = getDefaultModuleInfo(
    'aus-anniversary-banner',
    'banners/aus10yrAnniversaryMoment/Aus10yrAnniversaryMomentBanner',
);

export const contributionsBanner: ModuleInfo = getDefaultModuleInfo(
    'contributions-banner',
    'banners/contributions/ContributionsBanner',
);

export const charityAppealBanner: ModuleInfo = getDefaultModuleInfo(
    'charity-appeal-banner',
    'banners/charityAppeal/CharityAppealBanner',
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

export const choiceCardsBannerBlue: ModuleInfo = getDefaultModuleInfo(
    'choice-cards-banner-blue',
    'banners/choiceCardsBanner/ChoiceCardsBannerBlue',
);

export const choiceCardsBannerYellow: ModuleInfo = getDefaultModuleInfo(
    'choice-cards-banner-yellow',
    'banners/choiceCardsBanner/ChoiceCardsBannerYellow',
);

export const choiceCardsButtonsBannerBlue: ModuleInfo = getDefaultModuleInfo(
    'choice-cards-buttons-banner-blue',
    'banners/choiceCardsButtonsBanner/ChoiceCardsButtonsBannerBlue',
);

export const choiceCardsButtonsBannerYellow: ModuleInfo = getDefaultModuleInfo(
    'choice-cards-buttons-banner-yellow',
    'banners/choiceCardsButtonsBanner/ChoiceCardsButtonsBannerYellow',
);

export const supporterMomentBanner: ModuleInfo = getDefaultModuleInfo(
    'supporter-moment-banner',
    'banners/supporterMoment/SupporterMomentBanner',
);

export const europeMomentLocalLanguageBanner: ModuleInfo = getDefaultModuleInfo(
    'europe-moment-local-language-banner',
    'banners/europeMomentLocalLanguage/EuropeMomentLocalLanguageBanner',
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
    ausAnniversaryBanner,
    contributionsBanner,
    charityAppealBanner,
    contributionsBannerWithSignIn,
    investigationsMomentBanner,
    environmentMomentBanner,
    globalNewYearBanner,
    digiSubs,
    printSubs,
    choiceCardsBannerBlue,
    choiceCardsBannerYellow,
    choiceCardsButtonsBannerBlue,
    choiceCardsButtonsBannerYellow,
    supporterMomentBanner,
    europeMomentLocalLanguageBanner,
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
