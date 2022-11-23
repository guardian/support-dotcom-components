import { neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const UsEoyGivingTuesMomentBanner = getMomentTemplateBanner({
    backgroundColour: '#e2e1e0',
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
        mobile: {
            backgroundColour: 'transparent',
            textColour: neutral[100],
            border: `1px solid ${neutral[100]}`,
        },
        desktop: {
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
            'https://i.guim.co.uk/img/media/06e22c77193c7d5bc3229c4819b103ade4306579/0_0_1400_1400/500.png?quality=85&s=23b7ac6db68c9f8a373cf43f23d77a22',
        mobileUrl:
            'https://i.guim.co.uk/img/media/56e7d6bae1e012c12105c639862829489ef366dd/0_0_751_271/751.jpg?quality=85&s=91549fd65e116f9240c6c14a9eb94bd0',
        altText: 'The World On Fire',
    },
    bannerId: 'us-eoy-giving-tues-banner',
});

const unvalidated = bannerWrapper(UsEoyGivingTuesMomentBanner, 'us-eoy-giving-tues-banner');
const validated = validatedBannerWrapper(UsEoyGivingTuesMomentBanner, 'us-eoy-giving-tues-banner');

export { validated as UsEoyMomentBanner, unvalidated as UsEoyMomentBannerUnvalidated };
