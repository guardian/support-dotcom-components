import React from 'react';
import { Story, Meta } from '@storybook/react';
import { UsEoyMomentBanner as UsEoyMoment } from './UsEoyMomentBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';

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
        heading: 'Join us in the fight for America’s future',
        messageText:
            'One year ago, we outlined our plans to confront the escalating climate crisis. We promised to report with authority on the defining issue of our lifetime',
        cta: {
            text: 'Support The Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
    },
    content: {
        heading: 'Join us in the fight for America’s future',
        messageText:
            'One year ago, we outlined our plans to confront the escalating climate crisis. We promised to report with authority on the defining issue of our lifetime – giving it the sustained attention it demands. Then came the global pandemic. Today we want to update you on our progress, and assure you that the Guardian will not sideline the climate emergency in 2020, or in the years to come. Generosity from supporters like you sustains our open, independent',
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
    tickerSettings: {
        countType: TickerCountType.money,
        endType: TickerEndType.hardstop,
        currencySymbol: '$',
        copy: {
            countLabel: 'contributed',
            goalReachedPrimary: "We've met our goal - thank you!",
            goalReachedSecondary: "It's not too late to give!",
        },
        tickerData: {
            total: 120000,
            goal: 150000,
        },
    },
};

export const WithArticleCount = Template.bind({});
WithArticleCount.args = {
    ...WithoutArticleCount.args,
    numArticles: 321,
};
