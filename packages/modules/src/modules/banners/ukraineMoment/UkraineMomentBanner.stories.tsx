import React from 'react';
import { brand, brandAlt, culture, neutral } from '@guardian/source-foundations';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/dist/types';
import { Meta, Story } from '@storybook/react';
import { bannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { props } from '../utils/storybook';

export default {
    title: 'Banners/Moment',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
    args: props,
} as Meta;

const UkraineMomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: culture[800],
        },
        headerSettings: {
            showHeader: { text: true },
            textColour: brand[400],
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: brand[400],
                textColour: 'white',
            },
            hover: {
                backgroundColour: brandAlt[200],
                textColour: brand[400],
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
        },
        closeButtonSettings: {
            default: {
                backgroundColour: culture[800],
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
        },
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/5f55f84fbb107ad1539659d8caec5eeab7398dbc/0_0_1500_608/500.png?width=500&quality=75&s=2173abfa5e53fb64660c6596a887e9ac',
            mobileUrl:
                'https://i.guim.co.uk/img/media/5f55f84fbb107ad1539659d8caec5eeab7398dbc/0_0_1500_608/500.png?width=500&quality=75&s=2173abfa5e53fb64660c6596a887e9ac',
            tabletUrl:
                'https://i.guim.co.uk/img/media/4f2ec5867b1a111b78927547f2fdceb0066695f9/0_0_1024_920/500.png?width=500&quality=75&s=ef15b7ff812d997251a68b59a1b4279c',
            desktopUrl:
                'https://i.guim.co.uk/img/media/8d9128c93a61155e0b84f0eb229edd57951ee3ff/0_0_1280_1168/500.png?width=500&quality=75&s=0d8ff342ffc3005186903969b22a4674',
            leftColUrl:
                'https://i.guim.co.uk/img/media/359d8cde335895144b85a52ce0fe6b93fa8e1514/0_0_882_584/882.png?width=882&height=584&quality=75&s=da90ac1806631a1cb7f3903af88b5819',
            wideUrl:
                'https://i.guim.co.uk/img/media/359d8cde335895144b85a52ce0fe6b93fa8e1514/0_0_882_584/882.png?width=882&height=584&quality=75&s=da90ac1806631a1cb7f3903af88b5819',
            altText: 'Ukraine one year on',
        },
        bannerId: 'ukraine-moment-banner',
    }),
    'ukraine-moment-banner',
);

const UkraineMomentTemplate: Story<BannerProps> = (props: BannerProps) => (
    <UkraineMomentBanner {...props} />
);

export const UkraineMoment2023 = UkraineMomentTemplate.bind({});
UkraineMoment2023.args = {
    ...props,
    content: {
        heading: 'A year on, we’ll keep on covering every minute',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'The war in Ukraine has changed the world, and the Guardian has covered every minute. Our staff, ever present in the country, have endured personal risk and hardship to produce more than 5,000 articles, films and podcasts since the invasion. Our liveblog has reported continuously and comprehensively since the outbreak of Europe’s biggest war since 1945. We know it’s crucial that we stay til the end.',
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
    mobileContent: {
        heading: 'A year on, we’ll keep on covering every minute',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'The war in Ukraine has changed the world, and the Guardian has covered every minute. Our staff, ever present in the country, have endured personal risk and hardship to produce more than 5,000 articles, films and podcasts since the invasion. Our liveblog has reported continuously and comprehensively since the outbreak of Europe’s biggest war since 1945. We know it’s crucial that we stay til the end.',
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
