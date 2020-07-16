import { BannerTest } from '../../components/BannerTypes';

export const DefaultContributionsBannerPath = 'contributions-banner.js';

export const DefaultContributionsBanner: BannerTest = {
    name: 'DefaultContributionsBanner',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: () => true,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: DefaultContributionsBannerPath,
            moduleName: 'ContributionsBanner',
        },
    ],
};
