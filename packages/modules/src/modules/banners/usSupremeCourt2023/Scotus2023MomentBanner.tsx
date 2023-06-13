import { brand, neutral, specialReport } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const Scotus2023MomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: specialReport[100],
        textColor: neutral[100],
    },
    headerSettings: {
        textColour: neutral[100],
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brand[500],
            textColour: neutral[100],
        },
        hover: {
            backgroundColour: neutral[100],
            textColour: brand[500],
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: specialReport[100],
            textColour: neutral[100],
            border: `1px solid ${neutral[100]}`,
        },
        hover: {
            backgroundColour: neutral[100],
            textColour: specialReport[100],
            border: `1px solid ${specialReport[100]}`,
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: neutral[100],
            textColour: specialReport[100],
            border: `1px solid ${specialReport[100]}`,
        },
        hover: {
            backgroundColour: specialReport[100],
            textColour: neutral[100],
            border: `1px solid ${neutral[100]}`,
        },
        guardianRoundel: 'inverse',
    },
    highlightedTextSettings: {
        textColour: specialReport[100],
        highlightColour: neutral[100],
    },
    articleCountTextColour: neutral[100],
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/5f55f84fbb107ad1539659d8caec5eeab7398dbc/0_0_1500_608/500.png?width=500&quality=75&s=2173abfa5e53fb64660c6596a887e9ac',
        mobileUrl:
            'https://i.guim.co.uk/img/media/5f55f84fbb107ad1539659d8caec5eeab7398dbc/0_0_1500_608/500.png?width=500&quality=75&s=2173abfa5e53fb64660c6596a887e9ac',
        tabletUrl:
            'https://i.guim.co.uk/img/media/4f2ec5867b1a111b78927547f2fdceb0066695f9/0_0_1024_920/500.png?width=500&quality=75&s=ef15b7ff812d997251a68b59a1b4279c',
        desktopUrl:
            'https://i.guim.co.uk/img/media/8d9128c93a61155e0b84f0eb229edd57951ee3ff/0_0_1280_1168/500.png?width=500&quality=75&s=0d8ff342ffc3005186903969b22a4674',
        leftColUrl:
            'https://i.guim.co.uk/img/media/359d8cde335895144b85a52ce0fe6b93fa8e1514/0_0_882_584/882.png?width=882&height=584&quality=75&s=da90ac1806631a1cb7f3903af88b5819',
        wideUrl:
            'https://i.guim.co.uk/img/media/359d8cde335895144b85a52ce0fe6b93fa8e1514/0_0_882_584/882.png?width=882&height=584&quality=75&s=da90ac1806631a1cb7f3903af88b5819',
        altText: 'APPROPRIATE ALT TEXT HERE',
    },
    bannerId: 'scotus-2023-moment-banner',
});

const unvalidated = bannerWrapper(Scotus2023MomentBanner, 'scotus-2023-moment-banner');
const validated = validatedBannerWrapper(Scotus2023MomentBanner, 'scotus-2023-moment-banner');

export { validated as Scotus2023MomentBanner, unvalidated as Scotus2023MomentBannerUnvalidated };
