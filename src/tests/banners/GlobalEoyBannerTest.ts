import {
    BannerPageTracking,
    BannerTargeting,
    BannerTest,
    BannerVariant,
} from '../../types/BannerTypes';
import { contributionsBanner, globalEoy } from '../../modules';

//TODO
// const DEPLOY_TIMESTAMP = Date.parse('2020-12-29');
const DEPLOY_TIMESTAMP = Date.parse('2020-11-29');

const control = (body: string): BannerVariant => ({
    name: 'control',
    modulePath: contributionsBanner.endpointPath,
    moduleName: 'ContributionsBanner',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    bannerContent: {
        heading: 'We chose a different approach. Will you support it?',
        messageText: body,
        highlightedText:
            'Support the Guardian today from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
        cta: {
            text: 'Support the guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
    },
});

export const GlobalEoyNonSupportersACBanner: BannerTest = {
    name: 'GlobalEoyNonSupporters__AC',
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
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
    variants: [
        control(
            'We believe everyone deserves to read quality, independent, factual news and authoritative, calm analysis – that’s why we keep Guardian journalism open to all. The free press has never been so vital. No one sets our agenda, or edits our editor, so we can keep providing independent reporting each and every day. You’ve read %%ARTICLE_COUNT%% articles in the last year. Every contribution, however big or small, is so valuable for our future – in times of crisis and beyond.',
        ),
        {
            name: 'variant',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
};

export const GlobalEoyNonSupportersNoACBanner: BannerTest = {
    name: 'GlobalEoyNonSupporters__NoAC',
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
        control(
            'We believe everyone deserves to read quality, independent, factual news and authoritative, calm analysis – that’s why we keep Guardian journalism open to all. The free press has never been so vital. No one sets our agenda, or edits our editor, so we can keep providing independent reporting each and every day. Every contribution, however big or small, is so valuable for our future – in times of crisis and beyond.',
        ),
        {
            name: 'variant',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
};
