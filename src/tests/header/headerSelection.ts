import { HeaderTargeting, HeaderTest, HeaderTestSelection } from '../../types/HeaderTypes';
import {
    ausMomentHeaderNonSupporter,
    ausMomentHeaderSupporter,
    header,
    headerSupportAgain,
} from '../../modules';

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

const supportAgainTest: HeaderTest = {
    name: 'header-support-again',
    audience: 'AllNonSupporters',
    variants: [
        {
            name: 'control',
            modulePathBuilder: headerSupportAgain.endpointPathBuilder,
            content: {
                heading: 'Thank you',
                subheading: 'Your support powers our independent journalism',
                primaryCta: {
                    text: 'Support us again',
                    url:
                        'https://support.theguardian.com/contribute?selected-contribution-type=ONE_OFF',
                },
            },
        },
    ],
};

const monthDiff = (from: Date, to: Date): number => {
    return 12 * (to.getFullYear() - from.getFullYear()) + (to.getMonth() - from.getMonth());
};

const isLastOneOffContributionWithinLast2To13Months = (
    lastOneOffContributionDate?: string,
): boolean => {
    if (lastOneOffContributionDate === undefined) {
        return false;
    }

    const now = new Date();
    const date = new Date(lastOneOffContributionDate);

    const monthsSinceLastContribution = monthDiff(date, now);

    return monthsSinceLastContribution >= 2 && monthsSinceLastContribution <= 13;
};

const getNonSupportersTest = (edition: string): HeaderTest =>
    edition === 'UK' ? nonSupportersTestUK : nonSupportersTestNonUK;

const isAusMoment = (countryCode: string): boolean => countryCode === 'AU' && isAusMomentLive();

const isAusMomentLive = () => Date.now() >= Date.parse('2021-07-19');

export const selectHeaderTest = (
    targeting: HeaderTargeting,
): Promise<HeaderTestSelection | null> => {
    const select = (): HeaderTest => {
        if (isAusMoment(targeting.countryCode)) {
            if (
                isLastOneOffContributionWithinLast2To13Months(targeting.lastOneOffContributionDate)
            ) {
                return ausMomentOneOffContributor;
            } else if (!targeting.showSupportMessaging) {
                return ausMomentRecurringSupporter;
            } else {
                return ausMomentNonSupporter;
            }
        }
        if (isLastOneOffContributionWithinLast2To13Months(targeting.lastOneOffContributionDate)) {
            return supportAgainTest;
        } else if (targeting.showSupportMessaging) {
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

const ausMomentRecurringSupporter: HeaderTest = {
    name: 'aus-moment-supporter',
    audience: 'AllExistingSupporters',
    variants: [
        {
            name: 'control',
            modulePathBuilder: ausMomentHeaderSupporter.endpointPathBuilder,
            content: {
                heading: 'Thank you',
                subheading: '',
                primaryCta: {
                    text: 'Make an extra contribution',
                    url: 'https://support.theguardian.com/contribute',
                },
            },
        },
    ],
};

const ausMomentOneOffContributor: HeaderTest = {
    name: 'aus-moment-supporter',
    audience: 'AllExistingSupporters',
    variants: [
        {
            name: 'control',
            modulePathBuilder: ausMomentHeaderSupporter.endpointPathBuilder,
            content: {
                heading: 'Thank you',
                subheading: '',
                primaryCta: {
                    text: 'Support us again',
                    url: 'https://support.theguardian.com/contribute',
                },
            },
        },
    ],
};

const ausMomentNonSupporter: HeaderTest = {
    name: 'aus-moment-nonsupporter',
    audience: 'AllNonSupporters',
    variants: [
        {
            name: 'control',
            modulePathBuilder: ausMomentHeaderNonSupporter.endpointPathBuilder,
            content: {
                heading: 'Support the Guardian',
                subheading: '',
                primaryCta: {
                    text: 'Contribute',
                    url: 'https://support.theguardian.com/contribute',
                },
                secondaryCta: {
                    text: 'Subscribe',
                    url: 'https://support.theguardian.com/subscribe',
                },
            },
        },
    ],
};
