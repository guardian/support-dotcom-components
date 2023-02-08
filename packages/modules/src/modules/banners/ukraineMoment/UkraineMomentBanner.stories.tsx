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
                'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
            mobileUrl:
                'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
            tabletUrl:
                'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
            desktopUrl:
                'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
            leftColUrl:
                'https://i.guim.co.uk/img/media/62315536ef650b7c9bbf5739d192f10a8c19d66b/0_0_558_293/558.png?width=558&height=293&quality=75&s=171640e67a1f1f5d46e907d4d660d01d',
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
