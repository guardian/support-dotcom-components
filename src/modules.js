export const getSrcPath = module => `src/components/modules/${module.path}.tsx`;
export const getDistPath = module => `dist/modules/${module.path}.js`;

export const getEndpointPath = module => `/${module.name}.js`;

export const getDevServerPath = module => `/../dist/modules/${module.path}.js`;
export const getProdServerPath = module => `/modules/${module.path}.js`;

export const epic = {
    name: 'epic',
    path: 'epics/ContributionsEpic',
};

export const contributionsBanner = {
    name: 'contributions-banner',
    path: 'banners/contributions/ContributionsBanner',
};

export const digiSubs = {
    name: 'digital-subscriptions-banner',
    path: 'banners/digitalSubscriptions/DigitalSubscriptionsBanner',
};

export const guardianWeekly = {
    name: 'guardian-weekly-banner',
    path: 'banners/guardianWeekly/GuardianWeeklyBanner',
};

export const moduleInfos = [epic, contributionsBanner, digiSubs, guardianWeekly];

// module.exports = {
//     getSrcPath,
//     getDistPath,
//     getEndpointPath,
//     getDevServerPath,
//     getProdServerPath,
//     moduleInfos,
// };
