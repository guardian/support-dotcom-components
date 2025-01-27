import {
    GutterTargeting,
    GutterTest,
    GutterTestSelection,
    GutterVariant,
} from '../../../shared/types';
import { selectBestTest } from './gutterSelection';

// TODO: plan some appropriate Gutter tests in the same vein.

const remote_nonUK: GutterTest = {
    channel: 'Gutter',
    name: 'RemoteRrGutterTest__NonUK',
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

const remote_UK: GutterTest = {
    channel: 'Gutter',
    name: 'RemoteRrGutterTest__UK',
    priority: 1,
    userCohort: 'AllNonSupporters',
    status: 'Live',
    locations: ['GBPCountries'],
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

const locationsNotSet: GutterTest = {
    channel: 'Gutter',
    name: 'LocationsArrayEmpty',
    priority: 1,
    userCohort: 'AllNonSupporters',
    status: 'Live',
    locations: [],
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

const gutter_supporter: GutterTest = {
    channel: 'Gutter',
    name: 'gutter-supporter',
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

const mockTests: GutterTest[] = [remote_nonUK, gutter_supporter, remote_UK, locationsNotSet];
const mockTestEmptyLocations: GutterTest[] = [
    remote_nonUK,
    locationsNotSet,
    gutter_supporter,
    remote_UK,
];

const userDeviceType = 'Desktop';

describe('selectBestTest', () => {
    it('It should return a non-UK non-supporter gutter test', () => {
        // Mock targeting data: not a supporter, not in UK - DONE
        const mockTargetingObject_1: GutterTargeting = {
            showSupportMessaging: true,
            countryCode: 'ck', // Cook Islands (New Zealand dollar region)
            mvtId: 900263,
            isSignedIn: true,
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
        expect(result_1_test.name).toBe('RemoteRrGutterTest__NonUK');
        expect(result_1_variant).toHaveProperty('name');
        expect(result_1_variant.name).toBe('remote');
    });

    it('It should return a non-UK supporter gutter test', () => {
        // Mock targeting data: is a supporter, not in UK - DONE
        const mockTargetingObject_2: GutterTargeting = {
            showSupportMessaging: false,
            countryCode: 'ck',
            mvtId: 900263,
            isSignedIn: true,
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
        expect(result_2_variant.name).toBe('control');
    });

    it('It should return a UK-based non-supporter gutter test', () => {
        // Mock targeting data: not a supporter, is in UK - DONE
        const mockTargetingObject_3: GutterTargeting = {
            showSupportMessaging: true,
            countryCode: 'im', // Isle of Man (UK sterling region)
            mvtId: 900263,
            isSignedIn: true,
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
        expect(result_3_test.name).toBe('RemoteRrGutterTest__UK');
        expect(result_3_variant).toHaveProperty('name');
        expect(result_3_variant.name).toBe('remote');
    });

    it('It should return a UK-based supporter gutter test', () => {
        // Mock targeting data: is a supporter, is in UK
        const mockTargetingObject_4: GutterTargeting = {
            showSupportMessaging: false,
            countryCode: 'im',
            mvtId: 900263,
            isSignedIn: true,
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
        expect(result_4_variant.name).toBe('control');
    });

    it('All non-supporters should return a global locations test if encountered before a test that includes their region', () => {
        // Mock targeting data: not a supporter, is in UK - DONE
        const mockTargetingObject_5: GutterTargeting = {
            showSupportMessaging: true,
            countryCode: 'im', // Isle of Man (UK sterling region)
            mvtId: 900263,
            isSignedIn: true,
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
});
