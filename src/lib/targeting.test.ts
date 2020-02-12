import { isRecentOneOffContributor, shouldNotRenderEpic } from './targeting';
import { EpicTargeting } from '../components/ContributionsEpicTypes';
import testData from '../components/ContributionsEpic.testData';

// Note, this is okay because JS is single-threaded, but will cause issues once
// tests include async code so really it is not very robust.
const withNowAs = <T>(now: Date, fn: () => T): T => {
    const old = Date.now;
    Date.now = () => now.valueOf(); // override
    const got = fn();
    Date.now = old;

    return got;
};

describe('isRecentOneOffContributor', () => {
    const now = new Date('2020-02-12T10:24:00');

    it('returns true for recent date', () => {
        const got = isRecentOneOffContributor(new Date('2020-02-10T10:24:00'), now);
        expect(got).toBe(true);
    });

    it('returns false for older date', () => {
        const got = isRecentOneOffContributor(new Date('2019-02-10T10:24:00'), now);
        expect(got).toBe(false);
    });

    it('returns false for someone that has never contributed', () => {
        const got = isRecentOneOffContributor(undefined, now);
        expect(got).toBe(false);
    });
});

describe('shouldNotRenderEpic', () => {
    const meta: EpicTargeting = testData.targeting;

    const test = (m: EpicTargeting, want: boolean, now?: Date) => {
        const nowDate = now ? now : new Date();
        const got = withNowAs(nowDate, () => shouldNotRenderEpic(m));
        expect(got).toBe(want);
    };

    it('returns true for non-article', () => {
        const data = { ...meta, contentType: 'Liveblog' };
        test(data, true);
    });

    it('returns true for recent contributor', () => {
        const data = { ...meta, lastOneOffContributionDate: '2019-05-10T10:24:00' };
        test(data, true, new Date('2019-06-11T10:24:00'));
    });

    it('returns true for blacklisted section', () => {
        const data = { ...meta, sectionName: 'careers' };
        test(data, true);
    });

    it('returns false for valid data', () => {
        const data = {
            contentType: 'Article',
            sectionName: 'culture',
            shouldHideReaderRevenue: false,
            isMinuteArticle: false,
            isPaidContent: false,
            isRecurringContributor: false,
            tags: [],
        };
        test(data, false);
    });
});
