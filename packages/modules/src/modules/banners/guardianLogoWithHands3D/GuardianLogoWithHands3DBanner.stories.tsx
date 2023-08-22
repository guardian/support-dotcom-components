import React from 'react';
import { brand, culture, neutral, specialReport } from '@guardian/src-foundations';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/src/types';
import { Meta, Story } from '@storybook/react';
import { bannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { props } from '../utils/storybook';
import { GuardianLogoWithHandsVisual } from './components/GuardianLogoWithHandsVisual';

export default {
    title: 'Banners/MomentTemplate',
    args: props,
} as Meta;

const GuardianLogoWithHands3DBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#005689',
            textColor: neutral[100],
        },
        headerSettings: {
            textColour: 'white',
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: brand[400],
                textColour: 'white',
                border: `1px solid ${brand[400]}`,
            },
            hover: {
                backgroundColour: '#149bc7',
                textColour: 'white',
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
        highlightedTextSettings: {
            textColour: specialReport[100],
            highlightColour: neutral[100],
        },
        alternativeVisual: <GuardianLogoWithHandsVisual />,
        bannerId: 'guardian-logo-with-hands-3d',
        articleCountTextColour: 'white',
    }),
    // existing banner ID required for example
    'contributions-banner',
);

const GuardianLogoWithHands3DTemplate: Story<BannerProps> = (props: BannerProps) => (
    <GuardianLogoWithHands3DBanner {...props} />
);

export const GuardianLogoWithHands = GuardianLogoWithHands3DTemplate.bind({});
GuardianLogoWithHands.args = {
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
