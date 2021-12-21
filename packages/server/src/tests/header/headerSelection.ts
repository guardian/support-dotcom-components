/* 
- Currently hard-code HeaderTest objects in this file
- This will be replaced by HeaderTest data supplied from RRCP JSON
- We'll import/receive all available tests

- Thus only need one hard-coded default HeaderTest (probably nonUK non-supporters)
- Should return default only if something goes wrong
- Currently returning Promise(null) in the event of any errors - why??

- We will cascade through HeaderTest data to select the most appropriate HeaderTest to return
- Selection based on values supplied in a HeaderTargeting object
- Within the selected HeaderTest will be 1+ variants (control + others)
- We need to randomly select a variant if an AB test is running 
- Banner does this with selectVariant, TestVariant, selectTargetingTest, userIsInTest???

- Banner also has functionality to switch to 'supported' messages for recent 1-off contribs??
- Assuming we should include that feature for headers too????

- Where does caching sit in all of this?
*/ 

import { header } from '@sdc/shared/config';
import { countryCodeToCountryGroupId } from '@sdc/shared/lib';
import { HeaderTargeting, HeaderTest, HeaderTestSelection } from '@sdc/shared/types';


import { fetchConfiguredHeaderTestsCached } from './headerTests'

const modulePathBuilder = header.endpointPathBuilder;

// --- hardcoded tests
const nonSupportersTestNonUK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__NonUK',
    userCohort: 'AllNonSupporters',
    isOn: true,
    locations: ['AUDCountries','Canada','EURCountries','NZDCountries','UnitedStates','International'],
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
    locations: ['AUDCountries','Canada','EURCountries','GBPCountries','NZDCountries','UnitedStates','International'],
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

const existingSupportersAndEveryone = ['Everyone', 'AllExistingSupporters'];

const selectBestTest = (targeting: HeaderTargeting, allTests: HeaderTest[]): HeaderTestSelection => {

    console.log('SELECT BEST TEST');
    console.log('TARGETING');
    console.log(targeting);
    console.log('ALLTESTS');
    console.log(allTests);

    // If there is a need to return other specific hardcoded tests/variants, include required logic to identify, and required return, here

    // In case the allTests array is empty, return a hardcoded test/variant
    if (!allTests.length) return selectHardcodedTest(targeting);

    // Cascade through allTests to match supplied targeting data to the first test that meets requirements - if no test meets requirements, return an appropriate hardcoded test/variant
    let selectedTest, selectedVariant;

    const { showSupportMessaging, countryCode } = targeting;

    const countryGroupId = countryCodeToCountryGroupId(countryCode.toUpperCase());

    for (let i = 0, iz = allTests.length; i < iz; i++) {

        const test = allTests[i];

        const { isOn, userCohort, locations } = test;

        if (isOn) {

            if (showSupportMessaging && existingSupportersAndEveryone.indexOf(userCohort) >= 0) {

                if (locations.indexOf(countryGroupId) >= 0) {

                    selectedTest = test;
                    break;
                }
            }
            else {

                if (locations.indexOf(countryGroupId) >= 0) {

                    selectedTest = test;
                    break;
                }
            }
        }
    }
    // Failed to find a matching test, or the matching test has an empty variants Array
    if (!selectedTest || !selectedTest.variants.length) return selectHardcodedTest(targeting);

    // Identify the required variant
    selectedVariant = selectedTest.variants[0];

    // Return the selected test and variant
    selectedVariant.modulePathBuilder = modulePathBuilder;

    return {
        test: selectedTest,
        variant: selectedVariant,
        moduleName: header.name,
        modulePathBuilder,
    }
};

const selectHardcodedTest = (targeting: HeaderTargeting): HeaderTestSelection => {

    console.log('SELECT HARDCODED TEST');
    console.log('TARGETING');
    console.log(targeting);

    // Currently we have 3 hardcoded test/variants in this file
    let selectedTest, selectedVariant;

    const { showSupportMessaging, countryCode } = targeting;

    const countryGroupId = countryCodeToCountryGroupId(countryCode.toUpperCase());

    if (showSupportMessaging) {
        selectedTest = supportersTest,
        selectedVariant = supportersTest.variants[0];
    }
    else {
        if ('GBPCountries' === countryGroupId) {
            selectedTest = nonSupportersTestUK,
            selectedVariant = nonSupportersTestUK.variants[0];
        }
        else {
            selectedTest = nonSupportersTestNonUK,
            selectedVariant = nonSupportersTestNonUK.variants[0];
        }
    }

    return {
        test: selectedTest,
        variant: selectedVariant,
        moduleName: header.name,
        modulePathBuilder,
    }
};

export const selectHeaderTest = (
    targeting: HeaderTargeting,
): Promise<HeaderTestSelection | null> => {

    return fetchConfiguredHeaderTestsCached()
    .then((allTests: HeaderTest[]) => selectBestTest(targeting, allTests))
    .catch(() => selectHardcodedTest(targeting));
};
