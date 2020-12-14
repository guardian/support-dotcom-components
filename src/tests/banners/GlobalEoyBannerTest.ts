import {
    BannerPageTracking,
    BannerTargeting,
    BannerTest,
    BannerVariant,
} from '../../types/BannerTypes';
import { contributionsBanner, globalEoy } from '../../modules';

const DEPLOY_TIMESTAMP = Date.parse('2020-12-29');

const control: BannerVariant = {
    name: 'control',
    modulePath: contributionsBanner.endpointPath,
    moduleName: 'ContributionsBanner',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    bannerContent: {
        heading: 'We chose a different approach. Will you support it?',
        messageText:
            'We believe every one of us deserves to read quality, independent, fact-checked news and measured explanation – that’s why we keep Guardian journalism open to all. Our editorial independence has never been so vital. No one sets our agenda, or edits our editor, so we can keep providing independent reporting each and every day. No matter how unpredictable the future feels, we will remain with you. Every contribution, however big or small, makes our work possible – in times of crisis and beyond.',
        highlightedText: 'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
        cta: {
            text: 'Support the guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
    },
};

export const GlobalEoyNonSupportersBanner: BannerTest = {
    name: 'GlobalEoyNonSupporters',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    locations: [
        'GBPCountries',
        'AUDCountries',
        'EURCountries',
        'International',
        'NZDCountries',
        'Canada',
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) =>
        Date.now() >= DEPLOY_TIMESTAMP,
    minPageViews: 2,
    variants: [
        control,
        {
            name: 'variant',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
};

export const GlobalEoySupportersBanner: BannerTest = {
    name: 'GlobalEoySupporters',
    bannerChannel: 'contributions',
    testAudience: 'AllExistingSupporters',
    locations: [
        'GBPCountries',
        'AUDCountries',
        'EURCountries',
        'International',
        'NZDCountries',
        'Canada',
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) =>
        Date.now() >= DEPLOY_TIMESTAMP,
    minPageViews: 2,
    variants: [
        control,
        {
            name: 'variant',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
};
