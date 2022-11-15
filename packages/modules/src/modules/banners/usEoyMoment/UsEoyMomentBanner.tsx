import { neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const UsEoyMomentBanner = getMomentTemplateBanner({
    backgroundColour: neutral[86],
    primaryCtaSettings: {
        default: {
            backgroundColour: neutral[7],
            textColour: 'white',
        },
        hover: {
            backgroundColour: neutral[46],
            textColour: 'white',
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: neutral[86],
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: neutral[93],
            textColour: neutral[7],
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: neutral[86],
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
            'https://media.guim.co.uk/d3728208e0cb25be3c494a43557e275784fe4d23/0_0_781_701/781.jpg',
        mobileUrl:
            'https://media.guim.co.uk/91d7d524e0fe2bcb0408d44206a49b88bddc343c/0_0_751_271/751.jpg',
        altText: 'The United States Capitol Building',
    },
});

const unvalidated = bannerWrapper(UsEoyMomentBanner, 'us-eoy-banner');
const validated = validatedBannerWrapper(UsEoyMomentBanner, 'us-eoy-banner');

export { validated as UsEoyMomentBanner, unvalidated as UsEoyMomentBannerUnvalidated };
