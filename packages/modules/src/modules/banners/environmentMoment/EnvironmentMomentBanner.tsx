import React from 'react';
import { brand, brandAlt, culture, neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { EnvironmentVisual } from './components/headerVisualEnvironment';

const image = {
    mainUrl:
        'https://i.guim.co.uk/img/media/ba2437f7a1155a099f6f113954bc3bd7ed401d73/0_0_254_75/master/254.jpg?width=254&height=75&quality=100&s=2f01473216a7ac757268c75dd200486b',
    mobileSmallUrl:
        'https://i.guim.co.uk/img/media/ba2437f7a1155a099f6f113954bc3bd7ed401d73/0_0_254_75/master/254.jpg?width=254&height=75&quality=100&s=2f01473216a7ac757268c75dd200486b',
    mobileMediumUrl:
        'https://i.guim.co.uk/img/media/e647cb47eca617faf786eb15af4b7ef6f5c25fa3/0_0_310_90/master/310.jpg?width=310&height=90&quality=100&s=f26669ff4ed195e0f29fb6fae4caf6cc',
    tabletUrl:
        'https://i.guim.co.uk/img/media/ac03495630fae05beabbd095cce5828351e31b6a/0_0_382_126/master/382.jpg?width=382&height=126&quality=100&s=145f23a3b7e994fb0da44525ce436df1',
    desktopUrl:
        'https://i.guim.co.uk/img/media/a59af1e144ce90288369f1c0f6d80972d8069813/0_0_528_183/master/528.jpg?width=528&height=183&quality=100&s=56ba9d19e9fcd921c6a8ed5f4cd81dee',
    leftColUrl:
        'https://i.guim.co.uk/img/media/9fadcec3889f15b45dc9a8177bd30e57b16494dc/0_0_624_179/master/624.jpg?width=624&height=179&quality=100&s=d68561cbf31881608f448908fc145e89',
    wideUrl:
        'https://i.guim.co.uk/img/media/f5b89e25ec6c34d18db071b9d47078d998f0501d/0_0_696_183/master/696.jpg?width=696&height=183&quality=100&s=fb3c4b40daaed51bd35b5740216d43a4',
    altText: 'Guardian Our Planet cant Speak for itself',
};

const EnvironmentMomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: neutral[100],
    },
    headerSettings: {
        showHeader: { text: false, image: true },
        textColour: neutral[0],
        image: <EnvironmentVisual settings={image} bannerId={'environment-moment-banner'} />,
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
    bannerId: 'environment-moment-banner',
});

const unvalidated = bannerWrapper(EnvironmentMomentBanner, 'environment-moment-banner');
const validated = validatedBannerWrapper(EnvironmentMomentBanner, 'environment-moment-banner');

export { validated as EnvironmentMomentBanner, unvalidated as EnvironmentMomentBannerUnValidated };
