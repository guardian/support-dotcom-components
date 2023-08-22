import React from 'react';
import { brand, culture, neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { GuardianLogoWithHandsVisual } from './components/GuardianLogoWithHandsVisual';

const GuardianLogoWithHands3DBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: '#005689',
    },
    headerSettings: {
        textColour: 'white',
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brand[400],
            textColour: 'white',
            border: `1px solid ${brand[400]}`,
        },
        hover: {
            backgroundColour: '#149bc7',
            textColour: 'white',
            border: `1px solid #149bc7`,
        },
    },
    secondaryCtaSettings: {
        default: {
            border: `1px solid white`,
            backgroundColour: 'transparent',
            textColour: 'white',
        },
        hover: {
            backgroundColour: '#149bc7',
            textColour: 'white',
            border: `1px solid #149bc7`,
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: culture[800],
            textColour: '#149bc7',
            border: `1px solid ${'#149bc7'}`,
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: '#149bc7',
        },
    },
    highlightedTextSettings: {
        textColour: neutral[0],
    },
    alternativeVisual: <GuardianLogoWithHandsVisual />,
    bannerId: 'guardian-logo-with-hands-3d',
    articleCountTextColour: 'white',
});

const unvalidated = bannerWrapper(GuardianLogoWithHands3DBanner, 'aus-anniversary-banner');
const validated = validatedBannerWrapper(GuardianLogoWithHands3DBanner, 'aus-anniversary-banner');

export {
    validated as GuardianLogoWithHands3DBanner,
    unvalidated as GuardianLogoWithHands3DBannerUnvalidated,
};
