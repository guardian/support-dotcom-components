import React from 'react';
import { brand, brandAlt, culture, neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { EnvironmentVisual } from './components/headerVisualEnvironment';

const image = {
    mainUrl:
        'https://i.guim.co.uk/img/media/bfaa2726d4a36b469cbfb1aca58b6b7c4ae218f7/0_0_698_183/698.jpg?width=698&height=183&quality=75&s=d126720d69997803f760cc7ef8f7eb9c',
    mobileSmallUrl:
        'https://i.guim.co.uk/img/media/424f0c9baa84eb37617f4afe33a461f5ce464b6c/0_0_320_96/320.jpg?width=320&height=96&quality=100&s=920c49ccba8021182316b310d42777c1',
    mobileMediumUrl:
        'https://i.guim.co.uk/img/media/8c17fd216b9af51a439c3cc9a16d63135465428b/0_0_375_110/375.png?width=375&height=110&quality=75&s=9a0abbe5748c650e0525430cf034520c',
    tabletUrl:
        'https://i.guim.co.uk/img/media/1d3acb76721ea9e7037c98ddae2196ae6a15391a/0_0_354_126/354.jpg?width=354&height=126&quality=75&s=3fda53959a96845a7cec6987915680f6',
    desktopUrl:
        'https://i.guim.co.uk/img/media/1eed686ab18e2e32e042dcdabe3fc1316e99d3de/0_0_481_183/481.jpg?width=481&height=183&quality=75&s=62dcdbf760ebe1b2d0628a488d75c7d0',
    leftColUrl:
        'https://i.guim.co.uk/img/media/7137a960abda3518f8632f4ecb63b453efc5f2cc/0_0_640_183/640.jpg?width=640&height=183&quality=75&s=135bb3d64f7392f11995dea22000e750',
    wideUrl:
        'https://i.guim.co.uk/img/media/bfaa2726d4a36b469cbfb1aca58b6b7c4ae218f7/0_0_698_183/698.jpg?width=698&height=183&quality=75&s=d126720d69997803f760cc7ef8f7eb9c',
    altText: 'Guardian Our Planet cant Speak for itself',
};

const EnvironmentMoment2023Banner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: neutral[100],
    },
    headerSettings: {
        showHeader: { text: false, image: true },
        textColour: neutral[0],
        image: <EnvironmentVisual settings={image} bannerId={'environment-moment-banner-2023'} />,
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
    bannerId: 'environment-moment-banner-2023',
});

const unvalidated = bannerWrapper(EnvironmentMoment2023Banner, 'supporter-moment-banner');
const validated = validatedBannerWrapper(EnvironmentMoment2023Banner, 'supporter-moment-banner');

export {
    validated as EnvironmentMoment2023Banner,
    unvalidated as EnvironmentMoment2023BannerUnValidated,
};
