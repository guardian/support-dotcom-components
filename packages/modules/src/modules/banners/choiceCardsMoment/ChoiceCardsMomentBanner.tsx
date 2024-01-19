import { neutral, brand, brandAlt, culture } from '@guardian/source-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const ChoiceCardsMomentTemplateBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: '#F1F8FC',
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
            backgroundColour: brandAlt[200],
            textColour: 'black',
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: culture[800],
            textColour: brand[400],
            border: `1px solid ${brand[400]}`,
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: brand[400],
            border: `1px solid ${brand[400]}`,
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
            backgroundColour: '#E5E5E5',
            textColour: brand[400],
        },
        theme: 'brand',
    },
    highlightedTextSettings: {
        textColour: 'black',
        highlightColour: brandAlt[400],
    },
    choiceCards: true,
    choiceCardSettings: {
        buttonColour: neutral[100],
    },
    bannerId: 'choice-cards-moment-banner',
});

const ChoiceCardsMomentBannerUnValidated = bannerWrapper(
    ChoiceCardsMomentTemplateBanner,
    'choice-cards-moment-banner',
);
const ChoiceCardsMomentBanner = validatedBannerWrapper(
    ChoiceCardsMomentTemplateBanner,
    'choice-cards-moment-banner',
);

export { ChoiceCardsMomentBanner, ChoiceCardsMomentBannerUnValidated };
