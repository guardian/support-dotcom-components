import React from 'react';
import { Story, Meta } from '@storybook/react';
import { UsEoyMomentBannerUnvalidated as UsEoyMoment } from './UsEoyMomentBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';

export default {
    component: UsEoyMoment,
    title: 'Banners/UsEoyMoment',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <UsEoyMoment {...props} />;

// where do these props come from in prod?
export const WithoutArticleCount = Template.bind({});
WithoutArticleCount.args = {
    ...props,
    mobileContent: {
        heading: 'Join us in the fight for America’s future',
        messageText:
            'One year ago, we outlined our plans to confront the escalating climate crisis. We promised to report with authority on the defining issue of our lifetime',
        cta: {
            text: 'Support The Guardian',
            baseUrl: 'https://support.theguardian.com/contribute', // do we want to make this US specific?
        },
    },
    content: {
        heading: 'Join us in the fight for America’s future',
        messageText:
            'One year ago, we outlined our plans to confront the escalating climate crisis. We promised to report with authority on the defining issue of our lifetime – giving it the sustained attention it demands. Then came the global pandemic. Today we want to update you on our progress, and assure you that the Guardian will not sideline the climate emergency in 2020, or in the years to come. Generosity from supporters like you sustains our open, independent',
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute', // do we want to make this US specific?
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Hear from our editor',
                baseUrl: 'https://theguardian.com', // what is the link for this?
            },
        },
    },
    numArticles: 0,
};

export const WithArticleCount = Template.bind({});
WithArticleCount.args = {
    ...WithoutArticleCount.args,
    numArticles: 50,
    tickerSettings: {
        countType: TickerCountType.money,
        endType: TickerEndType.hardstop,
        currencySymbol: '$',
        copy: {
            countLabel: 'contributed',
            goalReachedPrimary: "It's not too late to give!",
            goalReachedSecondary: '',
        },
        tickerData: {
            total: 120_000,
            goal: 150_000,
        },
    },
};
