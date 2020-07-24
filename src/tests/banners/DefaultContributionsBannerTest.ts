import { BannerContent, BannerTest } from '../../components/modules/banners/BannerTypes';

export const DefaultContributionsBannerPath = 'contributions-banner.js';

export const DefaultContributionsBanner = (bannerContent: BannerContent): BannerTest => {
    return {
        name: 'DefaultContributionsBanner',
        bannerType: 'contributions',
        testAudience: 'NonSupporters',
        canRun: (): boolean => true,
        minPageViews: 2,
        variants: [
            {
                name: 'control',
                modulePath: DefaultContributionsBannerPath,
                moduleName: 'ContributionsBanner',
                bannerContent: bannerContent,
            },
        ],
    };
};
