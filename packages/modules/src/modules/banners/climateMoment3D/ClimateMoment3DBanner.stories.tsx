import React from 'react';
import { brand, culture } from '@guardian/src-foundations';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/src/types';
import { Meta, Story } from '@storybook/react';
import { bannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { props } from '../utils/storybook';
import { DraggableOverlay } from './components/DraggableOverlay';

export default {
    title: 'Banners/MomentTemplate',
    args: props,
} as Meta;

const ClimateMoment3DBanner = bannerWrapper(
    getMomentTemplateBanner({
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
    }),
    // existing banner ID required for example
    'contributions-banner',
);

const ClimateMoment3DTemplate: Story<BannerProps> = (props: BannerProps) => (
    <ClimateMoment3DBanner {...props} />
);

export const ClimateMoment3D = ClimateMoment3DTemplate.bind({});
ClimateMoment3D.args = {
    ...props,
    content: {
        heading: 'Show your support for reader-funded journalism',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'Congratulations on being one of our top readers. We are proud to say we’re a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. This vital support keeps us fiercely independent, free from shareholders or a billionaire owner. Your support allows us to keep our reporting open for all, as we know not everyone is in a position to pay for news. But if you are, we need you. Make an investment in quality journalism today, so millions more can benefit. ',
        ],
        highlightedText: 'Support us today from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
        cta: {
            text: 'Support monthly',
            baseUrl: 'https://support.theguardian.com/contribute/recurring',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support once',
                baseUrl: 'https://support.theguardian.com/contribute/one-off',
            },
        },
    },
    mobileContent: {
        heading: 'Show your support for reader-funded journalism',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo.',
        ],
        highlightedText: 'Will you join us?',
        cta: {
            text: 'Support monthly',
            baseUrl: 'https://support.theguardian.com/contribute/recurring',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support once',
                baseUrl: 'https://support.theguardian.com/contribute/one-off',
            },
        },
    },
    numArticles: 50,
    tickerSettings: undefined,
};
