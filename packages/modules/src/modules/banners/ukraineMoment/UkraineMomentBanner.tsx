import { brand, brandAlt, neutral, opinion } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const UkraineMomentBanner = getMomentTemplateBanner({
    backgroundColour: opinion[800],
    headerSettings: {
        textColour: brand[400],
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brand[400],
            textColour: 'white',
        },
        hover: {
            backgroundColour: '#004E7C',
            textColour: 'white',
            border: '1px solid #004E7C',
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: '#FEF9F5',
            textColour: brand[400],
            border: '1px solid #052962',
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: brand[400],
            border: '1px solid #052962',
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: opinion[800],
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
        highlightColour: brandAlt[400],
    },
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
        mobileUrl:
            'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
        tabletUrl:
            'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
        desktopUrl:
            'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
        leftColUrl:
            'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
        altText: 'Ukraine one year on',
    },
    bannerId: 'ukraine-moment-banner',
});

const unvalidated = bannerWrapper(UkraineMomentBanner, 'ukraine-moment-banner');
const validated = validatedBannerWrapper(UkraineMomentBanner, 'ukraine-moment-banner');

export { validated as UkraineMomentBanner, unvalidated as UkraineMomentBannerUnvalidated };
