import React from 'react';
import { Story, Meta } from '@storybook/react';
import { props } from '../utils/storybook';
import { BannerProps,  SecondaryCtaType, TickerCountType, TickerEndType  } from '@sdc/shared/types';
import { AusMomentBanner } from './AusBanner';

const tickerSettings = {
    countType: TickerCountType.people,
    endType: TickerEndType.unlimited,
    currencySymbol: '$',
    copy: {
        countLabel: 'supporters in Australia',
        goalReachedPrimary: "We've hit our goal!",
        goalReachedSecondary: 'but you can still support us',
    },
    tickerData: {
        total: 120_000,
        goal: 150_000,
    },
};

export default {
    component: AusMomentBanner,
    title: 'Banners/AusMoment',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <AusMomentBanner {...props} />;

export const Default = Template.bind({});

Default.args = {
    ...props,
    tickerSettings,
    mobileContent: {
        heading: 'Together, we can be a voice for change',
        messageText:
            'Help us reach more people across xxx T xx Australia. One in three people in Australia read the Guardian in the last year. p Guardian in the last yea growing our readership and gaining your support so we can provide high quas. To find out more, read this letter from our editor.',
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
    },
    content: {
        heading: 'Together, we can be a voice for change',
        messageText:
            'Every xxx,xxx of readers, like you, turn to Guardian Australia. With your support, we can provide more people with the rigorous, independent journalism that is so needed now. We believe everyone, regardless of circumstance, deserves access to factual information and high-quality reporting. <br><br>You can help us fulfil this purpose. We want to grow our community of supporters to 170,000. By making a financial contribution to Guardian Australia, and sharing our work, you will join a growing chorus calling for a fairer future. Thank you.',
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
};

export const Supporter = Template.bind({});

Supporter.args = {
    ...Default.args,
    isSupporter: true,
};
