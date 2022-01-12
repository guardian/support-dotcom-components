import { header } from '@sdc/shared/config';
import { inCountryGroups } from '@sdc/shared/lib';
import { HeaderTargeting, HeaderTest, HeaderTestSelection, HeaderVariant } from '@sdc/shared/types';

import { selectVariant } from '../../lib/ab';
import { audienceMatches } from '../../lib/targeting';
// import { audienceMatches, userIsInTest } from '../../lib/targeting';

import { fetchConfiguredHeaderTestsCached } from './headerTests';

const modulePathBuilder = header.endpointPathBuilder;

// --- hardcoded tests
const nonSupportersTestNonUK: HeaderTest = {
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

const nonSupportersTestUK: HeaderTest = {
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

const supportersTest: HeaderTest = {
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

const hardcodedTests = [supportersTest, nonSupportersTestUK, nonSupportersTestNonUK];

// Exported for Jest testing
export const selectBestTest = (
    targeting: HeaderTargeting,
    allTests: HeaderTest[],
): HeaderTestSelection | null => {
    const { showSupportMessaging, countryCode } = targeting;

    const selectedTest: HeaderTest | undefined = allTests.find(test => {
        const { isOn, userCohort, locations } = test;

        if (!isOn) {
            return false;
        }

        if (!audienceMatches(showSupportMessaging, userCohort)) {
            return false;
        }

        const testCountryCode = countryCode != null ? countryCode.toUpperCase() : '';
        if (!inCountryGroups(testCountryCode, locations)) {
            return false;
        }

        // Need an extra test here to check if user is in AB variant? - userIsInTest()

        return true;
    });

    // Failed to find a matching test, or the matching test has an empty variants Array
    if (!selectedTest || !selectedTest.variants.length) {
        return null;
    }

    const selectedVariant: HeaderVariant = selectVariant(selectedTest, targeting.mvtId);

    selectedVariant.modulePathBuilder = modulePathBuilder;

    return {
        test: selectedTest,
        variant: selectedVariant,
        moduleName: header.name,
        modulePathBuilder,
    };
};

async function doHeaderTestsFetch(targeting: HeaderTargeting) {
    const configuredTests = await fetchConfiguredHeaderTestsCached().catch(() => []);
    return selectBestTest(targeting, [...configuredTests, ...hardcodedTests]);
}

export const selectHeaderTest = (targeting: HeaderTargeting): Promise<HeaderTestSelection | null> =>
    doHeaderTestsFetch(targeting);
