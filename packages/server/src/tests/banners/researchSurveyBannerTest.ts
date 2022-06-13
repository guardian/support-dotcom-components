import { BannerTemplate, BannerTestGenerator } from '@sdc/shared/dist/types';
import { researchSurveyBanner } from '@sdc/shared/dist/config';

const startDate = new Date('2022-06-14');
const endDate = new Date('2022-06-17');
const isLive = () => {
    const now = new Date();
    return now > startDate && now < endDate;
};

export const researchSurveyBannerTest: BannerTestGenerator = () => {
    if (isLive()) {
        return Promise.resolve([
            {
                name: '2022-05-26_research-survey-banner-test',
                bannerChannel: 'subscriptions',
                isHardcoded: true,
                userCohort: 'Everyone',
                status: 'Live',
                canRun: targeting => targeting.contentType !== 'Network Front',
                minPageViews: 4,
                audience: 0.05, // 5%
                audienceOffset: 0,
                variants: [
                    {
                        name: 'control',
                        modulePathBuilder: researchSurveyBanner.endpointPathBuilder,
                        moduleName: BannerTemplate.ResearchSurveyBanner,
                        bannerContent: {
                            heading: 'Take part in this short survey from the Guardian',
                            paragraphs: [
                                "We are always looking to improve what we do and we'd love to have your input. The feedback we receive will enable us to improve our website and products to better meet your needs, and should take less than 5 minutes to complete.",
                            ],
                            cta: {
                                text: 'Take the survey',
                                baseUrl:
                                    'https://surveys.theguardian.com/c/a/6NlT5qcs0w6E6NVjsTpVO8',
                            },
                        },
                        componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
                        separateArticleCount: false,
                    },
                ],
            },
        ]);
    }
    return Promise.resolve([]);
};
