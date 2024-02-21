import { header } from '@sdc/shared/config';
import { HeaderTargeting, HeaderTest, HeaderTestSelection, HeaderVariant } from '@sdc/shared/types';
import { selectBestTest } from './headerSelection';

const modulePathBuilder = header.endpointPathBuilder;

const remote_nonUK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__NonUK',
    priority: 1,
    userCohort: 'AllNonSupporters',
    status: 'Live',
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    variants: [
        {
            name: 'remote',
            modulePathBuilder,
            content: {
                heading: 'Support the Guardian',
                subheading: 'Available for everyone, funded by readers',
                primaryCta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Contribute',
                },
                secondaryCta: {
                    baseUrl: 'https://support.theguardian.com/subscribe',
                    text: 'Subscribe',
                },
            },
        },
    ],
};
const remote_UK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__UK',
    priority: 1,
    userCohort: 'AllNonSupporters',
    status: 'Live',
    locations: ['GBPCountries'],
    variants: [
        {
            name: 'remote',
            modulePathBuilder,
            content: {
                heading: 'Support the Guardian',
                subheading: 'Available for everyone, funded by readers',
                primaryCta: {
                    baseUrl: 'https://support.theguardian.com/subscribe',
                    text: 'Subscribe',
                },
                secondaryCta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Contribute',
                },
            },
        },
    ],
};
const locationsNotSet: HeaderTest = {
    name: 'LocationsArrayEmpty',
    priority: 1,
    userCohort: 'AllNonSupporters',
    status: 'Live',
    locations: [],
    variants: [
        {
            name: 'remote',
            modulePathBuilder,
            content: {
                heading: 'Support the Guardian',
                subheading: 'Available for everyone, funded by readers',
                primaryCta: {
                    baseUrl: 'https://support.theguardian.com/subscribe',
                    text: 'Subscribe',
                },
                secondaryCta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Contribute',
                },
            },
        },
    ],
};
const header_supporter: HeaderTest = {
    name: 'header-supporter',
    priority: 1,
    userCohort: 'AllExistingSupporters',
    status: 'Live',
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'GBPCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    variants: [
        {
            name: 'control',
            modulePathBuilder,
            content: {
                heading: 'Thank you',
                subheading: 'Your support powers our independent journalism',
            },
        },
    ],
};

const header_new_supporter: HeaderTest = {
    name: 'header-new-supporter',
    priority: 1,
    userCohort: 'Everyone',
    status: 'Live',
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'GBPCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    purchaseInfo: {
        product: ['Contribution'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            name: 'control',
            modulePathBuilder,
            content: {
                heading: 'Thank you for your support',
                subheading: 'Enjoy the Guardian',
            },
        },
    ],
};

