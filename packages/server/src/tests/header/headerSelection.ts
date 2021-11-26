import { header, usEOYHeader } from '@sdc/shared/config';
import { Edition, HeaderTargeting, HeaderTest, HeaderTestSelection } from '@sdc/shared/types';
import { isAfter, isBefore } from 'date-fns';

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

const nonSupportersTestUS = (): HeaderTest => {
    const givingTuesdayStart = new Date('2021-11-29T17:00:00'); //remove "Subscribe" Monday 12:00 PM EST
    const givingTuesdayEnd = new Date('2021-11-01T09:00:00'); //re-add "Subscribe" on Wednesday morning GMT
    const currentDateTime = new Date();
    const shouldShowSubscribeButton = !(
        currentDateTime >= givingTuesdayStart && currentDateTime <= givingTuesdayEnd
    );

    return {
        name: 'RemoteRrHeaderLinksTest__USEOY',
        audience: 'AllNonSupporters',
        variants: [
            {
                name: 'remote',
                modulePathBuilder: usEOYHeader.endpointPathBuilder,
                content: {
                    heading: 'Support the Guardian',
                    subheading: 'Make a year-end gift',
                    primaryCta: {
                        url: 'https://support.theguardian.com/contribute',
                        text: 'Contribute',
                    },
                    ...(shouldShowSubscribeButton && {
                        secondaryCta: {
                            url: 'https://support.theguardian.com/subscribe',
                            text: 'Subscribe',
                        },
                    }),
                },
                mobileContent: {
                    heading: '',
                    subheading: '',
                    primaryCta: {
                        url: 'https://support.theguardian.com/contribute',
                        text: 'Make a year-end gift',
                    },
                },
            },
        ],
    };
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
    name: 'header-supporter__USEOY',
    audience: 'AllExistingSupporters',
    variants: [
        {
            name: 'control',
            modulePathBuilder: usEOYHeader.endpointPathBuilder,
            content: {
                heading: 'Thank you for supporting us',
                subheading: '',
                primaryCta: {
                    url:
                        'https://support.theguardian.com/us/contribute?selected-contribution-type=ONE_OFF',
                    text: 'Make an extra contribution',
                },
            },
            mobileContent: {
                heading: 'Thank you',
                subheading: '',
                primaryCta: {
                    url:
                        'https://support.theguardian.com/us/contribute?selected-contribution-type=ONE_OFF',
                    text: 'Contribute again',
                },
            },
        },
    ],
};

const usEoyPeriodStart = new Date(2021, 10, 22);
const usEoyPeriodEnd = new Date(2022, 1, 1);

const isInUsEoyPeriod = (date: Date): boolean => {
    return isAfter(date, usEoyPeriodStart) && isBefore(date, usEoyPeriodEnd);
};

const hasNotContributedDuringUsEoyPeriod = (lastOneOffContributionDate?: string): boolean => {
    if (!lastOneOffContributionDate) {
        return true;
    }

    return isBefore(new Date(Date.parse(lastOneOffContributionDate)), usEoyPeriodStart);
};

const getNonSupportersTest = (edition: Edition): HeaderTest => {
    if (edition === 'UK') {
        return nonSupportersTestUK;
    }
    if (edition === 'US' && isInUsEoyPeriod(new Date())) {
        return nonSupportersTestUS();
    }
    return nonSupportersTestNonUK;
};

const getSupportersTest = (edition: Edition, lastOneOffContributionDate?: string): HeaderTest => {
    if (
        edition === 'US' &&
        isInUsEoyPeriod(new Date()) &&
        hasNotContributedDuringUsEoyPeriod(lastOneOffContributionDate)
    ) {
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
            return getSupportersTest(targeting.edition, targeting.lastOneOffContributionDate);
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
