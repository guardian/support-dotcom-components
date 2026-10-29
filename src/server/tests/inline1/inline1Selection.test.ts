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

const newsletterVariant: Inline1Variant = {
    name: 'newsletter',
    message: {
        type: 'Inline1NewsletterMessage',
        newsletterId: 'example-newsletter',
        frequency: 'Weekly',
        heading: 'Sign up for our newsletter',
        body: 'Get the latest news.',
    },
};

const targetingDefault: Inline1Targeting = {
    showSupportMessaging: true,
    mvtId: 2,
    countryCode: 'GB',
    isSignedIn: false,
    hasConsented: true,
    hasNewsletterSignup: false,
};

const userDeviceType = 'Desktop';

const getMParticleProfile = () => Promise.resolve(undefined);

describe('selectBestTest', () => {
    it('should select the matching test and variant', async () => {
        const got = await selectBestTest(
            targetingDefault,
            [testDefault],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toEqual({
            test: testDefault,
            variant: variantDefault,
        });
    });

    it('should select the first matching test', async () => {
        const tests = [
            { ...testDefault, name: 'draft-test', status: 'Draft' as const },
            { ...testDefault, name: 'first-live-test' },
            { ...testDefault, name: 'second-live-test' },
        ];

        const got = await selectBestTest(
            targetingDefault,
            tests,
            userDeviceType,
            getMParticleProfile,
        );

        expect(got?.test.name).toBe('first-live-test');
    });

    it('should return null when there are no tests', async () => {
        const got = await selectBestTest(targetingDefault, [], userDeviceType, getMParticleProfile);

        expect(got).toBeNull();
    });

    it('should return null when the test is not live', async () => {
        const test = { ...testDefault, status: 'Draft' as const };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });

    it('should return null when the audience does not match', async () => {
        const test = { ...testDefault, userCohort: 'AllExistingSupporters' as const };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });

    it('should return null when the country is not targeted', async () => {
        const test: Inline1Test = {
            ...testDefault,
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: ['US'],
            },
        };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });

    it('should return null when contributions-only targeting excludes the country', async () => {
        const test: Inline1Test = {
            ...testDefault,
            regionTargeting: {
                targetedCountryGroups: [],
                contributionsOnlyCountriesTargeting: 'Exclude',
            },
        };
        const targeting = { ...targetingDefault, countryCode: 'VN' };

        const got = await selectBestTest(targeting, [test], userDeviceType, getMParticleProfile, [
            'VN',
        ]);

        expect(got).toBeNull();
    });

    it('should select a test in a contributions-only country when targeting mode is Include', async () => {
        const test: Inline1Test = {
            ...testDefault,
            regionTargeting: {
                targetedCountryGroups: [],
                contributionsOnlyCountriesTargeting: 'Include',
            },
        };
        const targeting = { ...targetingDefault, countryCode: 'VN' };

        const got = await selectBestTest(targeting, [test], userDeviceType, getMParticleProfile, [
            'VN',
        ]);

        expect(got?.test).toBe(test);
    });

    it('should return null when article history does not meet the test settings', async () => {
        const test = {
            ...testDefault,
            articlesViewedSettings: {
                minViews: 1,
                periodInWeeks: 52,
            },
        };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });

    it('returns test if enough article views', async () => {
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

        const got = await selectBestTest(
            targeting,
            [test],
            userDeviceType,
            getMParticleProfile,
            [],
            now,
        );

        expect(got?.test).toBe(test);
    });

    it('should return null when the device type does not match', async () => {
        const test = { ...testDefault, deviceType: 'iOS' as const };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });

    it('should return null when the signed-in status does not match', async () => {
        const test = { ...testDefault, signedInStatus: 'SignedIn' as const };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });

    it('should exclude newsletter messages when the page has a newsletter signup', async () => {
        const targeting = { ...targetingDefault, hasNewsletterSignup: true };
        const test = { ...testDefault, variants: [newsletterVariant] };

        const got = await selectBestTest(targeting, [test], userDeviceType, getMParticleProfile);

        expect(got).toBeNull();
    });

    it('should select newsletter messages when the page has no newsletter signup', async () => {
        const test = { ...testDefault, variants: [newsletterVariant] };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toEqual({ test, variant: newsletterVariant });
    });

    it('should select puzzles messages when the page has a newsletter signup', async () => {
        const targeting = { ...targetingDefault, hasNewsletterSignup: true };

        const got = await selectBestTest(
            targeting,
            [testDefault],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toEqual({ test: testDefault, variant: variantDefault });
    });

    it('should select support messages when the page has a newsletter signup', async () => {
        const targeting = { ...targetingDefault, hasNewsletterSignup: true };
        const variant: Inline1Variant = {
            name: 'support',
            message: {
                type: 'Inline1SupportMessage',
                heading: 'Support the Guardian',
                body: 'Support independent journalism.',
                primaryCta: { baseUrl: 'https://support.theguardian.com', text: 'Support us' },
            },
        };
        const test = { ...testDefault, variants: [variant] };

        const got = await selectBestTest(targeting, [test], userDeviceType, getMParticleProfile);

        expect(got).toEqual({ test, variant });
    });

    it('should try the next test after excluding a newsletter message', async () => {
        const targeting = { ...targetingDefault, hasNewsletterSignup: true };
        const newsletterTest = { ...testDefault, variants: [newsletterVariant] };

        const got = await selectBestTest(
            targeting,
            [newsletterTest, testDefault],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toEqual({ test: testDefault, variant: variantDefault });
    });

    it('should return null when the page context does not match', async () => {
        const test: Inline1Test = {
            ...testDefault,
            contextTargeting: {
                tagIds: ['politics/politics'],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });

    it('should return null when the consent status does not match', async () => {
        const test = { ...testDefault, consentStatus: 'HasNotConsented' as const };

        const got = await selectBestTest(
            targetingDefault,
            [test],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });
});

describe('mParticle audience targeting', () => {
    const testWithoutAudience = { ...testDefault };
    const testWithAudience = { ...testDefault, mParticleAudience: 100 };

    it('returns test if no audience targeting is set on test', async () => {
        const got = await selectBestTest(
            targetingDefault,
            [testWithoutAudience],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got?.test).toBe(testWithoutAudience);
    });

    it('returns null if test has audience targeting but user profile is missing', async () => {
        const got = await selectBestTest(
            targetingDefault,
            [testWithAudience],
            userDeviceType,
            getMParticleProfile,
        );

        expect(got).toBeNull();
    });

    it('returns null if the targeted audience and the user profile do not match', async () => {
        const nonMatchingProfile = () =>
            Promise.resolve({
                audience_memberships: [{ audience_id: 700, audience_name: 'test_1' }],
            });

        const got = await selectBestTest(
            targetingDefault,
            [testWithAudience],
            userDeviceType,
            nonMatchingProfile,
        );

        expect(got).toBeNull();
    });

    it('returns test if the audience and the user profile match', async () => {
        const matchingProfile = () =>
            Promise.resolve({
                audience_memberships: [{ audience_id: 100, audience_name: 'test_2' }],
            });

        const got = await selectBestTest(
            targetingDefault,
            [testWithAudience],
            userDeviceType,
            matchingProfile,
        );

        expect(got?.test).toBe(testWithAudience);
    });
});
