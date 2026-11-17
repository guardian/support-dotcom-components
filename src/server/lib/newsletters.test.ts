import { ValueReloader } from '../utils/valueReloader';
import type { NewsletterData } from './newsletters';
import {
    buildNewslettersReloader,
    fetchNewsletters,
    getNewsletterForTestName,
} from './newsletters';

jest.mock('../utils/valueReloader', () => ({
    ValueReloader: jest.fn(),
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

describe('buildNewslettersReloader', () => {
    it('returns a promise for an empty-cache reloader that fetches in the background', async () => {
        const reloaderPromise = buildNewslettersReloader();

        expect(reloaderPromise).toBeInstanceOf(Promise);
        expect(jest.mocked(ValueReloader)).toHaveBeenCalledWith([], fetchNewsletters, 5 * 60);
        await reloaderPromise;
    });
});
