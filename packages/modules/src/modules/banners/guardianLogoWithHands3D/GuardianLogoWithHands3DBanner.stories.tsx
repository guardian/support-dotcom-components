import React from 'react';
import { brand, culture } from '@guardian/src-foundations';
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
        },
        headerSettings: {
            textColour: 'white',
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: culture[800],
                textColour: brand[400],
                border: `1px solid ${brand[400]}`,
            },
            hover: {
                backgroundColour: '#bcbcbc',
                textColour: brand[400],
                border: `1px solid ${brand[400]}`,
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: brand[400],
                textColour: 'white',
            },
            hover: {
                backgroundColour: '#149bc7',
                textColour: 'white',
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
            textColour: 'white',
            highlightColour: '#149bc7',
        },
        alternativeVisual: <GuardianLogoWithHandsVisual />,
        bannerId: 'guardian-logo-with-hands-3d',
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
