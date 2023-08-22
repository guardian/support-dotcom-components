import React from 'react';
import { brand, brandAlt, culture, neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { HeaderImage } from './components/headerImage';

const LocalLanguageMomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: '#F1F8FC',
    },
    headerSettings: {
        textColour: '#052962',
        image: <HeaderImage />,
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brand[400],
            textColour: 'white',
        },
        hover: {
            backgroundColour: brandAlt[200],
            textColour: brand[400],
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
            backgroundColour: culture[800],
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
    },
    choiceCards: true,
    bannerId: 'local-language-moment-banner',
});

const unvalidated = bannerWrapper(LocalLanguageMomentBanner, 'local-language-moment-banner');
const validated = validatedBannerWrapper(LocalLanguageMomentBanner, 'local-language-moment-banner');

export {
    validated as LocalLanguageMomentBanner,
    unvalidated as LocalLanguageMomentBannerUnValidated,
};
