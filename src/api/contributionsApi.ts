import fetch from 'node-fetch';
import { EpicTests, Variant } from '../lib/variants';
import { isProd } from '../lib/env';
import { BannerData } from '../components/BannerTypes';

const defaultEpicUrl =
    'https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json';

const configuredEpicTestsUrl = isProd
    ? 'https://support.theguardian.com/epic-tests.json'
    : 'https://support.code.dev-theguardian.com/epic-tests.json';

export const fetchDefaultEpicContent = async (): Promise<Variant> => {
    const startTime = new Date().getTime();

    const response = await fetch(defaultEpicUrl);
    if (!response.ok) {
        throw new Error(
            `Encountered a non-ok response when fetching default epic: ${response.status}`,
        );
    }
    const data = await response.json();
    const control = data?.sheets?.control;

    const emptyVariant = {
        paragraphs: [],
        name: 'remote_epic_test',
        cta: {
            text: 'Support The Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
    };

    const transformedData = control.reduce(
        (acc: Variant, item: { heading: string; paragraphs: string; highlightedText: string }) => {
            if (!acc.heading && item.heading) {
                acc.heading = item.heading;
            }
            if (item.paragraphs) {
                acc.paragraphs.push(item.paragraphs);
            }
            if (item.highlightedText) {
                acc.highlightedText = acc.highlightedText || item.highlightedText;
            }
            return acc;
        },
        emptyVariant,
    );

    const endTime = new Date().getTime();
    console.log(`Fetched default epic content. Time elapsed: ${endTime - startTime}ms`);

    return transformedData;
};

export const fetchConfiguredEpicTests = async (): Promise<EpicTests> => {
    const response = await fetch(configuredEpicTestsUrl);
    if (!response.ok) {
        throw new Error(
            `Encountered a non-ok response when fetching configured epic tests: ${response.status}`,
        );
    }

    return response.json();
};

const defaultBannerUrl =
    'https://interactive.guim.co.uk/docsdata/1CIHCoe87hyPHosXx1pYeVUoohvmIqh9cC_kNlV-CMHQ.json';

export const fetchDefaultBannerContent = async (): Promise<BannerData> => {
    const startTime = new Date().getTime();

    const response = await fetch(defaultBannerUrl);
    if (!response.ok) {
        throw new Error(
            `Encountered a non-ok response when fetching default engagement banner: ${response.status}`,
        );
    }
    const data = await response.json();
    const bannerData = data?.sheets?.control;

    const endTime = new Date().getTime();
    console.log(
        `Fetched default engagement banner content. Time elapsed: ${endTime - startTime}ms`,
    );

    return bannerData;
};
