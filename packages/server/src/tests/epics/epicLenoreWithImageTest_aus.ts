import { epic } from '@sdc/shared/dist/config';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';

const CTA = {
    text: 'Continue',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const testName = '2022_07_22_LENORE_PICTURE';

export const epicLenoreWithImageTest_AUS: EpicTest = {
    name: testName,
    campaignId: testName,
    hasArticleCountInCopy: false,
    status: 'Live',
    locations: ['AUDCountries'],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: ['business/cost-of-living-crisis', 'world/cost-of-living-crisis', 'society/poverty', 'series/global-cost-of-living-crisis', 'business/inflation', 'global-development/food-security', 'us-news/us-capital-breach', 'us-news/donaldtrump', 'world/russia', 'world/ukraine', 'world/abortion', 'us-news/roe-v-wade', 'society/reproductive-rights', 'society/women', 'global-development/womens-rights-and-gender-equality', 'football/football', 'environment/environment'],
    excludedSections: [],
    alwaysAsk: false,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: true,
    useLocalViewLog: false,
    variants: [
        {
            name: 'CONTROL',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                "… we have a small favour to ask. Tens of millions have placed their trust in the Guardian's fearless journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially - keeping us open to all, and fiercely independent.",
                'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
                'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
                'Every contribution, however big or small, powers our journalism and sustains our future.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 - it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: 'V1_AUTHORED',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                '… when I joined Guardian Australia as founding political editor, I wanted to be part of a project that brought a new, independent, fierce and progressive voice to one of the most heavily concentrated media markets in the world.',
                'From the start, we identified issues we felt were underreported and where we thought we could make a difference: the climate emergency, Indigenous affairs, gender equality, welfare policy, the treatment of asylum seekers. Nearly a decade later, and six years after I stepped up to be editor, I believe our reporting is making a difference.',
                'On climate, we have consistently called out inaction and written about how things might be. We have held policy-makers to account and documented how global heating is changing the lives of Australians. We have helped to shift the debate on Indigenous deaths in custody via our years-long Deaths Inside investigation, and produced award-winning coverage of the fight for gender equality.',
                "But the fight for progress continues, and we can't do any of this without the support of our readers. It is your passion, engagement and financial contributions which underpin our journalism. We have no billionaire owner or shareholders. We are independent, and every dollar we receive is invested back into creating quality journalism that remains free and open for all to read.",
                'If you are able to help with a monthly or single contribution, it will boost our resources and enhance our ability to continue this vital work.',
                'Thank you',
            ],
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
            bylineWithImage: {
                name: 'Lenore Taylor',
                description: 'Editor, Guardian Australia',
            },
        },
        {
            name: 'V2_PICTURE',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                '… when I joined Guardian Australia as founding political editor, I wanted to be part of a project that brought a new, independent, fierce and progressive voice to one of the most heavily concentrated media markets in the world.',
                'From the start, we identified issues we felt were underreported and where we thought we could make a difference: the climate emergency, Indigenous affairs, gender equality, welfare policy, the treatment of asylum seekers. Nearly a decade later, and six years after I stepped up to be editor, I believe our reporting is making a difference.',
                'On climate, we have consistently called out inaction and written about how things might be. We have held policy-makers to account and documented how global heating is changing the lives of Australians. We have helped to shift the debate on Indigenous deaths in custody via our years-long Deaths Inside investigation, and produced award-winning coverage of the fight for gender equality.',
                "But the fight for progress continues, and we can't do any of this without the support of our readers. It is your passion, engagement and financial contributions which underpin our journalism. We have no billionaire owner or shareholders. We are independent, and every dollar we receive is invested back into creating quality journalism that remains free and open for all to read.",
                'If you are able to help with a monthly or single contribution, it will boost our resources and enhance our ability to continue this vital work.',
                'Thank you',
            ],
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
            bylineWithImage: {
                name: 'Lenore Taylor',
                description: 'Editor, Guardian Australia',
                headshot: {
                    mainUrl:
                        'https://i.guim.co.uk/img/uploads/2018/10/30/Lenore_Taylor,_R.png?width=300&quality=85&auto=format&fit=max&s=3912263e9fe2895681b281d3a6c7d1f1',
                    altText: 'Lenore Taylor staff byline photograph',
                },
            },
        },
    ],
};
