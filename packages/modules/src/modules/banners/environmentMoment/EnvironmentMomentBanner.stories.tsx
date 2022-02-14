import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EnvironmentMomentBannerUnvalidated as EnvironmentMomentBanner } from './EnvironmentMomentBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: EnvironmentMomentBanner,
    title: 'Banners/EnvironmentMomentBanner',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <EnvironmentMomentBanner {...props} />;

export const WithoutArticleCount = Template.bind({});
WithoutArticleCount.args = {
    ...props,
    mobileContent: {
        heading: '',
        messageText:
            'We will not sideline the climate crisis. Today, one year on from our pledge, we want to update you on our progress.',
        paragraphs:
            ['We will not sideline the climate crisis. Today, one year on from our pledge, we want to update you on our progress.'],
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Read our pledge',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    content: {
        heading: '',
        messageText:
            'One year ago, we outlined our plans to confront the escalating climate crisis. We promised to report with authority on the defining issue of our lifetime – giving it the sustained attention it demands. Then came the global pandemic. Today we want to update you on our progress, and assure you that the Guardian will not sideline the climate emergency in 2020, or in the years to come. Generosity from supporters like you sustains our open, independent journalism. Thank you',
        paragraphs: [
            'One year ago, we outlined our plans to confront the escalating climate crisis. We promised to report with authority on the defining issue of our lifetime – giving it the sustained attention it demands. Then came the global pandemic.',
            'Today we want to update you on our progress, and assure you that the Guardian will not sideline the climate emergency in 2020, or in the years to come. Generosity from supporters like you sustains our open, independent journalism. Thank you'
            ],
        cta: {
            text: 'Read our Pledge',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support again',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
};

export const WithArticleCount = Template.bind({});
WithArticleCount.args = {
    ...WithoutArticleCount.args,
    numArticles: 99,
};

export const Supporter = Template.bind({});
Supporter.args = {
    ...WithArticleCount.args,
    isSupporter: true,
};
