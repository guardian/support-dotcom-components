import { BannerTemplate, BannerTestGenerator, SecondaryCtaType } from '@sdc/shared/dist/types';
import { contributionsBanner, researchSurveyBanner } from '@sdc/shared/dist/config';

/**
 * TODO:
 * - copy
 * - audience size
 * - targeting
 */
export const researchSurveyBannerTest: BannerTestGenerator = () =>
    Promise.resolve([
        {
            name: '2022-05-26_research-survey-banner-test',
            bannerChannel: 'subscriptions',
            isHardcoded: true,
            userCohort: 'AllNonSupporters',
            canRun: () => true,
            minPageViews: 4,
            variants: [
                {
                    name: 'control',
                    modulePathBuilder: contributionsBanner.endpointPathBuilder,
                    moduleName: BannerTemplate.ContributionsBanner,
                    bannerContent: {
                        heading: 'Power open, independent journalism',
                        paragraphs: [],
                        highlightedText: '',
                        cta: {
                            baseUrl:
                                'https://support.theguardian.com/subscribe/digital/checkout?promoCode=DK0NT24WG&period=Monthly',
                            text: 'Subscribe',
                        },
                        secondaryCta: {
                            type: SecondaryCtaType.Custom,
                            cta: {
                                baseUrl: 'https://support.theguardian.com/subscribe/digital',
                                text: 'Find out more',
                            },
                        },
                    },
                    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
                    separateArticleCount: false,
                },
                {
                    name: 'variant',
                    modulePathBuilder: researchSurveyBanner.endpointPathBuilder,
                    moduleName: BannerTemplate.ResearchSurveyBanner,
                    bannerContent: {
                        heading: 'Take part in this short survey from the Guardian',
                        paragraphs: [
                            "We are always looking to improve what we do and we'd love to have your input. The feedback we receive will enable us to improve our website and products to better meet your needs, and should take less than 5 minutes to complete.",
                        ],
                        cta: {
                            text: 'Take the survey',
                            baseUrl: 'https://surveys.theguardian.com/c/a/6NlT5qcs0w6E6NVjsTpVO8',
                        },
                    },
                    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
                    separateArticleCount: false,
                },
            ],
        },
    ]);
