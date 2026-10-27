import type { Inline1Targeting, Inline1Test, Inline1Variant } from '../../../shared/types';
import { selectBestTest } from './inline1Selection';

const variantDefault: Inline1Variant = {
    name: 'control',
    message: {
        type: 'Inline1PuzzlesMessage',
    },
};

const testDefault: Inline1Test = {
    channel: 'Inline1',
    name: 'inline1-example',
    priority: 1,
    status: 'Live',
    userCohort: 'AllNonSupporters',
    contextTargeting: {
        tagIds: [],
        sectionIds: [],
        excludedTagIds: [],
        excludedSectionIds: [],
    },
    variants: [variantDefault],
};

const targetingDefault: Inline1Targeting = {
    showSupportMessaging: true,
    mvtId: 2,
    countryCode: 'GB',
    isSignedIn: false,
    hasConsented: true,
};

const userDeviceType = 'Desktop';

describe('selectBestTest', () => {
    it('should select the matching test and variant', () => {
        const got = selectBestTest(targetingDefault, [testDefault], userDeviceType);

        expect(got).toEqual({
            test: testDefault,
            variant: variantDefault,
        });
    });

    it('should select the first matching test', () => {
        const tests = [
            { ...testDefault, name: 'draft-test', status: 'Draft' as const },
            { ...testDefault, name: 'first-live-test' },
            { ...testDefault, name: 'second-live-test' },
        ];

        const got = selectBestTest(targetingDefault, tests, userDeviceType);

        expect(got?.test.name).toBe('first-live-test');
    });

    it('should return null when there are no tests', () => {
        const got = selectBestTest(targetingDefault, [], userDeviceType);

        expect(got).toBeNull();
    });

    it('should return null when the test is not live', () => {
        const test = { ...testDefault, status: 'Draft' as const };

        const got = selectBestTest(targetingDefault, [test], userDeviceType);

        expect(got).toBeNull();
    });

    it('should return null when the audience does not match', () => {
        const test = { ...testDefault, userCohort: 'AllExistingSupporters' as const };

        const got = selectBestTest(targetingDefault, [test], userDeviceType);

        expect(got).toBeNull();
    });

    it('should return null when the country is not targeted', () => {
        const test: Inline1Test = {
            ...testDefault,
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: ['US'],
            },
        };

        const got = selectBestTest(targetingDefault, [test], userDeviceType);

        expect(got).toBeNull();
    });

    it('should return null when contributions-only targeting excludes the country', () => {
        const test: Inline1Test = {
            ...testDefault,
            regionTargeting: {
                targetedCountryGroups: [],
                contributionsOnlyCountriesTargeting: 'Exclude',
            },
        };
        const targeting = { ...targetingDefault, countryCode: 'VN' };

        const got = selectBestTest(targeting, [test], userDeviceType, ['VN']);

        expect(got).toBeNull();
    });

    it('should select a test in a contributions-only country when targeting mode is Include', () => {
        const test: Inline1Test = {
            ...testDefault,
            regionTargeting: {
                targetedCountryGroups: [],
                contributionsOnlyCountriesTargeting: 'Include',
            },
        };
        const targeting = { ...targetingDefault, countryCode: 'VN' };

        const got = selectBestTest(targeting, [test], userDeviceType, ['VN']);

        expect(got?.test).toBe(test);
    });

    it('should return null when article history does not meet the test settings', () => {
        const test = {
            ...testDefault,
            articlesViewedSettings: {
                minViews: 1,
                periodInWeeks: 52,
            },
        };

        const got = selectBestTest(targetingDefault, [test], userDeviceType);

        expect(got).toBeNull();
    });

    it('returns test if enough article views', () => {
        const now = new Date('2020-03-31T12:30:00');
        const test = {
            ...testDefault,
            articlesViewedSettings: {
                minViews: 5,
                periodInWeeks: 52,
            },
        };
        const targeting = Object.assign(targetingDefault, {
            weeklyArticleHistory: [{ week: 18330, count: 6 }],
        });

        const got = selectBestTest(targeting, [test], userDeviceType, [], now);

        expect(got?.test).toBe(test);
    });

    it('should return null when the device type does not match', () => {
        const test = { ...testDefault, deviceType: 'iOS' as const };

        const got = selectBestTest(targetingDefault, [test], userDeviceType);

        expect(got).toBeNull();
    });

    it('should return null when the signed-in status does not match', () => {
        const test = { ...testDefault, signedInStatus: 'SignedIn' as const };

        const got = selectBestTest(targetingDefault, [test], userDeviceType);

        expect(got).toBeNull();
    });

    it('should return null when the page context does not match', () => {
        const test: Inline1Test = {
            ...testDefault,
            contextTargeting: {
                tagIds: ['politics/politics'],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };

        const got = selectBestTest(targetingDefault, [test], userDeviceType);

        expect(got).toBeNull();
    });

    it('should return null when the consent status does not match', () => {
        const test = { ...testDefault, consentStatus: 'HasNotConsented' as const };

        const got = selectBestTest(targetingDefault, [test], userDeviceType);

        expect(got).toBeNull();
    });
});
