import { brand, culture } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const ChoiceCardsButtonsMomentBanner = getMomentTemplateBanner({
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
            backgroundColour: '#F1F8FC',
            textColour: brand[400],
            border: `1px solid ${brand[400]}`,
        },
        hover: {
            backgroundColour: '#F1F8FC',
            textColour: brand[400],
        },
        theme: 'brand',
    },
    highlightedTextSettings: {
        textColour: 'white',
        highlightColour: '#721765',
    },
    choiceCards: true,
    bannerId: 'supporter-moment-banner',
});

const unvalidated = bannerWrapper(ChoiceCardsButtonsMomentBanner, 'supporter-moment-banner');
const validated = validatedBannerWrapper(ChoiceCardsButtonsMomentBanner, 'supporter-moment-banner');

export {
    validated as ChoiceCardsButtonsMomentBanner,
    unvalidated as ChoiceCardsButtonsMomentBannerUnValidated,
};
