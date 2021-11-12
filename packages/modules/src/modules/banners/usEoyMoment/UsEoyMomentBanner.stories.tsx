import React from 'react';
import { Story, Meta } from '@storybook/react';
import { UsEoyMomentBannerUnvalidated as UsEoyMoment } from './UsEoyMomentBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: UsEoyMoment,
    title: 'Banners/UsEoyMoment',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <UsEoyMoment {...props} />;

export const WithoutArticleCount = Template.bind({});
WithoutArticleCount.args = {
    ...props,
    mobileContent: {
        heading: 'Invest in investigative journalism',
        messageText:
            'Dummy copy In these extraordinary times, millions rely on the Guardian for high-impact, independent journalism that stands for truth and integrity. With no shareholders or billionaire owner, we report on world events with accuracy billionaire owner, we report on world events with accuracy billionaire owner, we report on world events with accuracy',
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Learn more',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    content: {
        heading: 'Invest in investigative journalism',
        messageText:
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations. We do not shy away. And we provide all this for free, for everyone.',
        highlightedText:
            'Show your support today from just $1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Learn more about us',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    numArticles: 0,
};

export const WithArticleCount = Template.bind({});
WithArticleCount.args = {
    ...WithoutArticleCount.args,
    numArticles: 50,
};
