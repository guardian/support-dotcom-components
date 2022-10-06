import { epic } from '@sdc/shared/dist/config';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';

const CTA = {
    text: 'Continue',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const testName_AUS = '2022-09-27_CLIMATE_ADAMMORTON__AUS';

export const climate_2022_AUS: EpicTest = {
    name: testName_AUS,
    campaignId: testName_AUS,
    hasArticleCountInCopy: false,
    status: 'Live',
    locations: ['AUDCountries'],
    audience: 1,
    tagIds: [
        'environment/environment',
        'environment/climate-crisis',
        'environment/climate-change',
        'world/wildfires',
        'environment/energy',
        'business/energy-industry',
        'weather/weather',
        'world/extreme-weather',
    ],
    sections: [],
    excludedTagIds: ['tone/matchreports'],
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
                'There can be no more hiding, and no more denying. Global heating is supercharging extreme weather at an astonishing speed. Guardian analysis recently revealed how human-caused climate breakdown is accelerating the toll of extreme weather across the planet. People across the world are losing their lives and livelihoods due to more deadly and more frequent heatwaves, floods, wildfires and droughts triggered by the climate crisis.',
                'At the Guardian, we will not stop giving this life-altering issue the urgency and attention it demands. We have a huge global team of climate writers around the world and have recently appointed an extreme weather correspondent.',
                'Our editorial independence means we are free to write and publish journalism which prioritises the crisis. We can highlight the climate policy successes and failings of those who lead us in these challenging times. We have no shareholders and no billionaire owner, just the determination and passion to deliver high-impact global reporting, free from commercial or political influence.',
                'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
                'Every contribution, however big or small, powers our journalism and sustains our future.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: 'V1',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                'When I joined Guardian Australia as environment editor I made a commitment to our readers to lead a team that relentlessly and fearlessly covers the climate and environmental crises. It’s our goal to give fresh insight into these vast and urgent challenges in a way that makes a difference.',
                'We have prioritised holding governments and industry to account. We have dedicated months-long investigations and weekly columns to exposing lies and calling out greenwashing. We have told stories that explain what these complex global problems mean for Australians and our southern hemisphere neighbours. And we have shone a light on potential solutions that could guide us to the fossil fuel-free future the world needs.',
                'Tackling the climate crisis is the most important challenge we face. Thanks, in part, to the support from our readers, we have quadrupled the size of our environment and science team which has dramatically lifted our coverage. That has played a part in prompting other news media to follow our lead in paying more attention to climate change. None of this would have happened without your passion, dedication and financial support.',
                'Australia has a new government that is promising to do more on climate, but its pledges are limited – the hard work is still to come. Meanwhile, polluting industries focused on their own short-term remain influential. Holding the powerful to account is as important as ever.',
                'We have put the climate crisis at the heart of our work, knowing that accurate information is essential for the future of humanity, and the health of planet Earth.',
                'Every contribution, however big or small, powers our journalism and sustains our future.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
            bylineWithImage: {
                name: 'Adam Morton',
                description: 'Environment and climate editor, Guardian Australia',
                headshot: {
                    mainUrl:
                        'https://i.guim.co.uk/img/media/3de3083e3c29a88b1b2724ae533d6246f9ba1c4a/0_0_720_600/720.png?quality=85&s=fe8b0ecfacea95020a6939c4260b8f82',
                    altText: 'Adam Morton staff byline photograph',
                },
            },
        },
    ],
};
