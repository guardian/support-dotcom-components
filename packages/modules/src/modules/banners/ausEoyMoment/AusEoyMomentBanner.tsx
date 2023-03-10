import { neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const AusEoyMomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: '#DCDCDC',
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: neutral[7],
            textColour: 'white',
        },
        hover: {
            backgroundColour: neutral[20],
            textColour: 'white',
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: neutral[86],
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: neutral[100],
            textColour: neutral[7],
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: 'transparent',
            textColour: neutral[7],
            border: `1px solid ${neutral[7]}`,
        },
        hover: {
            backgroundColour: 'white',
            textColour: neutral[0],
        },
    },
    highlightedTextSettings: {
        textColour: neutral[0],
        highlightColour: neutral[100],
    },
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/83caba4bb9889827f34d2f1e7c2c4d7749d40474/0_0_336_136/336.png?quality=85&s=4ed39dc708e969e7dec9cb0197c8d410',
        mobileUrl:
            'https://i.guim.co.uk/img/media/83caba4bb9889827f34d2f1e7c2c4d7749d40474/0_0_336_136/336.png?quality=85&s=4ed39dc708e969e7dec9cb0197c8d410',
        tabletUrl:
            'https://i.guim.co.uk/img/media/c2f8d48210542c26d85a026481f518d1a90cf3af/0_0_1012_764/500.png?quality=85&s=b9118479c1ca7f4dcda0e2d0df8b1f39',
        desktopUrl:
            'https://i.guim.co.uk/img/media/f173ccaae6ee9647af256829189578c461808ab4/0_0_1344_920/500.png?quality=85&s=3b4244ce3f02f2413c856c2d07394ac8',
        leftColUrl:
            'https://i.guim.co.uk/img/media/4fd5eec5077978103a1ab382c2d908c038dcf7c1/0_0_1620_1144/1000.png?quality=85&s=9033535bc32e07e1ac888927879e9a22',
        wideUrl:
            'https://i.guim.co.uk/img/media/4fd5eec5077978103a1ab382c2d908c038dcf7c1/0_0_1620_1144/1000.png?quality=85&s=9033535bc32e07e1ac888927879e9a22',
        altText: 'Guardian Australia End Of Year 2022 Moment Banner',
    },
    tickerStylingSettings: {
        textColour: '#AB0613',
        filledProgressColour: '#AB0613',
        progressBarBackgroundColour: '#fff',
        goalMarkerColour: '#AB0613',
    },
    bannerId: 'aus-eoy-banner',
});

const unvalidated = bannerWrapper(AusEoyMomentBanner, 'aus-eoy-banner');
const validated = validatedBannerWrapper(AusEoyMomentBanner, 'aus-eoy-banner');

export { validated as AusEoyMomentBanner, unvalidated as AusEoyMomentBannerUnvalidated };
