import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CharityAppealBannerUnvalidated as CharityAppealBanner } from './CharityAppealBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: CharityAppealBanner,
    title: 'Banners/CharityAppeal',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <CharityAppealBanner {...props} />;

const contentCharityAppeal = {
    heading: 'Lend us a hand in 2022',
    messageText:
        'Congratulations on being one of our top readers. We are proud to say we’re a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. This vital support keeps us fiercely independent, free from shareholders or a billionaire owner. Your support allows us to keep our reporting open for all, as we know not everyone is in a position to pay for news. But if you are, we need you. Make an investment in quality journalism today, so millions more can benefit. ',
    mobileMessageText:
        'Congratulations on being one of our top readers. We are proud to say we’re a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. This vital support keeps us fiercely independent, free from shareholders or a billionaire owner. Your support allows us to keep our reporting open for all, as we know not everyone is in a position to pay for news. But if you are, we need you. Make an investment in quality journalism today, so millions more can benefit. ',
    highlightedText: 'Support us today from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
    cta: {
        baseUrl: 'https://support.theguardian.com/contribute',
        text: 'Support The Guardian',
    },
};

export const Default = Template.bind({});
Default.args = {
    content: {
        ...contentCharityAppeal,
    },
};

export const WithReminder = Template.bind({});
WithReminder.args = {
    content: {
        ...contentCharityAppeal,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
};
