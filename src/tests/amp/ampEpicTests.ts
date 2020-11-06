import {inCountryGroups} from "../../lib/geolocation";
import {isProd} from "../../lib/env";
import fetch from 'node-fetch';
import {cacheAsync} from "../../lib/cache";
import {AMPEpic, AmpEpicTest} from "./ampEpicModels";

const url = isProd
    ? 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/epic/PROD/amp-epic-tests.json'
    : 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/epic/CODE/amp-epic-tests.json';

const fetchAmpEpicTests = (): Promise<AmpEpicTest[]> =>
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data.tests;
        });


const [, getCachedAmpEpicTests] = cacheAsync<AmpEpicTest[]>(fetchAmpEpicTests, 60, 'ampEpicTests', true);

export const selectAmpEpic = (countryCode?: string): Promise<AMPEpic | null> =>
    getCachedAmpEpicTests().then(tests => {
        const test = tests.find(test => inCountryGroups(countryCode, test.locations));
        if (test && test.variants[0]) {
            const variant = test.variants[0];
            return {
                heading: variant.heading,
                paragraphs: variant.paragraphs,
                highlightedText: variant.highlightedText,
                cta: {
                    text: variant.cta ? variant.cta.text : 'Support the Guardian',
                    url: variant.cta ? variant.cta.baseUrl : 'https://support.theguardian.com/contribute',
                    componentId: `${test.name}-${variant.name}`,
                    campaignCode: `${test.name}-${variant.name}`,
                }
            }
        }
        return null;
    });
