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

export const environmentBanner: ModuleInfo = getDefaultModuleInfo(
    'environment-banner',
    'banners/environment/EnvironmentBanner',
);

export const europeMomentLocalLanguageBanner: ModuleInfo = getDefaultModuleInfo(
    'europe-moment-local-language-banner',
    'banners/europeMomentLocalLanguage/EuropeMomentLocalLanguageBanner',
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

export const wpfdBanner: ModuleInfo = getDefaultModuleInfo(
    'wpfd-banner',
    'banners/worldPressFreedomDay/WorldPressFreedomDayBanner',
);

export const moduleInfos: ModuleInfo[] = [
    contributionsBanner,
    contributionsBannerWithSignIn,
    environmentBanner,
    europeMomentLocalLanguageBanner,
    puzzlesBanner,
    signInPromptBanner,
    header,
    signInPromptHeader,
    wpfdBanner,
    designableBanner,
];
