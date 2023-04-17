import { brand, brandAlt, neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const AusBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: neutral[93],
    },
    headerSettings: {
        textColour: brand[400],
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brandAlt[400],
            textColour: 'black',
        },
        hover: {
            backgroundColour: brandAlt[400],
            textColour: 'black',
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: 'transparent',
            textColour: 'black',
        },
        hover: {
            backgroundColour: 'transparent',
            textColour: 'black',
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: '#F1F8FC',
            textColour: brand[400],
            border: `1px solid ${brand[400]}`,
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: brand[400],
        },
        theme: 'brand',
    },
    highlightedTextSettings: {
        textColour: neutral[0],
        highlightColour: neutral[100],
    },
    imageSettings: {
        mainUrl:
            'https://media.guim.co.uk/25970fa37adbda03502302f36d351014b0679ed8/0_0_279_193/279.png',
        mobileUrl:
            'https://media.guim.co.uk/25970fa37adbda03502302f36d351014b0679ed8/0_0_279_193/279.png',
        tabletUrl:
            'https://media.guim.co.uk/25970fa37adbda03502302f36d351014b0679ed8/0_0_279_193/279.png',
        desktopUrl:
            'https://media.guim.co.uk/e7bc725ca9b4b21f4ac63ef9c015010318b6dcea/0_0_401_281/401.png',
        wideUrl:
            'https://media.guim.co.uk/b395f62f7001cb76d68b0d74ed31465129b77ef4/0_0_506_375/506.png',
        altText: 'Guardian logo being held up by supporters of the Guardian',
    },
    tickerStylingSettings: {
        textColour: '#052962',
        filledProgressColour: '#052962',
        progressBarBackgroundColour: '#fff',
        goalMarkerColour: 'black',
    },
    bannerId: 'aus-moment-banner',
});

const unvalidated = bannerWrapper(AusBanner, 'aus-moment-banner');
const validated = validatedBannerWrapper(AusBanner, 'aus-moment-banner');

export {
    validated as Aus10yrAnniversaryMomentBanner,
    unvalidated as Aus10yrAnniversaryMomentBannerUnvalidated,
};
