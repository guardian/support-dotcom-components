import type { NewsletterData } from './newsletters';
import { getNewsletterForTestName } from './newsletters';

jest.mock('../utils/valueReloader', () => ({
    buildReloader: jest.fn(),
}));

describe('getNewsletterForTestName', () => {
    const newsletters: Array<Pick<NewsletterData, 'listId'>> = [{ listId: 6069 }, { listId: 4149 }];

    it.each([
        ['NEWSLETTER_STAKES', 6069],
        ['NEWSLETTER_NAZA', 4149],
    ])('selects newsletter list ID %s for the configured test name', (testName, listId) => {
        expect(getNewsletterForTestName(testName, newsletters)?.listId).toBe(listId);
    });

    it('returns no newsletter for an unconfigured test', () => {
        expect(getNewsletterForTestName('NEWSLETTER_STAKES_US', newsletters)).toBeUndefined();
        expect(getNewsletterForTestName('NEWSLETTER_OTHER', newsletters)).toBeUndefined();
    });
});
