import { neutral, brand, culture } from '@guardian/source-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const SupporterMomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: '#FDF1F8',
    },
    headerSettings: {
        showHeader: { text: true },
        textColour: '#721765',
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: '#721765',
            textColour: 'white',
        },
        hover: {
            backgroundColour: '#55114C',
            textColour: 'white',
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
            backgroundColour: '#FDF1F8',
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
        textColour: 'white',
        highlightColour: '#721765',
    },
    choiceCards: true,
    choiceCardSettings: {
        buttonColour: neutral[100],
    },
    bannerId: 'supporter-moment-banner',
});

const unvalidated = bannerWrapper(SupporterMomentBanner, 'supporter-moment-banner');
const validated = validatedBannerWrapper(SupporterMomentBanner, 'supporter-moment-banner');

export { validated as SupporterMomentBanner, unvalidated as SupporterMomentBannerUnValidated };
