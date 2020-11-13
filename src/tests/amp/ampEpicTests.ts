import { inCountryGroups } from '../../lib/geolocation';
import { isProd } from '../../lib/env';
import fetch from 'node-fetch';
import { cacheAsync } from '../../lib/cache';
import { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { replaceNonArticleCountPlaceholders } from '../../lib/placeholders';
import { getAmpTicker } from "../getAmpTicker";

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

const [, getCachedAmpEpicTests] = cacheAsync<AmpEpicTest[]>(
    fetchAmpEpicTests,
    60,
    'ampEpicTests',
    true,
);

export const selectAmpEpicTest = async (tests: AmpEpicTest[], countryCode?: string): Promise<AMPEpic | null> => {
    const test = tests.find(test => test.isOn && inCountryGroups(countryCode, test.locations));

    if (test && test.variants[0]) {
        const variant = test.variants[0];

        const epicData = {
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
            }
        };

        if (variant.tickerSettings) {
            const ticker = await getAmpTicker(variant.tickerSettings);
            return {...epicData, ticker };
        } else {
            return epicData;
        }
    }
    return null;
};

// These should have been replaced, but do a final check just in case
const hasPlaceholder = (epic: AMPEpic): boolean =>
    (!!epic.heading && epic.heading.includes('%%')) ||
    epic.paragraphs.some(p => p.includes('%%')) ||
    (!!epic.highlightedText && epic.highlightedText.includes('%%'));

export const selectAmpEpic = (countryCode?: string): Promise<AMPEpic | null> =>
    getCachedAmpEpicTests()
        .then(tests => selectAmpEpicTest(tests, countryCode))
        .then(test => (!!test && hasPlaceholder(test) ? null : test));
