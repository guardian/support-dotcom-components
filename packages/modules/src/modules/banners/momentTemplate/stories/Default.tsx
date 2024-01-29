import React from 'react';
import { brand, neutral, brandAlt } from '@guardian/source-foundations';
import { BannerProps } from '@sdc/shared/src/types';
import { Story } from '@storybook/react';
import { bannerWrapper } from '../../common/BannerWrapper';
import { getMomentTemplateBanner } from '../MomentTemplateBanner';

export const DefaultBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#F1F8FC',
        },
        headerSettings: {
            showHeader: { text: true },
            textColour: '#0077B6',
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
        bannerId: 'global-new-year-moment-banner',
    }),
    'global-new-year-moment-banner',
);

export const DefaultTemplate: Story<BannerProps> = (props: BannerProps) => (
    <DefaultBanner {...props} />
);
