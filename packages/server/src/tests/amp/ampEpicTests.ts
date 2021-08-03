import {
    buildAmpEpicCampaignCode,
    inCountryGroups,
    replaceNonArticleCountPlaceholders,
} from '@sdc/shared/lib';
import { AmpVariantAssignments } from '../../lib/ampVariantAssignments';
import { cacheAsync } from '../../lib/cache';
import { isProd } from '../../lib/env';
import { fetchS3Data } from '../../utils/S3';
import { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { ampTicker } from './ampTicker';

/**
 * Fetches AMP epic tests configuration from the tool.
 * Everything is a 'test' in the tool, even though we do not currently support A/B testing for AMP.
 * So each test will have a single variant.
 */

const fetchAmpEpicTests = (): Promise<AmpEpicTest[]> =>
    fetchS3Data('gu-contributions-public', `epic/${isProd ? 'PROD' : 'CODE'}/amp-epic-tests.json`)
        .then(JSON.parse)
        .then(data => {
            return data.tests;
        });

export const [, getCachedAmpEpicTests] = cacheAsync<AmpEpicTest[]>(
    fetchAmpEpicTests,
    60,
    'ampEpicTests',
    true,
);

type AmpExperiments = Record<
    string,
    {
        variants: Record<string, number>;
    }
>;

export const getAmpExperimentData = async (): Promise<AmpExperiments> => {
    const cachedTests = await getCachedAmpEpicTests();
    const ampExperiments: AmpExperiments = {
        FALLBACK: {
            variants: {
                CONTROL: 99.9999999999, // 100.0 is not valid for AMP
            },
        },
    };

    cachedTests.forEach((test: AmpEpicTest) => {
        const variants: Record<string, number> = {};

        const variantNames = test.variants.map(variant => variant.name);
        const variantAudiencePercentage = 100 / variantNames.length;

        variantNames.forEach(variantName => {
            variants[variantName] = variantAudiencePercentage - 0.0000000001;
        });

        ampExperiments[test.name] = {
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

        if (!assignedVariantName) {
            return null;
        }

        const variant = test.variants.find(
            variant => variant.name.toUpperCase() === assignedVariantName.toUpperCase(),
        );

        if (variant) {
            const campaignCode = buildAmpEpicCampaignCode(test.name, variant.name);
            const epicData = {
                testName: test.name,
                variantName: variant.name,
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
                    componentId: campaignCode,
                    campaignCode: campaignCode,
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
