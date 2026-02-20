import type {
    GutterTargeting,
    GutterTest,
    GutterTestSelection,
    GutterVariant,
} from '../../../shared/types';
import { selectBestTest } from './gutterSelection';

const non_supporter_non_gbp: GutterTest = {
    channel: 'GutterLiveblog',
    name: 'NonSupporter__NonUK',
    priority: 0,
    userCohort: 'AllNonSupporters',
    status: 'Live',
    contextTargeting: {
        tagIds: [],
        sectionIds: [],
        excludedSectionIds: [],
        excludedTagIds: [],
    },
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    regionTargeting: {
        targetedCountryGroups: [
            'AUDCountries',
            'Canada',
            'EURCountries',
            'NZDCountries',
            'UnitedStates',
            'International',
        ],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'non-supporter_non-uk',
            moduleName: 'Gutter',
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

const remote_low_priority_nonUK: GutterTest = {
    channel: 'GutterLiveblog',
    name: 'NonSupporter__NonUK_lower_priority',
    priority: 1, // shouldn't appear
    userCohort: 'AllNonSupporters',
    status: 'Live',
    contextTargeting: {
        tagIds: [],
        sectionIds: [],
        excludedSectionIds: [],
        excludedTagIds: [],
    },
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    regionTargeting: {
        targetedCountryGroups: [
            'AUDCountries',
            'Canada',
            'EURCountries',
            'NZDCountries',
            'UnitedStates',
            'International',
        ],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'non-supporter_non-uk_low-priority',
            moduleName: 'Gutter',
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

const non_supporter_gbp: GutterTest = {
    channel: 'GutterLiveblog',
    name: 'nonSupporter__UK',
    priority: 2,
    userCohort: 'AllNonSupporters',
    status: 'Live',
    contextTargeting: {
        tagIds: [],
        sectionIds: [],
        excludedSectionIds: [],
        excludedTagIds: [],
    },
    locations: ['GBPCountries'],
    regionTargeting: {
        targetedCountryGroups: ['GBPCountries'],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'non-supporter-gbp',
            moduleName: 'Gutter',
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

const no_locations_set: GutterTest = {
    channel: 'GutterLiveblog',
    name: 'LocationsArrayEmpty',
    priority: 3,
    userCohort: 'AllNonSupporters',
    signedInStatus: 'All',
    status: 'Live',
    contextTargeting: {
        tagIds: [],
        sectionIds: [],
        excludedSectionIds: [],
        excludedTagIds: [],
    },
    locations: [],
    regionTargeting: {
        targetedCountryGroups: [],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'remote',
            moduleName: 'Gutter',
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

const tag_included: GutterTest = {
    channel: 'GutterLiveblog',
    name: 'included_tag',
    priority: 4,
    userCohort: 'Everyone',
    status: 'Live',
    signedInStatus: 'All',
    contextTargeting: {
        tagIds: ['politics/politics'],
        sectionIds: [],
        excludedTagIds: [],
        excludedSectionIds: [],
    },
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'GBPCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    regionTargeting: {
        targetedCountryGroups: [
            'AUDCountries',
            'Canada',
            'EURCountries',
            'GBPCountries',
            'NZDCountries',
            'UnitedStates',
            'International',
        ],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'included_tag',
            moduleName: 'Gutter',
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

const supporter_all: GutterTest = {
    channel: 'GutterLiveblog',
    name: 'gutter-supporter',
    priority: 5,
    userCohort: 'AllExistingSupporters',
    status: 'Live',
    contextTargeting: {
        tagIds: [],
        sectionIds: [],
        excludedSectionIds: [],
        excludedTagIds: [],
    },
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'GBPCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    regionTargeting: {
        targetedCountryGroups: [
            'AUDCountries',
            'Canada',
            'EURCountries',
            'GBPCountries',
            'NZDCountries',
            'UnitedStates',
            'International',
        ],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'supporter',
            moduleName: 'Gutter',
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

const tag_excluded: GutterTest = {
    channel: 'GutterLiveblog',
    name: 'excluded_tag',
    priority: 6,
    userCohort: 'AllExistingSupporters',
    status: 'Live',
    signedInStatus: 'SignedIn',
    contextTargeting: {
        tagIds: [],
        sectionIds: [],
        excludedSectionIds: [],
        excludedTagIds: ['sport'],
    },
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'GBPCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    regionTargeting: {
        targetedCountryGroups: [
            'AUDCountries',
            'Canada',
            'EURCountries',
            'GBPCountries',
            'NZDCountries',
            'UnitedStates',
            'International',
        ],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'excluded_tag',
            moduleName: 'Gutter',
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

const evergreen: GutterTest = {
    channel: 'GutterLiveblog',
    name: 'evergreen',
    priority: 7,
    userCohort: 'Everyone',
    status: 'Live',
    signedInStatus: 'All',
    contextTargeting: {
        tagIds: [],
        sectionIds: [],
        excludedTagIds: [],
        excludedSectionIds: [],
    },
    locations: [],
    regionTargeting: {
        targetedCountryGroups: [],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'evergreen_variant',
            moduleName: 'Gutter',
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

// Handle null returns - tests will still fail if presented with this but should give better indication of why test failed
interface NullReturn {
    name: string;
}

const testHasReturnedNull: NullReturn = {
    name: 'test returned is null',
};

const variantHasReturnedNull: NullReturn = {
    name: 'variant returned is null',
};

// NOTE: the order of the tests in these two arrays are important and mimic the order of tests in RRCP
const mockTests: GutterTest[] = [
    non_supporter_non_gbp,
    remote_low_priority_nonUK,
    non_supporter_gbp,
    no_locations_set,
    tag_included,
    supporter_all,
    tag_excluded,
].sort((a, b) => (a.priority > b.priority ? 1 : -1));

const mockTestEmptyLocations: GutterTest[] = [no_locations_set, non_supporter_gbp, evergreen];

const userDeviceType = 'Desktop';

describe('selectBestTest', () => {
    it('It should return a non-UK non-supporter gutter test', () => {
        // Mock targeting data: not a supporter, not in UK
        const mockTargetingObject_1: GutterTargeting = {
            showSupportMessaging: true,
            countryCode: 'ck', // Cook Islands (New Zealand dollar region)
            mvtId: 900263,
            isSignedIn: true,
            tagIds: [],
        };

        const result_1: GutterTestSelection | null = selectBestTest(
            mockTargetingObject_1,
            userDeviceType,
            mockTests,
        );
        const result_1_test: GutterTest | NullReturn = result_1
            ? result_1.test
            : testHasReturnedNull;
        const result_1_variant: GutterVariant | NullReturn = result_1
            ? result_1.variant
            : variantHasReturnedNull;
        expect(result_1).toBeDefined();
        expect(result_1).toHaveProperty('test');
        expect(result_1).toHaveProperty('variant');
        expect(result_1_test).toHaveProperty('name');
        expect(result_1_test.name).toBe('NonSupporter__NonUK');
        expect(result_1_variant).toHaveProperty('name');
        expect(result_1_variant.name).toBe('non-supporter_non-uk');
    });

    it('It should return a non-UK supporter gutter test', () => {
        // Mock targeting data: is a supporter, not in UK
        const mockTargetingObject_2: GutterTargeting = {
            showSupportMessaging: false,
            countryCode: 'ck',
            mvtId: 900263,
            isSignedIn: true,
            tagIds: [],
        };

        const result_2: GutterTestSelection | null = selectBestTest(
            mockTargetingObject_2,
            userDeviceType,
            mockTests,
        );
        const result_2_test: GutterTest | NullReturn = result_2
            ? result_2.test
            : testHasReturnedNull;
        const result_2_variant: GutterVariant | NullReturn = result_2
            ? result_2.variant
            : variantHasReturnedNull;
        expect(result_2).toBeDefined();
        expect(result_2).toHaveProperty('test');
        expect(result_2).toHaveProperty('variant');
        expect(result_2_test).toHaveProperty('name');
        expect(result_2_test.name).toBe('gutter-supporter');
        expect(result_2_variant).toHaveProperty('name');
        expect(result_2_variant.name).toBe('supporter');
    });

    it('It should return a UK-based non-supporter gutter test', () => {
        // Mock targeting data: not a supporter, is in UK
        const mockTargetingObject_3: GutterTargeting = {
            showSupportMessaging: true,
            countryCode: 'im', // Isle of Man (UK sterling region)
            mvtId: 900263,
            isSignedIn: true,
            tagIds: [],
        };

        const result_3: GutterTestSelection | null = selectBestTest(
            mockTargetingObject_3,
            userDeviceType,
            mockTests,
        );
        const result_3_test: GutterTest | NullReturn = result_3
            ? result_3.test
            : testHasReturnedNull;
        const result_3_variant: GutterVariant | NullReturn = result_3
            ? result_3.variant
            : variantHasReturnedNull;
        expect(result_3).toBeDefined();
        expect(result_3).toHaveProperty('test');
        expect(result_3).toHaveProperty('variant');
        expect(result_3_test).toHaveProperty('name');
        expect(result_3_test.name).toBe('nonSupporter__UK');
        expect(result_3_variant).toHaveProperty('name');
        expect(result_3_variant.name).toBe('non-supporter-gbp');
    });

    it('It should return a UK-based supporter gutter test', () => {
        // Mock targeting data: is a supporter, is in UK
        const mockTargetingObject_4: GutterTargeting = {
            showSupportMessaging: false,
            countryCode: 'us',
            mvtId: 900263,
            isSignedIn: true,
            tagIds: [],
        };

        const result_4: GutterTestSelection | null = selectBestTest(
            mockTargetingObject_4,
            userDeviceType,
            mockTests,
        );
        const result_4_test: GutterTest | NullReturn = result_4
            ? result_4.test
            : testHasReturnedNull;
        const result_4_variant: GutterVariant | NullReturn = result_4
            ? result_4.variant
            : variantHasReturnedNull;
        expect(result_4).toBeDefined();
        expect(result_4).toHaveProperty('test');
        expect(result_4).toHaveProperty('variant');
        expect(result_4_test).toHaveProperty('name');
        expect(result_4_test.name).toBe('gutter-supporter');
        expect(result_4_variant).toHaveProperty('name');
        expect(result_4_variant.name).toBe('supporter');
    });

    it('All non-supporters should return a global locations test if encountered before a test that includes their region', () => {
        // Mock targeting data: not a supporter, is in UK, LocationsArrayEmpty test set up in mockTestEmptyLocations before locale targeted test.
        const mockTargetingObject_5: GutterTargeting = {
            showSupportMessaging: true,
            countryCode: 'im', // Isle of Man (UK sterling region)
            mvtId: 900263,
            isSignedIn: true,
            tagIds: [],
        };

        const result_5: GutterTestSelection | null = selectBestTest(
            mockTargetingObject_5,
            userDeviceType,
            mockTestEmptyLocations,
        );
        const result_5_test: GutterTest | NullReturn = result_5
            ? result_5.test
            : testHasReturnedNull;
        const result_5_variant: GutterVariant | NullReturn = result_5
            ? result_5.variant
            : variantHasReturnedNull;
        expect(result_5).toBeDefined();
        expect(result_5).toHaveProperty('test');
        expect(result_5).toHaveProperty('variant');
        expect(result_5_test).toHaveProperty('name');
        expect(result_5_test.name).toBe('LocationsArrayEmpty');
        expect(result_5_variant).toHaveProperty('name');
        expect(result_5_variant.name).toBe('remote');
    });

    it('Page context with matching excluded tag should not return excluded_tag test', () => {
        // Mock targeting data: not a supporter, is in UK, has an excluded tag
        const mockTargetingObject_6: GutterTargeting = {
            showSupportMessaging: true,
            countryCode: 'im', // Isle of Man (UK sterling region)
            mvtId: 900263,
            isSignedIn: true,
            tagIds: ['sport'],
        };

        const result_6: GutterTestSelection | null = selectBestTest(
            mockTargetingObject_6,
            userDeviceType,
            mockTests,
        );
        const result_6_test: GutterTest | NullReturn = result_6
            ? result_6.test
            : testHasReturnedNull;
        const result_6_variant: GutterVariant | NullReturn = result_6
            ? result_6.variant
            : variantHasReturnedNull;
        expect(result_6).toBeDefined();
        expect(result_6).toHaveProperty('test');
        expect(result_6).toHaveProperty('variant');
        expect(result_6_test).toHaveProperty('name');
        expect(result_6_test.name).not.toBe('excluded_tag');
        expect(result_6_variant).toHaveProperty('name');
        expect(result_6_variant.name).not.toBe('excluded_tag');
    });

    it('Page context with matching tag should return included_tag test', () => {
        // Mock targeting data: is a supporter, is in EU
        const mockTargetingObject_7: GutterTargeting = {
            showSupportMessaging: false, // i.e., is a Supporter
            countryCode: 'fr', // france - EURCountries
            mvtId: 900263,
            isSignedIn: true,
            tagIds: ['politics/politics'],
        };

        const result_7: GutterTestSelection | null = selectBestTest(
            mockTargetingObject_7,
            userDeviceType,
            mockTests,
        );
        const result_7_test: GutterTest | NullReturn = result_7
            ? result_7.test
            : testHasReturnedNull;
        const result_7_variant: GutterVariant | NullReturn = result_7
            ? result_7.variant
            : variantHasReturnedNull;
        expect(result_7).toBeDefined();
        expect(result_7).toHaveProperty('test');
        expect(result_7).toHaveProperty('variant');
        expect(result_7_test).toHaveProperty('name');
        expect(result_7_test.name).toBe('included_tag');
        expect(result_7_variant).toHaveProperty('name');
        expect(result_7_variant.name).toBe('included_tag');
    });

    it('Backup evergreen test, variant if nothing else matches', () => {
        // A test that picks up an evergreen result
        const mockTargetingObject_8: GutterTargeting = {
            showSupportMessaging: false, // i.e., is a Supporter
            countryCode: 'fr', // france - EURCountries
            mvtId: 900263,
            isSignedIn: false,
            tagIds: [],
        };

        const result_8: GutterTestSelection | null = selectBestTest(
            mockTargetingObject_8,
            userDeviceType,
            mockTestEmptyLocations,
        );
        const result_8_test: GutterTest | NullReturn = result_8
            ? result_8.test
            : testHasReturnedNull;
        const result_8_variant: GutterVariant | NullReturn = result_8
            ? result_8.variant
            : variantHasReturnedNull;
        expect(result_8).toBeDefined();
        expect(result_8).toHaveProperty('test');
        expect(result_8).toHaveProperty('variant');
        expect(result_8_test).toHaveProperty('name');
        expect(result_8_test.name).toBe('evergreen');
        expect(result_8_variant).toHaveProperty('name');
        expect(result_8_variant.name).toBe('evergreen_variant');
    });
});

describe('holdback group targeting', () => {
    const baseTargeting: GutterTargeting = {
        showSupportMessaging: true,
        countryCode: 'GB',
        mvtId: 123456,
        isSignedIn: false,
        tagIds: [],
    };

    const baseTest: GutterTest = {
        channel: 'GutterLiveblog',
        name: 'test',
        priority: 1,
        userCohort: 'Everyone',
        status: 'Live',
        locations: [],
        regionTargeting: {
            targetedCountryGroups: [],
            targetedCountryCodes: [],
        },
        contextTargeting: {
            tagIds: [],
            sectionIds: [],
            excludedTagIds: [],
            excludedSectionIds: [],
        },
        variants: [
            {
                name: 'control',
                moduleName: 'Gutter',
                content: {
                    image: {
                        mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                        altText: 'Not for Sale',
                    },
                    bodyCopy: ['Support us'],
                    cta: {
                        baseUrl: 'https://support.theguardian.com/contribute',
                        text: 'Support us',
                    },
                },
            },
        ],
    };

    it('returns null if user is not in holdback group and test is a HOLDBACK test', () => {
        const holdbackTest: GutterTest = {
            ...baseTest,
            name: 'gutter-HOLDBACK-v1',
        };

        const result = selectBestTest({ ...baseTargeting, inHoldbackGroup: false }, userDeviceType, [
            holdbackTest,
        ]);

        expect(result).toBeNull();
    });

    it('returns test if user is in holdback group and test is a HOLDBACK test', () => {
        const holdbackTest: GutterTest = {
            ...baseTest,
            name: 'gutter-HOLDBACK-v1',
        };

        const result = selectBestTest({ ...baseTargeting, inHoldbackGroup: true }, userDeviceType, [
            holdbackTest,
        ]);

        expect(result?.test.name).toBe('gutter-HOLDBACK-v1');
    });

    it('returns null if user is in holdback group and test is NOT a HOLDBACK test', () => {
        const normalTest: GutterTest = {
            ...baseTest,
            name: 'normal-gutter-test',
        };

        const result = selectBestTest({ ...baseTargeting, inHoldbackGroup: true }, userDeviceType, [
            normalTest,
        ]);

        expect(result).toBeNull();
    });

    it('returns test if user is not in holdback group and test is NOT a HOLDBACK test', () => {
        const normalTest: GutterTest = {
            ...baseTest,
            name: 'normal-gutter-test',
        };

        const result = selectBestTest({ ...baseTargeting, inHoldbackGroup: false }, userDeviceType, [
            normalTest,
        ]);

        expect(result?.test.name).toBe('normal-gutter-test');
    });

    it('returns test if user has undefined inHoldbackGroup and test is NOT a HOLDBACK test', () => {
        const normalTest: GutterTest = {
            ...baseTest,
            name: 'normal-gutter-test',
        };

        const result = selectBestTest({ ...baseTargeting, inHoldbackGroup: undefined }, userDeviceType, [
            normalTest,
        ]);

        expect(result?.test.name).toBe('normal-gutter-test');
    });

    it('returns null if user has undefined inHoldbackGroup and test is a HOLDBACK test', () => {
        const holdbackTest: GutterTest = {
            ...baseTest,
            name: 'gutter-HOLDBACK-v1',
        };

        const result = selectBestTest({ ...baseTargeting, inHoldbackGroup: undefined }, userDeviceType, [
            holdbackTest,
        ]);

        expect(result).toBeNull();
    });
});
