import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerUnvalidated as BannerCheckoutReminder } from './BannerCheckoutReminder';
import { props, content } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: BannerCheckoutReminder,
    title: 'Banners/CheckoutReminder',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <BannerCheckoutReminder {...props} />;

export const Default = Template.bind({});
Default.args = {
    content: {
        heading: "Forgot something? Complete your £30 monthly contributions",
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'http://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
    choiceCardAmounts: {
        SINGLE: [30, 60],
        MONTHLY: [3, 6],
        ANNUAL: [60, 120],
    },
    abandonedCart: {
        type: "CONTRIBUTION",
        amount: 80,
        contributionType: "MONTHLY"
    }
};

// export const WithPrefilledReminder = Template.bind({});
// WithPrefilledReminder.args = {
//     ...Expanded.args,
//     email: 'test@guardian.co.uk',
// };
