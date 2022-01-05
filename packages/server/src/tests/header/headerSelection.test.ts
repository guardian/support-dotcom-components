import { header } from '@sdc/shared/config';
import { HeaderTargeting, HeaderTest, HeaderTestSelection, HeaderVariant } from '@sdc/shared/types';
import { selectBestTest } from './headerSelection';

const modulePathBuilder = header.endpointPathBuilder;

const remote_nonUK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__NonUK',
    userCohort: 'AllNonSupporters',
    isOn: true,
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
                    url: 'https://support.theguardian.com/contribute',
                    text: 'Contribute',
                },
                secondaryCta: {
                    url: 'https://support.theguardian.com/subscribe',
                    text: 'Subscribe',
                },
            },
        },
    ],
};
const remote_UK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__UK',
    userCohort: 'AllNonSupporters',
    isOn: true,
    locations: ['GBPCountries'],
    variants: [
        {
            name: 'remote',
            modulePathBuilder,
            content: {
                heading: 'Support the Guardian',
                subheading: 'Available for everyone, funded by readers',
                primaryCta: {
                    url: 'https://support.theguardian.com/subscribe',
                    text: 'Subscribe',
                },
                secondaryCta: {
                    url: 'https://support.theguardian.com/contribute',
                    text: 'Contribute',
                },
            },
        },
    ],
};
const header_supporter: HeaderTest = {
    name: 'header-supporter',
    userCohort: 'AllExistingSupporters',
    isOn: true,
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

// Local testing - to make sure the selectBestTest algorithm isn't relying on the order in which header test objects are presented to it, to select the test we expect it to select for each of the Jest tests below, vary the order of header test objects in the mockTests array before running `yarn test`
const mockTests: HeaderTest[] = [remote_nonUK, remote_UK, header_supporter];
// const mockTests: HeaderTest[] = [remote_nonUK, header_supporter, remote_UK];
// const mockTests: HeaderTest[] = [remote_UK, remote_nonUK, header_supporter];
// const mockTests: HeaderTest[] = [remote_UK, header_supporter, remote_nonUK];
// const mockTests: HeaderTest[] = [header_supporter, remote_nonUK, remote_UK];
// const mockTests: HeaderTest[] = [header_supporter, remote_UK, remote_nonUK];

describe('selectBestTest', () => {
    it('It should return a non-UK non-supporter header test', () => {
        // Mock targeting data: not a supporter, not in UK
        const mockTargetingObject_1: HeaderTargeting = {
            showSupportMessaging: true,
            edition: 'UK',
            countryCode: 'ck', // Cook Islands (New Zealand dollar region)
            modulesVersion: 'v3',
            mvtId: 900263,
        };

        const result_1: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_1,
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
        expect(result_1).toHaveProperty('moduleName');
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
            edition: 'UK',
            countryCode: 'ck',
            modulesVersion: 'v3',
            mvtId: 900263,
        };

        const result_2: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_2,
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
        expect(result_2).toHaveProperty('moduleName');
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
            edition: 'UK',
            countryCode: 'im', // Isle of Man (UK sterling region)
            modulesVersion: 'v3',
            mvtId: 900263,
        };

        const result_3: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_3,
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
        expect(result_3).toHaveProperty('moduleName');
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
            edition: 'UK',
            countryCode: 'im',
            modulesVersion: 'v3',
            mvtId: 900263,
        };

        const result_4: HeaderTestSelection | null = selectBestTest(
            mockTargetingObject_4,
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
        expect(result_4).toHaveProperty('moduleName');
        expect(result_4).toHaveProperty('modulePathBuilder');
        expect(result_4_test).toHaveProperty('name');
        expect(result_4_test.name).toBe('header-supporter');
        expect(result_4_variant).toHaveProperty('name');
        expect(result_4_variant.name).toBe('control');
    });
});
