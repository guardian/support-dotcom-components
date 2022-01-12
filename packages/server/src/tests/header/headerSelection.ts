import { header } from '@sdc/shared/config';
import { Edition, HeaderTargeting, HeaderTest, HeaderTestSelection } from '@sdc/shared/types';

const modulePathBuilder = header.endpointPathBuilder;

const nonSupportersTestNonUK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__NonUK',
    userCohort: 'AllNonSupporters',
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

const nonSupportersTestUS = (): HeaderTest => {
    const nyeStart = new Date('2021-12-31T00:00:00');
    const nyeEnd = new Date('2022-01-02T00:00:00');
    const now = new Date();

    const shouldShowSubscribeButton = now < nyeStart || now > nyeEnd;

    return {
        name: 'RemoteRrHeaderLinksTest__US',
        userCohort: 'AllNonSupporters',
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
                    secondaryCta: shouldShowSubscribeButton
                        ? {
                              url: 'https://support.theguardian.com/subscribe',
                              text: 'Subscribe',
                          }
                        : undefined,
                },
            },
        ],
    };
};

const nonSupportersTestUK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__UK',
    userCohort: 'AllNonSupporters',
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
    userCohort: 'AllNonSupporters',
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
    } else if (edition === 'US') {
        return nonSupportersTestUS();
    }
    return nonSupportersTestNonUK;
};

export const selectHeaderTest = (
    targeting: HeaderTargeting,
): Promise<HeaderTestSelection | null> => {
    const select = (): HeaderTest => {
        if (targeting.showSupportMessaging) {
            return getNonSupportersTest(targeting.edition);
        } else {
            return supportersTest;
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