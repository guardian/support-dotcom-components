import React from 'react';
import { brand, brandAlt, culture, neutral } from '@guardian/source/foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { HeaderImage } from './components/headerImage';

const EuropeMomentLocalLanguageBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: '#F1F8FC',
    },
    headerSettings: {
        showHeader: { text: true, image: true },
        textColour: '#052962',
        image: <HeaderImage />,
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
            backgroundColour: '#E5E5E5',
            textColour: brand[400],
        },
        theme: 'brand',
    },
    highlightedTextSettings: {
        textColour: neutral[0],
        highlightColour: brandAlt[400],
    },
    choiceCards: true,
    choiceCardSettings: {
        buttonColour: neutral[100],
    },
    bannerId: 'europe-moment-local-language-banner',
});

const unvalidated = bannerWrapper(
    EuropeMomentLocalLanguageBanner,
    'europe-moment-local-language-banner',
);
const validated = validatedBannerWrapper(
    EuropeMomentLocalLanguageBanner,
    'europe-moment-local-language-banner',
);

export {
    validated as EuropeMomentLocalLanguageBanner,
    unvalidated as EuropeMomentLocalLanguageBannerUnValidated,
};
