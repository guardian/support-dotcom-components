import { header } from '@sdc/shared/config';
import { Edition, HeaderTargeting, HeaderTest, HeaderTestSelection } from '@sdc/shared/types';

const modulePathBuilder = header.endpointPathBuilder;

const nonSupportersTestNonUK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__NonUK',
    audience: 'AllNonSupporters',
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

const nonSupportersTestUS: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__US',
    audience: 'AllNonSupporters',
    variants: [
        {
            name: 'remote',
            modulePathBuilder,
            content: {
                heading: 'Support the Guardian',
                subheading: 'Make a year-end gift',
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
    audience: 'AllNonSupporters',
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
    audience: 'AllNonSupporters',
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

const supportersTestUS: HeaderTest = {
    name: 'header-supporter',
    audience: 'AllExistingSupporters',
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

const getNonSupportersTest = (edition: Edition): HeaderTest => {
    if (edition === 'UK') {
        return nonSupportersTestUK;
    }
    if (edition === 'US') {
        return nonSupportersTestUS;
    }
    return nonSupportersTestNonUK;
};

const getSupportersTest = (edition: Edition): HeaderTest => {
    if (edition === 'US') {
        return supportersTestUS;
    }
    return supportersTest;
};

export const selectHeaderTest = (
    targeting: HeaderTargeting,
): Promise<HeaderTestSelection | null> => {
    const select = (): HeaderTest => {
        if (targeting.showSupportMessaging) {
            return getNonSupportersTest(targeting.edition);
        } else {
            return getSupportersTest(targeting.edition);
        }
    };

    const test = select();
    const variant = test.variants[targeting.mvtId % test.variants.length];
    if (test && variant) {
        return Promise.resolve({
            test,
            variant,
            moduleName: header.name,
            modulePathBuilder: variant.modulePathBuilder,
        });
    }
    return Promise.resolve(null);
};
