import React from 'react';
import { neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { EnvironmentMomentBannerEarth } from '../environmentMoment/components/EnvironmentMomentBannerEarth';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const UsEoyGivingTuesBanner = getMomentTemplateBanner({
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
        hover: {
            backgroundColour: 'white',
            textColour: neutral[0],
        },
    },
    highlightedTextSettings: {
        textColour: neutral[0],
        highlightColour: neutral[100],
    },
    alternativeVisual: <EnvironmentMomentBannerEarth />,
    bannerId: 'us-eoy-giving-tues-banner',
});

const unvalidated = bannerWrapper(UsEoyGivingTuesBanner, 'us-eoy-giving-tues-banner');
const validated = validatedBannerWrapper(UsEoyGivingTuesBanner, 'us-eoy-giving-tues-banner');

export { validated as UsEoyMomentBanner, unvalidated as UsEoyMomentBannerUnvalidated };
