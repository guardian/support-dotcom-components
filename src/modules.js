// interface Module {
//     name: string;
//     endpoint: string;
//     path: string;
// }

export const getSrcPath = module => `src/components/modules/${module.path}.tsx`;
export const getDistPath = module => `dist/modules/${module.path}.js`;

export const getDevServerPath = module => `/../dist/modules/${module.path}.js`;
export const getProdServerPath = module => `/modules/${module.path}.js`;

const epic = {
    name: 'epic',
    endpoint: 'epic.js',
    path: 'epics/ContributionsEpic',
};

const contributionsBanner = {
    name: 'contributions-banner',
    endpoint: 'contributions-banner.js',
    path: 'banners/contributions/ContributionsBanner',
};

const digiSubs = {
    name: 'digital-subscriptions-banner',
    endpoint: 'digital-subscriptions-banner.js',
    path: 'banners/digitalSubscriptions/DigitalSubscriptionsBanner',
};

const guardianWeekly = {
    name: 'guardian-weekly-banner',
    endpoint: 'guardian-weekly-banner.js',
    path: 'banners/guardianWeekly/GuardianWeeklyBanner',
};

export default [epic, contributionsBanner, digiSubs, guardianWeekly];
