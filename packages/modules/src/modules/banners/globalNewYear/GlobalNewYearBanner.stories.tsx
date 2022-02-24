import React from 'react';
import { Story, Meta } from '@storybook/react';
import { GlobalNewYearBanner } from './GlobalNewYearBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: GlobalNewYearBanner,
    title: 'Banners/GlobalNewYear',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <GlobalNewYearBanner {...props} />;

export const WithoutArticleCount = Template.bind({});
WithoutArticleCount.args = {
    ...props,
    content: {
        heading: 'As 2022 begins, will you support us?',
        messageText:
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations. We do not shy away. And we provide all this for free, for everyone.',
        paragraphs: [
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
            'We do not shy away. And we provide all this for free, for everyone.',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Hear from our editor',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    numArticles: 0,
};

export const WithArticleCount = Template.bind({});
WithArticleCount.args = {
    ...WithoutArticleCount.args,
    numArticles: 321,
};
