import { HeaderTargeting, HeaderTest, HeaderTestSelection } from '../../types/HeaderTypes';
import { header } from '../../modules';

const modulePathBuilder = header.endpointPathBuilder;

const nonSupportersTest: HeaderTest = {
    name: 'RemoteRRHeaderLinksTest',
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

export const selectHeaderTest = (
    targeting: HeaderTargeting,
): Promise<HeaderTestSelection | null> => {
    const test = targeting.showSupportMessaging ? nonSupportersTest : supportersTest;
    const variant = test.variants[targeting.mvtId % test.variants.length];
    if (test && variant) {
        return Promise.resolve({
            test,
            variant,
            moduleName: header.name,
            moduleUrl: variant.modulePathBuilder(targeting.modulesVersion),
        });
    }
    return Promise.resolve(null);
};
