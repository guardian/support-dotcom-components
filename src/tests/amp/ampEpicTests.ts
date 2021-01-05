import { inCountryGroups } from '../../lib/geolocation';
import { isProd } from '../../lib/env';
import fetch from 'node-fetch';
import { cacheAsync } from '../../lib/cache';
import { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { replaceNonArticleCountPlaceholders } from '../../lib/placeholders';
import { ampTicker } from './ampTicker';
import { AmpVariantAssignments } from '../../lib/ampVariantAssignments';

/**
 * Fetches AMP epic tests configuration from the tool.
 * Everything is a 'test' in the tool, even though we do not currently support A/B testing for AMP.
 * So each test will have a single variant.
 */

const url = isProd
    ? 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/epic/PROD/amp-epic-tests.json'
    : 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/epic/CODE/amp-epic-tests.json';

const fetchAmpEpicTests = (): Promise<AmpEpicTest[]> =>
    fetch(url)
        .then(response => response.json())
        .then(data => {
            return data.tests;
        });

export const [, getCachedAmpEpicTests] = cacheAsync<AmpEpicTest[]>(
    fetchAmpEpicTests,
    60,
    'ampEpicTests',
    true,
);

type AmpExperiments = {
    [key: string]: {
        variants: {
            [key: string]: number;
        };
    };
};

export const getAmpExperimentData = async (): Promise<AmpExperiments> => {
    const cachedTests = await getCachedAmpEpicTests();
    const ampExperiments: AmpExperiments = {
        FALLBACK: {
            variants: {
                control: 99.9999999999, // 100.0 is not valid for AMP
            },
        },
    };

    cachedTests.forEach((test: AmpEpicTest) => {
        const variants: { [key: string]: number } = {};

        const variantNames = test.variants.map(variant => variant.name);
        const variantAudiencePercentage = 100 / variantNames.length;

        variantNames.forEach(variantName => {
            variants[variantName.toUpperCase()] = variantAudiencePercentage - 0.0000000001;
        });

        ampExperiments[test.name.toUpperCase()] = {
            variants: variants,
        };
    });

    return ampExperiments;
};

export const selectAmpEpicTestAndVariant = async (
    tests: AmpEpicTest[],
    ampVariantAssignments: AmpVariantAssignments,
    countryCode?: string,
): Promise<AMPEpic | null> => {
    const test = tests.find(test => test.isOn && inCountryGroups(countryCode, test.locations));

    if (test && test.variants) {
        const assignedVariantName = ampVariantAssignments[test.name];
        const variant = test.variants.find(variant => variant.name === assignedVariantName);

        if (variant) {
            const epicData = {
                testName: test.name.toUpperCase(),
                variantName: variant.name.toUpperCase(),
                heading: replaceNonArticleCountPlaceholders(variant.heading, countryCode),
                paragraphs: variant.paragraphs.map(p =>
                    replaceNonArticleCountPlaceholders(p, countryCode),
                ),
                highlightedText: replaceNonArticleCountPlaceholders(
                    variant.highlightedText,
                    countryCode,
                ),
                cta: {
                    text: variant.cta ? variant.cta.text : 'Support the Guardian',
                    url: variant.cta
                        ? variant.cta.baseUrl
                        : 'https://support.theguardian.com/contribute',
                    componentId: `${test.name}-${variant.name}`,
                    campaignCode: `${test.name}-${variant.name}`,
                },
            };

            if (variant.tickerSettings) {
                const ticker = await ampTicker(variant.tickerSettings);
                return { ...epicData, ticker };
            } else {
                return epicData;
            }
        }
    }
    return null;
};

// These should have been replaced, but do a final check just in case
const hasPlaceholder = (epic: AMPEpic): boolean =>
    (!!epic.heading && epic.heading.includes('%%')) ||
    epic.paragraphs.some(p => p.includes('%%')) ||
    (!!epic.highlightedText && epic.highlightedText.includes('%%'));

export const selectAmpEpic = (
    ampVariantAssignments: AmpVariantAssignments,
    countryCode?: string,
): Promise<AMPEpic | null> =>
    getCachedAmpEpicTests()
        .then(tests => selectAmpEpicTestAndVariant(tests, ampVariantAssignments, countryCode))
        .then(test => (!!test && hasPlaceholder(test) ? null : test));
