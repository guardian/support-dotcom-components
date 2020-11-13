export interface ModuleInfo {
    name: string;
    path: string;
}

export const getSrcPath = (module: ModuleInfo): string =>
    `src/components/modules/${module.path}.tsx`;
export const getDistPath = (module: ModuleInfo): string => `dist/modules/${module.path}.js`;

export const getEndpointPath = (module: ModuleInfo): string => `/${module.name}.js`;

export const getDevServerPath = (module: ModuleInfo): string =>
    `/../dist/modules/${module.path}.js`;
export const getProdServerPath = (module: ModuleInfo): string => `/modules/${module.path}.js`;

export const epic: ModuleInfo = {
    name: 'epic',
    path: 'epics/ContributionsEpic',
};

export const contributionsBanner: ModuleInfo = {
    name: 'contributions-banner',
    path: 'banners/contributions/ContributionsBanner',
};

export const digiSubs: ModuleInfo = {
    name: 'digital-subscriptions-banner',
    path: 'banners/digitalSubscriptions/DigitalSubscriptionsBanner',
};

export const guardianWeekly: ModuleInfo = {
    name: 'guardian-weekly-banner',
    path: 'banners/guardianWeekly/GuardianWeeklyBanner',
};

export const moduleInfos: ModuleInfo[] = [epic, contributionsBanner, digiSubs, guardianWeekly];
