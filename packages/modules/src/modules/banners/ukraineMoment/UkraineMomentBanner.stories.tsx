import React from 'react';
import { brand, neutral, opinion } from '@guardian/src-foundations';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/src/types';
import { Meta, Story } from '@storybook/react';
import { bannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { props } from '../utils/storybook';

export default {
    title: 'Banners/MomentTemplate',
    args: props,
} as Meta;

const UkraineMomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        backgroundColour: opinion[800],
        headerSettings: {
            textColour: brand[400],
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: brand[400],
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
                backgroundColour: '#FEF9F5',
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
                backgroundColour: opinion[800],
                textColour: brand[400],
                border: `1px solid ${brand[400]}`,
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: brand[400],
            },
        },
        highlightedTextSettings: {
            textColour: neutral[0],
        },
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/f993cdadc7f9ec03f9b99bc0b5a0c58b134bb944/0_0_1428_1344/500.png?quality=85&s=707b13d33c9338b50f99036e6854a3c2',
            mobileUrl:
                'https://i.guim.co.uk/img/media/bd2f8e3aa73cb098d8b353326d757b6d69fa15e3/0_0_1172_560/500.png?quality=85&s=32368799f93ede3eed8d196b4c5de4fd',
            tabletUrl:
                'https://i.guim.co.uk/img/media/ae8eb7a698d15cf45fc523640b7f171fcf8e2585/0_0_1080_1500/720.png?quality=85&s=58da1f597098fef5cf212ea8f1a34481',
            desktopUrl:
                'https://i.guim.co.uk/img/media/1fdc936af90c43d274a960262f874f77f4084e76/0_0_1428_1680/850.png?quality=85&s=3d749d44475cf6d1699e8f5e235394a7',
            leftColUrl:
                'https://i.guim.co.uk/img/media/f993cdadc7f9ec03f9b99bc0b5a0c58b134bb944/0_0_1428_1344/500.png?quality=85&s=707b13d33c9338b50f99036e6854a3c2',
            altText: 'Ukraine one year on',
        },
        bannerId: 'ukraine-moment-banner',
    }),
    'ukraine-moment-banner',
);

const UkraineMomentTemplate: Story<BannerProps> = (props: BannerProps) => (
    <UkraineMomentBanner {...props} />
);

export const UkraineMoment = UkraineMomentTemplate.bind({});
UkraineMoment.args = {
    ...props,
    content: {
        heading: 'A year on, we’ll keep on covering every minute',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'The war in Ukraine has changed the world, and the Guardian has covered every minute. Our people on the ground, have endured personal risk and hardship to produce more than 5,000 articles, films and podcasts since the invasion. Our liveblog has reported continuously and comprehensively since the outbreak of Europe’s biggest war since 1945. We know it’s crucial that we stay til the end. Will you join us?',
        ],
        highlightedText:
            'Give just once from %%CURRENCY_SYMBOL%%1, or better yet, power us every month with a little more.',
        cta: {
            text: 'Support independent journalism',
            baseUrl: 'https://support.theguardian.com/contribute/one-off',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Hear from our editor',
                baseUrl: 'https://support.theguardian.com/contribute/recurring',
            },
        },
    },
    mobileContent: {
        heading: 'A year on, we’ll keep on covering every minute',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'The war in Ukraine has changed the world, and the Guardian has covered every minute. Our people on the ground have endured personal risk and hardship to produce more than 5,000 articles, films and podcasts since the invasion. We know it’s crucial that we stay til the end. Will you join us?',
        ],
        highlightedText:
            'Give just once from %%CURRENCY_SYMBOL%%1, or better yet, power us every month with a little more.',
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute/one-off',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Hear from our editor',
                baseUrl: 'https://support.theguardian.com/contribute/recurring',
            },
        },
    },
    numArticles: 50,
    tickerSettings: undefined,
};
