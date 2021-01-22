import fetch from 'node-fetch';
import { EpicTests, Variant } from '../lib/variants';
import { isProd } from '../lib/env';
import { fetchS3Data } from '../utils/S3';

const defaultEpicUrl =
    'https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json';

export const fetchDefaultEpicContent = async (): Promise<Variant> => {
    const startTime = new Date().getTime();

    const response = await fetch(defaultEpicUrl, { timeout: 1000 * 20 });
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

type EpicTestList = 'ARTICLE' | 'ARTICLE_HOLDBACK' | 'LIVEBLOG';

type EpicTestListTestFileLookup = {
    [e in EpicTestList]: string;
};

const EPIC_TEST_LIST_FILE_LOOKUP: EpicTestListTestFileLookup = {
    ARTICLE: 'epic-tests.json',
    ARTICLE_HOLDBACK: 'epic-holdback-tests.json',
    LIVEBLOG: 'liveblog-epic-tests.json',
};

export const fetchConfiguredEpicTests = async (testList: EpicTestList): Promise<EpicTests> => {
    const file = EPIC_TEST_LIST_FILE_LOOKUP[testList];
    const key = `epic/${isProd ? 'PROD' : 'CODE'}/${file}`;

    return fetchS3Data('gu-contributions-public', key).then(JSON.parse);
};
