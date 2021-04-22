import { Test } from '../lib/variants';
import { epicAdventure } from '../modules';

export const contributionsEpicAdventureTest = (): Promise<Test> => {
    return Promise.resolve({
        name: 'ContributionsEpicAdventure',
        expiry: '2025-01-27',
        campaignId: 'ContributionsEpicAdventure',
        isOn: true,
        locations: [],
        audience: 1,
        tagIds: [],
        sections: [],
        excludedTagIds: [],
        excludedSections: [],
        alwaysAsk: true,
        userCohort: 'AllNonSupporters',
        isLiveBlog: false,
        hasCountryName: false,
        variants: [
            {
                name: 'control',
                paragraphs: [],
                modulePathBuilder: epicAdventure.endpointPathBuilder,
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support the Guardian',
                },
                highlightedText:
                    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.',
            },
        ],
        highPriority: false,
        useLocalViewLog: false,
    });
};
