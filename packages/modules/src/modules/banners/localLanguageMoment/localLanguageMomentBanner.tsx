//import React from 'react';
import { brand, brandAlt, neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
//import { HeaderVisual } from './components/headerVisual';

const LocalLanguageMomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: '#F1F8FC',
    },
    headerSettings: {
        textColour: '#052962',
        // image: <HeaderVisual />,
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: '#0077B6',
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
            backgroundColour: '#F1F8FC',
            textColour: '#004E7C',
            border: '1px solid #004E7C',
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: '#004E7C',
            border: '1px solid #004E7C',
        },
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
    // choiceCards: true,
    bannerId: 'local-language-moment-banner',
});

const validated = validatedBannerWrapper(LocalLanguageMomentBanner, 'local-language-moment-banner');
const unvalidated = bannerWrapper(LocalLanguageMomentBanner, 'local-language-moment-banner');

export {
    validated as LocalLanguageMomentBanner,
    unvalidated as LocalLanguageMomentBannerUnValidated,
};
