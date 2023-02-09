import React from 'react';
import { brand, brandAlt, neutral, opinion } from '@guardian/src-foundations';
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
            highlightColour: brandAlt[400],
        },
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/77f5a525824c19d7c1ccd447db49f1a95557f12e/0_0_375_152/375.png?width=375&height=152&quality=75&s=fc6794bfbd1bf46853dbbe982ffa6877',
            mobileUrl:
                'https://i.guim.co.uk/img/media/77f5a525824c19d7c1ccd447db49f1a95557f12e/0_0_375_152/375.png?width=375&height=152&quality=75&s=fc6794bfbd1bf46853dbbe982ffa6877',
            tabletUrl:
                'https://i.guim.co.uk/img/media/8be245a70938a981ff69898eab033f94dab08b86/0_0_256_230/256.png?width=256&height=230&quality=75&s=4b53fcaee3b5f3bed4b6cb1d78b26a84',
            desktopUrl:
                'https://i.guim.co.uk/img/media/5325001b389aaf3bc3ad1aec25ec7b90761f02c2/0_0_320_292/320.png?width=320&height=292&quality=75&s=5b193b151d7c6b444141df7a817763be',
            leftColUrl:
                'https://i.guim.co.uk/img/media/e3ede24eaa18d18766a06d65564fba352064bb5f/0_0_441_292/441.png?width=441&height=292&quality=75&s=6cd61bd9d1eede1f8f9684a58b9cf6c9',
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
        heading: 'Ukraine: one year on',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'The war in Ukraine has changed the world, and the Guardian has covered every minute. Our people on the ground, have endured personal risk and hardship to produce more than 5,000 articles, films and podcasts since the invasion. Our liveblog has reported continuously and comprehensively since the outbreak of Europe’s biggest war since 1945. We know it’s crucial that we stay til the end. Will you join us?',
        ],
        highlightedText: 'Will you join us?',
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
        heading: 'Ukraine: one year on',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'The war in Ukraine has changed the world, and the Guardian has covered every minute. Our people on the ground have endured personal risk and hardship to produce more than 5,000 articles, films and podcasts since the invasion. We know it’s crucial that we stay til the end. Will you join us?',
        ],
        highlightedText: 'Will you join us?',
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
