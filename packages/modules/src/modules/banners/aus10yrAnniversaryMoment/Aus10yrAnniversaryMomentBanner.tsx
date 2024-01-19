import { brand, brandAlt, neutral } from '@guardian/source-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const AusAnniversaryMomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: neutral[93],
    },
    headerSettings: {
        showHeader: { text: true },
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
            backgroundColour: neutral[93],
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
        highlightColour: brandAlt[400],
    },
    imageSettings: {
        mainUrl:
            'https://media.guim.co.uk/2922aee59bd3d36f920e1849137e92bfa212bd4d/0_0_540_308/540.png',
        altText: 'Guardian logo being held up by supporters of the Guardian',
    },
    tickerStylingSettings: {
        textColour: '#052962',
        filledProgressColour: '#052962',
        progressBarBackgroundColour: '#fff',
        goalMarkerColour: 'black',
    },
    bannerId: 'aus-anniversary-moment-banner',
});

const unvalidated = bannerWrapper(AusAnniversaryMomentBanner, 'aus-anniversary-moment-banner');
const validated = validatedBannerWrapper(
    AusAnniversaryMomentBanner,
    'aus-anniversary-moment-banner',
);

export {
    validated as AusAnniversaryMomentBanner,
    unvalidated as AusAnniversaryMomentBannerUnvalidated,
};
