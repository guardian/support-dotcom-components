import {
    buildAmpEpicCampaignCode,
    inCountryGroups,
    replaceNonArticleCountPlaceholders,
} from '@sdc/shared/lib';
import { AmpVariantAssignments } from '../../lib/ampVariantAssignments';
import { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { ampTicker } from './ampTicker';
import { TickerDataProvider } from '../../lib/fetchTickerData';

// ---- Types --- //

type AmpExperiments = Record<
    string,
    {
        variants: Record<string, number>;
    }
>;

// ---- Functions --- //

export const getAmpExperimentData = async (tests: AmpEpicTest[]): Promise<AmpExperiments> => {
    const ampExperiments: AmpExperiments = {
        FALLBACK: {
            variants: {
                CONTROL: 99.9999999999, // 100.0 is not valid for AMP
            },
        },
    };

    tests.forEach((test: AmpEpicTest) => {
        const variants: Record<string, number> = {};

        const variantNames = test.variants.map((variant) => variant.name);
        const variantAudiencePercentage = 100 / variantNames.length;

        variantNames.forEach((variantName) => {
            variants[variantName] = variantAudiencePercentage - 0.0000000001;
        });

        ampExperiments[test.name] = {
            variants: variants,
        };
    });

    return ampExperiments;
};

export const selectAmpEpic = async (
    tests: AmpEpicTest[],
    ampVariantAssignments: AmpVariantAssignments,
    tickerData: TickerDataProvider,
    countryCode?: string,
): Promise<AMPEpic | null> =>
    selectAmpEpicTestAndVariant(tests, ampVariantAssignments, tickerData, countryCode).then(
        (test) => (!!test && hasPlaceholder(test) ? null : test),
    );

const selectAmpEpicTestAndVariant = async (
    tests: AmpEpicTest[],
    ampVariantAssignments: AmpVariantAssignments,
    tickerDataProvider: TickerDataProvider,
    countryCode?: string,
): Promise<AMPEpic | null> => {
    const test = tests.find(
        (test) => test.status === 'Live' && inCountryGroups(countryCode, test.locations),
    );

    if (test && test.variants) {
        const assignedVariantName = ampVariantAssignments[test.name];

        if (!assignedVariantName) {
            return null;
        }

        const variant = test.variants.find(
            (variant) => variant.name.toUpperCase() === assignedVariantName.toUpperCase(),
        );

        if (variant) {
            const campaignCode = buildAmpEpicCampaignCode(test.name, variant.name);
            const epicData = {
                testName: test.name,
                variantName: variant.name,
                heading: replaceNonArticleCountPlaceholders(variant.heading, countryCode),
                paragraphs: variant.paragraphs.map((p) =>
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
                secondaryCta: variant.secondaryCta,
                showChoiceCards: variant.showChoiceCards,
                defaultChoiceCardFrequency: variant.defaultChoiceCardFrequency,
            };

            if (variant.tickerSettings) {
                const tickerData = tickerDataProvider.getTickerData(variant.tickerSettings.name);
                const ticker = tickerData && ampTicker(variant.tickerSettings, tickerData);
                return { ...epicData, ticker };
            } else {
                return epicData;
            }
        }
    }
    return null;
};

// ---- Helpers --- //

// These should have been replaced, but do a final check just in case
const hasPlaceholder = (epic: AMPEpic): boolean =>
    (!!epic.heading && epic.heading.includes('%%')) ||
    epic.paragraphs.some((p) => p.includes('%%')) ||
    (!!epic.highlightedText && epic.highlightedText.includes('%%'));
