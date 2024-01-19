import { brand, brandAlt, culture, neutral } from '@guardian/source-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const UkraineMomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: culture[800],
    },
    headerSettings: {
        showHeader: { text: true },
        textColour: brand[400],
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brand[400],
            textColour: 'white',
        },
        hover: {
            backgroundColour: brandAlt[200],
            textColour: brand[400],
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: culture[800],
            textColour: brand[400],
            border: '1px solid #052962',
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: brand[400],
            border: '1px solid #052962',
        },
        theme: 'brand',
    },
    closeButtonSettings: {
        default: {
            backgroundColour: culture[800],
            textColour: brand[400],
            border: `1px solid ${brand[400]}`,
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: brand[400],
        },
    },
    highlightedTextSettings: {
        textColour: neutral[0],
    },
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
        altText: 'Ukraine one year on',
    },
    bannerId: 'ukraine-moment-banner',
});

const unvalidated = bannerWrapper(UkraineMomentBanner, 'ukraine-moment-banner');
const validated = validatedBannerWrapper(UkraineMomentBanner, 'ukraine-moment-banner');

export { validated as UkraineMomentBanner, unvalidated as UkraineMomentBannerUnvalidated };
