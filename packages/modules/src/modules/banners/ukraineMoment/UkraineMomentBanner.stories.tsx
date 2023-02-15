import React from 'react';
import { brand, culture, neutral } from '@guardian/src-foundations';
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
        backgroundColour: culture[800],
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
        },
        highlightedTextSettings: {
            textColour: neutral[0],
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

export const UkraineMoment = UkraineMomentTemplate.bind({});
UkraineMoment.args = {
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
