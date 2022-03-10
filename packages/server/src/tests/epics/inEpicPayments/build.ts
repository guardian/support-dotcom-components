import {
    ArticlesViewedSettings,
    EpicTest,
    SecondaryCtaType,
    SeparateArticleCount,
} from '@sdc/shared/types';
import { epic, epicWithCheckout } from '@sdc/shared/config';
import { CountryGroupId } from '@sdc/shared/dist/lib';
import { Copy, CTA } from './copy';

interface Options {
    suffix: string;
    locations: CountryGroupId[];
    copy: Copy;
}

export function buildTest({ suffix, locations, copy }: Options): EpicTest {
    return _build({
        suffix,
        locations,
        copy,
        separateArticleCount: { type: 'above' },
        articlesViewedSettings: { minViews: 0, maxViews: 49, periodInWeeks: 52 },
    });
}

export function buildTopReaderTest({ suffix, locations, copy }: Options): EpicTest {
    return _build({
        suffix,
        locations,
        copy,
        articlesViewedSettings: { minViews: 50, periodInWeeks: 52 },
    });
}

// ---- Helpers ---- //

interface _Options extends Options {
    separateArticleCount?: SeparateArticleCount;
    articlesViewedSettings: ArticlesViewedSettings;
}

const EXCLUDE_TAG_IDS = [
    'global-investigations',
    'news/series/pandora-papers',
    'news/series/pegasus-project',
    'news/series/panama-papers',
    'news/series/suisse-secrets',
    'world/ukraine',
    'world/russia',
];

function _build({
    suffix,
    locations,
    copy,
    separateArticleCount,
    articlesViewedSettings,
}: _Options): EpicTest {
    return {
        name: `InEpicPaymentTest__${suffix}`,
        campaignId: `InEpicPaymentTest__${suffix}`,
        hasArticleCountInCopy: copy.hasArticleCount,
        isOn: false,
        locations: locations,
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
                name: 'control',
                modulePathBuilder: epic.endpointPathBuilder,
                paragraphs: copy.paragraphs,
                highlightedText: copy.highlightedText,
                cta: CTA,
                secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
                separateArticleCount: separateArticleCount,
                showChoiceCards: true,
            },
            {
                name: 'variant',
                modulePathBuilder: epicWithCheckout.endpointPathBuilder,
                paragraphs: copy.paragraphs,
                highlightedText: copy.highlightedText,
                cta: CTA,
                secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
                separateArticleCount: separateArticleCount,
            },
        ],
        highPriority: true,
        useLocalViewLog: true,
        articlesViewedSettings: articlesViewedSettings,
    };
}
