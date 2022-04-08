import { epic, epicTopReaderAcBadgeV1, epicTopReaderAcBadgeV2 } from '@sdc/shared/dist/config';
import { CountryGroupId } from '@sdc/shared/dist/lib';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';
import { Copy, CTA } from './copy';

interface Options {
    suffix: string;
    locations: CountryGroupId[];
    copy: Copy;
}

const EXCLUDE_TAG_IDS = [
    'world/ukraine',
    'world/russia',
    'australia-news/australian-politics',
    'australia-news/australian-election-2022',
];

export function buildTest({ suffix, locations, copy }: Options): EpicTest {
    return {
        name: `TopReaderArticleCountBadge__${suffix}`,
        campaignId: `TopReaderArticleCountBadge__${suffix}`,
        hasArticleCountInCopy: true,
        isOn: true,
        locations,
        audience: 1,
        tagIds: [],
        sections: [],
        excludedTagIds: EXCLUDE_TAG_IDS,
        excludedSections: [],
        alwaysAsk: false,
        maxViews: {
            maxViewsCount: 4,
            maxViewsDays: 30,
            minDaysBetweenViews: 0,
        },
        userCohort: 'AllNonSupporters',
        isLiveBlog: false,
        hasCountryName: true,
        variants: [
            {
                name: 'CONTROL',
                modulePathBuilder: epic.endpointPathBuilder,
                paragraphs: copy.control.paragraphs,
                highlightedText: copy.control.highlightedText,
                cta: CTA,
                secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
                showChoiceCards: true,
            },
            {
                name: 'V1_AC_LEAD',
                modulePathBuilder: epicTopReaderAcBadgeV1.endpointPathBuilder,
                paragraphs: copy.variants.paragraphs,
                highlightedText: copy.variants.highlightedText,
                cta: CTA,
                secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
                separateArticleCount: { type: 'above' },
                showChoiceCards: true,
            },
            {
                name: 'V2_CONGRATS_LEAD',
                modulePathBuilder: epicTopReaderAcBadgeV2.endpointPathBuilder,
                paragraphs: copy.variants.paragraphs,
                highlightedText: copy.variants.highlightedText,
                cta: CTA,
                secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
                separateArticleCount: { type: 'above' },
                showChoiceCards: true,
            },
        ],
        highPriority: true,
        useLocalViewLog: true,
        articlesViewedSettings: {
            minViews: 50,
            periodInWeeks: 52,
        },
    };
}
