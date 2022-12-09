import React from 'react';
import { neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { UsEoyMomentBannerVisualV3 } from './UsEoyMomentBannerVisualV3';

const UsEoyMomentBannerV3 = getMomentTemplateBanner({
    backgroundColour: '#EDEDED',
    headerSettings: {
        textColour: '#7D0068',
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: '#7D0068',
            textColour: 'white',
        },
        hover: {
            backgroundColour: '#932881',
            textColour: 'white',
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: neutral[86],
            textColour: neutral[7],
            border: `1px solid ${neutral[7]}`,
        },
        hover: {
            backgroundColour: 'white',
            textColour: neutral[0],
        },
    },
    alternativeVisual: <UsEoyMomentBannerVisualV3 />,
    tickerStylingSettings: {
        textColour: '#7D0068',
        filledProgressColour: '#7D0068',
        progressBarBackgroundColour: '#fff',
        goalMarkerColour: '#000',
    },
    bannerId: 'us-eoy-v3-banner',
});

const unvalidated = bannerWrapper(UsEoyMomentBannerV3, 'us-eoy-v3-banner');
const validated = validatedBannerWrapper(UsEoyMomentBannerV3, 'us-eoy-v3-banner');

export { validated as UsEoyMomentBannerV3, unvalidated as UsEoyMomentBannerUnvalidatedV3 };
