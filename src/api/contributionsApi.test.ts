import { fetchDefaultEpicContent } from './contributionsApi';

jest.mock('node-fetch', () => require('fetch-mock').sandbox());
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchMock = require('node-fetch');

describe('fetchDefaultEpic', () => {
    it('fetches and returns the data in the expected format', async () => {
        const url =
            'https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json';

        const response = {
            sheets: {
                control: [
                    {
                        heading: 'Since you’re here...',
                        paragraphs: 'First paragraph',
                        highlightedText: 'Highlighted Text',
                    },
                    {
                        heading: '',
                        paragraphs: 'Second paragraph',
                        highlightedText: '',
                    },
                ],
            },
        };

        fetchMock.get(url, response);

        const epicData = await fetchDefaultEpicContent();

        expect(epicData).toEqual({
            heading: 'Since you’re here...',
            paragraphs: ['First paragraph', 'Second paragraph'],
            highlighted: ['Highlighted Text'],
        });
    });
});
