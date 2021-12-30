import { HeaderTargeting, HeaderTest, HeaderTestSelection, HeaderVariant } from '@sdc/shared/types';
import { selectBestTest } from './headerSelection';

describe('selectBestTest', () => {
    it('should return an object including a HeaderTest and a HeaderVariant', () => {
        interface NullReturn {
            name: string;
        }

        const testHasReturnedNull: NullReturn = {
            name: 'test returned is null',
        };

        const variantHasReturnedNull: NullReturn = {
            name: 'variant returned is null',
        };

        // Not a supporter, not in UK
        const mockTargetingObject_1: HeaderTargeting = {
            showSupportMessaging: true,
            edition: 'UK',
            countryCode: 'ck', // Cook Islands (New Zealand dollar region)
            modulesVersion: 'v3',
            mvtId: 900263,
        };

        const result_1: HeaderTestSelection | null = selectBestTest(mockTargetingObject_1, []);
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

        // Is a supporter, not in UK
        const mockTargetingObject_2: HeaderTargeting = {
            showSupportMessaging: false,
            edition: 'UK',
            countryCode: 'ck',
            modulesVersion: 'v3',
            mvtId: 900263,
        };

        const result_2: HeaderTestSelection | null = selectBestTest(mockTargetingObject_2, []);
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

        // Not a supporter, is in UK
        const mockTargetingObject_3: HeaderTargeting = {
            showSupportMessaging: true,
            edition: 'UK',
            countryCode: 'im', // Isle of Man (UK sterling region)
            modulesVersion: 'v3',
            mvtId: 900263,
        };

        const result_3: HeaderTestSelection | null = selectBestTest(mockTargetingObject_3, []);
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

        // Is a supporter, is in UK
        const mockTargetingObject_4: HeaderTargeting = {
            showSupportMessaging: false,
            edition: 'UK',
            countryCode: 'im',
            modulesVersion: 'v3',
            mvtId: 900263,
        };

        const result_4: HeaderTestSelection | null = selectBestTest(mockTargetingObject_4, []);
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
