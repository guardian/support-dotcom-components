import { neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getAuBrandMomentBanner } from './components/getAuBrandMomentBanner';

const AuBrandMomentBanner = getAuBrandMomentBanner({
    backgroundColour: '#fffDf5',
    primaryCtaSettings: {
        default: {
            backgroundColour: '#121212',
            textColour: 'white',
        },
        hover: {
            backgroundColour: '#454545',
            textColour: 'white',
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: '#fffDf5',
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: '#e4e4e3',
            textColour: neutral[7],
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: '#fffDf5',
            textColour: neutral[0],
            border: `1px solid ${neutral[0]}`,
        },
        hover: {
            backgroundColour: 'white',
            textColour: neutral[0],
        },
    },
    highlightedTextSettings: {
        textColour: neutral[0],
        highlightColour: '',
    },
    imageSettings: {
        mobileUrl:
            'https://i.guim.co.uk/img/media/e3ff643b6549e9f306041f91bb49600fcba9aab6/0_0_375_140/375.png?quality=85&s=50b88f05106981fcbeac98c20533ca4b',
        tabletUrl:
            'https://i.guim.co.uk/img/media/90c9ba0e7293af6361c9257a61be00b106f834be/0_0_270_393/270.png?quality=85&s=17ba9e3027a7a827c281b39ce06cc995',
        desktopUrl:
            'https://i.guim.co.uk/img/media/6a65e1e8ef1e0538218ae1cfed50ed5c2b03424b/0_0_420_355/420.png?quality=85&s=08cf6a1a51c17b1c5c41e8c95758bf8b',
        leftColUrl:
            'https://i.guim.co.uk/img/media/6a65e1e8ef1e0538218ae1cfed50ed5c2b03424b/0_0_420_355/420.png?quality=85&s=08cf6a1a51c17b1c5c41e8c95758bf8b',
        wideUrl:
            'https://i.guim.co.uk/img/media/cdd2fab4bc241a6733d349b925f323d6ea0a7073/0_0_600_355/600.png?quality=85&s=96f738cefcb45a56083bbc3293e13e85',
        mainUrl:
            'https://i.guim.co.uk/img/media/6a65e1e8ef1e0538218ae1cfed50ed5c2b03424b/0_0_420_355/420.png?quality=85&s=08cf6a1a51c17b1c5c41e8c95758bf8b',
        altText:
            "Women's rights protestor outside Parliament House, Canberra. Woman holding sign that reads 'Justice for Women'.",
    },
});

const unvalidated = bannerWrapper(AuBrandMomentBanner, 'au-brand-moment-banner');
const validated = validatedBannerWrapper(AuBrandMomentBanner, 'au-brand-moment-banner');

export { validated as AuBrandMomentBanner, unvalidated as AuBrandMomentBannerUnvalidated };