const header_existing_subscriber: HeaderTest = {
    name: 'header-existing-subscriber',
    priority: 1,
    userCohort: 'Everyone',
    status: 'Live',
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'GBPCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    purchaseInfo: {
        product: ['SupporterPlus'],
        userType: ['current'],
    },
    variants: [
        {
            name: 'control',
            modulePathBuilder,
            content: {
                heading: 'Thank you for your support',
                subheading: 'Enjoy the Guardian',
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

const mockTests: HeaderTest[] = [
    remote_nonUK,
    header_supporter,
    remote_UK,
    locationsNotSet,
    header_new_supporter,
    header_existing_subscriber,
];
const mockTestEmptyLocations: HeaderTest[] = [
    remote_nonUK,
    locationsNotSet,
    header_supporter,
    remote_UK,
];

const userDeviceType = 'Desktop';

describe('selectBestTest', () => {
    it('It should return a non-UK non-supporter header test', () => {
        // Mock targeting data: not a supporter, not in UK
        const mockTargetingObject_1: HeaderTargeting = {
            showSupportMessaging: true,
            countryCode: 'ck', // Cook Islands (New Zealand dollar region)
            modulesVersion: 'v3',
            mvtId: 900263,
            isSignedIn: true,
        };

        const result_1: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_1,
            userDeviceType,
            mockTests,
        );
        const result_1_test: HeaderTest | NullReturn = result_1
            ? result_1.test
            : testHasReturnedNull;
        const result_1_variant: HeaderVariant | NullReturn = result_1
            ? result_1.variant
            : variantHasReturnedNull;
        expect(result_1).toBeDefined();
        expect(result_1).toHaveProperty('test');
        expect(result_1).toHaveProperty('variant');
        expect(result_1).toHaveProperty('modulePathBuilder');
        expect(result_1_test).toHaveProperty('name');
        expect(result_1_test.name).toBe('RemoteRrHeaderLinksTest__NonUK');
        expect(result_1_variant).toHaveProperty('name');
        expect(result_1_variant.name).toBe('remote');
    });
    it('It should return a non-UK supporter header test', () => {
        // Mock targeting data: is a supporter, not in UK
        const mockTargetingObject_2: HeaderTargeting = {
            showSupportMessaging: false,
            countryCode: 'ck',
            modulesVersion: 'v3',
            mvtId: 900263,
            isSignedIn: true,
        };

        const result_2: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_2,
            userDeviceType,
            mockTests,
        );
        const result_2_test: HeaderTest | NullReturn = result_2
            ? result_2.test
            : testHasReturnedNull;
        const result_2_variant: HeaderVariant | NullReturn = result_2
            ? result_2.variant
            : variantHasReturnedNull;
        expect(result_2).toBeDefined();
        expect(result_2).toHaveProperty('test');
        expect(result_2).toHaveProperty('variant');
        expect(result_2).toHaveProperty('modulePathBuilder');
        expect(result_2_test).toHaveProperty('name');
        expect(result_2_test.name).toBe('header-supporter');
        expect(result_2_variant).toHaveProperty('name');
        expect(result_2_variant.name).toBe('control');
    });
    it('It should return a UK-based non-supporter header test', () => {
        // Mock targeting data: not a supporter, is in UK
        const mockTargetingObject_3: HeaderTargeting = {
            showSupportMessaging: true,
            countryCode: 'im', // Isle of Man (UK sterling region)
            modulesVersion: 'v3',
            mvtId: 900263,
            isSignedIn: true,
        };

        const result_3: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_3,
            userDeviceType,
            mockTests,
        );
        const result_3_test: HeaderTest | NullReturn = result_3
            ? result_3.test
            : testHasReturnedNull;
        const result_3_variant: HeaderVariant | NullReturn = result_3
            ? result_3.variant
            : variantHasReturnedNull;
        expect(result_3).toBeDefined();
        expect(result_3).toHaveProperty('test');
        expect(result_3).toHaveProperty('variant');
        expect(result_3).toHaveProperty('modulePathBuilder');
        expect(result_3_test).toHaveProperty('name');
        expect(result_3_test.name).toBe('RemoteRrHeaderLinksTest__UK');
        expect(result_3_variant).toHaveProperty('name');
        expect(result_3_variant.name).toBe('remote');
    });
    it('It should return a UK-based supporter header test', () => {
        // Mock targeting data: is a supporter, is in UK
        const mockTargetingObject_4: HeaderTargeting = {
            showSupportMessaging: false,
            countryCode: 'im',
            modulesVersion: 'v3',
            mvtId: 900263,
            isSignedIn: true,
        };

        const result_4: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_4,
            userDeviceType,
            mockTests,
        );
        const result_4_test: HeaderTest | NullReturn = result_4
            ? result_4.test
            : testHasReturnedNull;
        const result_4_variant: HeaderVariant | NullReturn = result_4
            ? result_4.variant
            : variantHasReturnedNull;
        expect(result_4).toBeDefined();
        expect(result_4).toHaveProperty('test');
        expect(result_4).toHaveProperty('variant');
        expect(result_4).toHaveProperty('modulePathBuilder');
        expect(result_4_test).toHaveProperty('name');
        expect(result_4_test.name).toBe('header-supporter');
        expect(result_4_variant).toHaveProperty('name');
        expect(result_4_variant.name).toBe('control');
    });

    it('All non-supporters should return a global locations test if encountered before a test that includes their region', () => {
        // Mock targeting data: not a supporter, is in UK
        const mockTargetingObject_5: HeaderTargeting = {
            showSupportMessaging: true,
            countryCode: 'im', // Isle of Man (UK sterling region)
            modulesVersion: 'v3',
            mvtId: 900263,
            isSignedIn: true,
        };

        const result_5: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_5,
            userDeviceType,
            mockTestEmptyLocations,
        );
        const result_5_test: HeaderTest | NullReturn = result_5
            ? result_5.test
            : testHasReturnedNull;
        const result_5_variant: HeaderVariant | NullReturn = result_5
            ? result_5.variant
            : variantHasReturnedNull;
        expect(result_5).toBeDefined();
        expect(result_5).toHaveProperty('test');
        expect(result_5).toHaveProperty('variant');
        expect(result_5).toHaveProperty('modulePathBuilder');
        expect(result_5_test).toHaveProperty('name');
        expect(result_5_test.name).toBe('LocationsArrayEmpty');
        expect(result_5_variant).toHaveProperty('name');
        expect(result_5_variant.name).toBe('remote');
    });

    it('It should return a test matching a contribution from a new user', () => {
        // Mock targeting data: recent supporter, new user
        const mockTargetingObject_6: HeaderTargeting = {
            showSupportMessaging: false,
            countryCode: 'im',
            modulesVersion: 'v3',
            mvtId: 900263,
            purchaseInfo: {
                product: 'Contribution',
                userType: 'new',
            },
            isSignedIn: false,
        };

        const result_6 = selectBestTest(mockTargetingObject_6, userDeviceType, mockTests);
        const result_6_test: HeaderTest | NullReturn = result_6
            ? result_6.test
            : testHasReturnedNull;
        const result_6_variant: HeaderVariant | NullReturn = result_6
            ? result_6.variant
            : variantHasReturnedNull;
        expect(result_6).toBeDefined();
        expect(result_6).toHaveProperty('test');
        expect(result_6).toHaveProperty('variant');
        expect(result_6).toHaveProperty('modulePathBuilder');
        expect(result_6_test).toHaveProperty('name');
        expect(result_6_test.name).toBe('header-new-supporter');
        expect(result_6_variant).toHaveProperty('name');
        expect(result_6_variant.name).toBe('control');
    });

    it('It should return a test matching a subscription from an existing user', () => {
        // Mock targeting data: recent supporter, existing user
        const mockTargetingObject_7: HeaderTargeting = {
            showSupportMessaging: false,
            countryCode: 'im',
            modulesVersion: 'v3',
            mvtId: 900263,
            purchaseInfo: {
                product: 'SupporterPlus',
                userType: 'current',
            },
            isSignedIn: false,
        };

        const result_7 = selectBestTest(mockTargetingObject_7, userDeviceType, mockTests);
        const result_7_test: HeaderTest | NullReturn = result_7
            ? result_7.test
            : testHasReturnedNull;
        const result_7_variant: HeaderVariant | NullReturn = result_7
            ? result_7.variant
            : variantHasReturnedNull;
        expect(result_7).toBeDefined();
        expect(result_7).toHaveProperty('test');
        expect(result_7).toHaveProperty('variant');
        expect(result_7).toHaveProperty('modulePathBuilder');
        expect(result_7_test).toHaveProperty('name');
        expect(result_7_test.name).toBe('header-existing-subscriber');
        expect(result_7_variant).toHaveProperty('name');
        expect(result_7_variant.name).toBe('control');
    });

    it('It should ignore purchase information if user is signed in', () => {
        // Mock targeting data: recent supporter, new user, now signed in
        const mockTargetingObject_8: HeaderTargeting = {
            showSupportMessaging: false,
            countryCode: 'im',
            modulesVersion: 'v3',
            mvtId: 900263,
            purchaseInfo: {
                product: 'Contribution',
                userType: 'new',
            },
            isSignedIn: true,
        };

        const result_8 = selectBestTest(mockTargetingObject_8, userDeviceType, mockTests);
        const result_8_test: HeaderTest | NullReturn = result_8
            ? result_8.test
            : testHasReturnedNull;
        const result_8_variant: HeaderVariant | NullReturn = result_8
            ? result_8.variant
            : variantHasReturnedNull;
        expect(result_8).toBeDefined();
        expect(result_8).toHaveProperty('test');
        expect(result_8).toHaveProperty('variant');
        expect(result_8).toHaveProperty('modulePathBuilder');
        expect(result_8_test).toHaveProperty('name');
        expect(result_8_test.name).toBe('header-supporter');
        expect(result_8_variant).toHaveProperty('name');
        expect(result_8_variant.name).toBe('control');
    });
});
