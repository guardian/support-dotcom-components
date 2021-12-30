import { header } from '@sdc/shared/config';
import { countryCodeToCountryGroupId } from '@sdc/shared/lib';
import { HeaderTargeting, HeaderTest, HeaderTestSelection, HeaderVariant } from '@sdc/shared/types';

import { selectVariant } from '../../lib/ab';

import { fetchConfiguredHeaderTestsCached } from './headerTests';

const modulePathBuilder = header.endpointPathBuilder;

// --- hardcoded tests - we export these so the Jest test can test something
export const nonSupportersTestNonUK: HeaderTest = {
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

export const nonSupportersTestUK: HeaderTest = {
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

export const supportersTest: HeaderTest = {
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

const isNotReportedAsSupporter = ['AllNonSupporters'];

// Again, exported for Jest testing
export const selectBestTest = (
    targeting: HeaderTargeting,
    allTests: HeaderTest[],
): HeaderTestSelection | null => {
    allTests.push(supportersTest, nonSupportersTestUK, nonSupportersTestNonUK);

    const { showSupportMessaging, countryCode } = targeting;

    const countryGroupId = countryCodeToCountryGroupId(countryCode.toUpperCase());

    const selectedTest: HeaderTest | undefined = allTests.find(test => {
        const { isOn, userCohort, locations } = test;

        if (!isOn) {
            return false;
        }

        if (showSupportMessaging && !isNotReportedAsSupporter.includes(userCohort)) {
            return false;
        }

        if (!locations.includes(countryGroupId)) {
            return false;
        }

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

export const selectHeaderTest = (
    targeting: HeaderTargeting,
): Promise<HeaderTestSelection | null> => {
    return fetchConfiguredHeaderTestsCached()
        .then((allTests: HeaderTest[]) => selectBestTest(targeting, allTests))
        .catch(() => null);
};
