import fetch from 'node-fetch';
import { EpicTests, Variant } from '../lib/variants';
import { isProd } from '../lib/env';
import { fetchS3Data } from '../utils/S3';
import { EpicType } from '../components/modules/epics/ContributionsEpicTypes';

const defaultEpicUrl =
    'https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json';

export const fetchDefaultEpicContent = async (): Promise<Variant> => {
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

    return control.reduce(
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
};

export const fetchConfiguredEpicTests = async (type: EpicType): Promise<EpicTests> => {
    const file = type === 'ARTICLE' ? 'epic-tests.json' : 'liveblog-epic-tests.json';
    const key = `epic/${isProd ? 'PROD' : 'CODE'}/${file}`;

    return fetchS3Data('gu-contributions-public', key).then(JSON.parse);
};
