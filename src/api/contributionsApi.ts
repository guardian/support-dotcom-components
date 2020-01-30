import fetch from 'node-fetch';

const defaultEpicUrl =
    'https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json';

export type DefaultEpicContent = {
    heading?: string;
    paragraphs: string[];
    highlighted: string[];
};

let epicContent: Promise<DefaultEpicContent> | undefined;

const fetchDefaultEpicContentWithoutCaching = async (): Promise<DefaultEpicContent> => {
    const response = await fetch(defaultEpicUrl);
    if (!response.ok) {
        throw new Error(
            `Encountered a non-ok response when fetching default epic: ${response.status}`,
        );
    }
    const data = await response.json();
    const control = data?.sheets?.control;

    return control.reduce(
        (
            acc: DefaultEpicContent,
            item: { heading: string; paragraphs: string; highlightedText: string },
        ) => {
            if (!acc.heading && item.heading) {
                acc.heading = item.heading;
            }
            if (item.paragraphs) {
                acc.paragraphs.push(item.paragraphs);
            }
            if (item.highlightedText) {
                acc.highlighted.push(item.highlightedText);
            }
            return acc;
        },
        { paragraphs: [], highlighted: [] },
    );
};

export const fetchDefaultEpicContent = (): Promise<DefaultEpicContent> => {
    if (epicContent) {
        return epicContent;
    }

    epicContent = fetchDefaultEpicContentWithoutCaching();

    return epicContent;
};
