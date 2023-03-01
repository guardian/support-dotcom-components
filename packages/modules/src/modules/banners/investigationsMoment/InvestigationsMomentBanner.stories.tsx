import React from 'react';
import { Story, Meta } from '@storybook/react';
import { InvestigationsMomentBannerUnvalidated as InvestigationsMoment } from './InvestigationsMomentBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: InvestigationsMoment,
    title: 'Banners/InvestigationsMoment',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <InvestigationsMoment {...props} />;

export const WithoutArticleCount = Template.bind({});
WithoutArticleCount.args = {
    ...props,
    mobileContent: {
        heading: 'Show your support for reader-funded journalism',
        messageText:
            'Dummy copy In these extraordinary times, millions rely on the Guardian for high-impact, independent journalism that stands for truth and integrity. With no shareholders or billionaire owner, we report on world events with accuracy billionaire owner, we report on world events with accuracy billionaire owner, we report on world events with accuracy',
        paragraphs: [
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
            'We do not shy away. And we provide all this for free, for everyone.',
        ],
        cta: {
            text: 'Support Once',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support Monthly',
                baseUrl: 'https://support.theguardian.com/contribute/monthly',
            },
        },
    },
    content: {
        heading: 'Show your support for reader-funded journalism',
        messageText:
            'Dummy copy In these extraordinary times, millions rely on the Guardian for high-impact, independent journalism that stands for truth and integrity. With no shareholders or billionaire owner, we report on world events with accuracy billionaire owner, we report on world events with accuracy billionaire owner, we report on world events with accuracy',

        paragraphs: [
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
            'We do not shy away. And we provide all this for free, for everyone.',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support monthly',
            baseUrl: 'https://support.theguardian.com/contribute/monthly',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support once',
                baseUrl: 'https://support.theguardian.com/contribute',
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
