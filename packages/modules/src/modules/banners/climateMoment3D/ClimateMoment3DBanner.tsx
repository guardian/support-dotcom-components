import React from 'react';
import { brand, culture } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { DraggableOverlay } from './components/DraggableOverlay';

const ClimateMoment3DBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: '#F5F5F5',
        overlayVisual: <DraggableOverlay />,
    },
    headerSettings: {
        textColour: `${brand[500]}`,
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brand[400],
            textColour: 'black',
            border: `1px solid ${brand[400]}`,
        },
        hover: {
            backgroundColour: '#149bc7',
            textColour: 'black',
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
    bodyCopySettings: {
        textColour: 'black',
        highlightedTextSettings: {
            textColour: 'black',
            highlightColour: '#149bc7',
        },
    },
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
        mobileUrl:
            'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
        tabletUrl:
            'https://i.guim.co.uk/img/media/d1af2bcab927ca0ad247522105fe41a52a474d27/0_0_1080_1000/500.png?width=500&quality=75&s=af39fa30f36fce453eabaef3063a3180',
        desktopUrl:
            'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
        wideUrl:
            'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
        altText: 'Guardian logo being held up by supporters of the Guardian',
    },
    bannerId: 'guardian-logo-with-hands-3d',
    articleCountTextColour: 'black',
});

const unvalidated = bannerWrapper(ClimateMoment3DBanner, 'aus-anniversary-banner');
const validated = validatedBannerWrapper(ClimateMoment3DBanner, 'aus-anniversary-banner');

export { validated as ClimateMoment3DBanner, unvalidated as ClimateMoment3DBannerUnvalidated };
