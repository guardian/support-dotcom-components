import React from 'react';
import { brand, brandAlt, culture, neutral } from '@guardian/source-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { EnvironmentVisual } from './components/headerVisualEnvironment';

const imageDoubleSized = {
    mainUrl:
        'https://i.guim.co.uk/img/media/c0e64841caf710a717788744e9c4970c482b73d3/0_0_508_150/master/508.jpg?width=254&height=75&quality=100&s=6fbbba88e9822c18f17af82f734ba79b',
    mobileSmallUrl:
        'https://i.guim.co.uk/img/media/c0e64841caf710a717788744e9c4970c482b73d3/0_0_508_150/master/508.jpg?width=254&height=75&quality=100&s=6fbbba88e9822c18f17af82f734ba79b',
    mobileMediumUrl:
        'https://i.guim.co.uk/img/media/036510bc15ecdba97355f464006e3db5fbde9129/0_0_620_180/master/620.jpg?width=310&height=90&quality=100&s=01c604815a2f9980a1227c0d91ffa6b1',
    tabletUrl:
        'https://i.guim.co.uk/img/media/0d0bda341c85d6d415384968d63898399ca49952/0_0_764_252/master/764.jpg?width=382&height=126&quality=100&s=53cf657cae48d854003aa44c8578bda1',
    desktopUrl:
        'https://i.guim.co.uk/img/media/7030f9d98e368d6e5c7a34c643c76d7d1f5ac63c/0_0_1056_366/master/1056.jpg?width=528&height=183&quality=100&s=f0c02cddda84dfaf4ef261d91bd26159',
    leftColUrl:
        'https://i.guim.co.uk/img/media/6f09850dd1bff07005c162501a95c506ee88038c/0_0_1248_358/master/1248.jpg?width=624&height=179&quality=100&s=bdff3fd934eb6271082f5d947c0f7890',
    wideUrl:
        'https://i.guim.co.uk/img/media/3c1cb611785d3dccc2674636a6f692da1e2fcdb6/0_0_1392_366/master/1392.jpg?width=696&height=183&quality=100&s=5935c1ae5e8cbc5d9ed616bbadb3b09e',
    altText: 'Guardian Our Planet cant Speak for itself',
};

const EnvironmentMomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: neutral[100],
    },
    headerSettings: {
        showHeader: { text: false, image: true },
        textColour: neutral[0],
        image: (
            <EnvironmentVisual settings={imageDoubleSized} bannerId={'environment-moment-banner'} />
        ),
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brandAlt[400],
            textColour: neutral[0],
        },
        hover: {
            backgroundColour: brandAlt[200],
            textColour: neutral[0],
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
            backgroundColour: neutral[100],
            textColour: neutral[0],
            border: `1px solid ${neutral[0]}`,
        },
        hover: {
            backgroundColour: '#FDF1F8',
            textColour: neutral[0],
        },
        theme: 'brand',
    },
    highlightedTextSettings: {
        textColour: neutral[100],
        highlightColour: '#F55D1E',
    },
    choiceCards: true,
    choiceCardSettings: {
        buttonColour: neutral[100],
    },
    bannerId: 'environment-moment-banner',
});

const unvalidated = bannerWrapper(EnvironmentMomentBanner, 'environment-moment-banner');
const validated = validatedBannerWrapper(EnvironmentMomentBanner, 'environment-moment-banner');

export { validated as EnvironmentMomentBanner, unvalidated as EnvironmentMomentBannerUnValidated };
