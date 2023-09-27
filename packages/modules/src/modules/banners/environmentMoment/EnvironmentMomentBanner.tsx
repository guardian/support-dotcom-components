import React from 'react';
import { brand, brandAlt, culture, neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { EnvironmentVisual } from './components/headerVisualEnvironment';

const image = {
    mainUrl:
        'https://i.guim.co.uk/img/media/ba2437f7a1155a099f6f113954bc3bd7ed401d73/0_0_254_75/254.jpg?width=254&height=75&quality=100&s=a14ef5687682810756d65e1587c2e768',
    mobileSmallUrl:
        'https://i.guim.co.uk/img/media/ba2437f7a1155a099f6f113954bc3bd7ed401d73/0_0_254_75/254.jpg?width=254&height=75&quality=100&s=a14ef5687682810756d65e1587c2e768',
    mobileMediumUrl:
        'https://i.guim.co.uk/img/media/e647cb47eca617faf786eb15af4b7ef6f5c25fa3/0_0_310_90/310.jpg?width=310&height=90&quality=100&s=2e624f870b0d77b6ea36c26a9fa967e7',
    tabletUrl:
        'https://i.guim.co.uk/img/media/ac03495630fae05beabbd095cce5828351e31b6a/0_0_382_126/382.jpg?width=382&height=126&quality=100&s=4825923ef1a230932c95798ce58329b2',
    desktopUrl:
        'https://i.guim.co.uk/img/media/a59af1e144ce90288369f1c0f6d80972d8069813/0_0_528_183/528.jpg?width=582&height=183&quality=100&s=cdd4c3cb890d50eb9acb021b032dc29b',
    leftColUrl:
        'https://i.guim.co.uk/img/media/9fadcec3889f15b45dc9a8177bd30e57b16494dc/0_0_624_179/624.jpg?width=624&height=179&quality=100&s=cc28f5ac1d180132105db70b750f0223',
    wideUrl:
        'https://i.guim.co.uk/img/media/f5b89e25ec6c34d18db071b9d47078d998f0501d/0_0_696_183/696.jpg?width=696&height=183&quality=100&s=a5f3cbc0bdb85e6cff40c0a6cc6519b2',
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
