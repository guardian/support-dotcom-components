import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerUnvalidated as ContributionsBanner } from './ContributionsBanner';
import { props, contentContributions } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: ContributionsBanner,
    title: 'Banners/Contributions',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <ContributionsBanner {...props} />;

export const Default = Template.bind({});

export const WithReminder = Template.bind({});
WithReminder.args = {
    content: {
        ...contentContributions,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
};

export const WithPrefilledReminder = Template.bind({});
WithPrefilledReminder.args = {
    ...WithReminder.args,

    fetchEmail: () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('test@guardian.co.uk');
            }, 500);
        });
    },
};

export const WithoutSupportUrl = Template.bind({});
WithoutSupportUrl.args = {
    ...WithReminder.args,
    content: {
        ...contentContributions,
        cta: {
            baseUrl: 'https://theguardian.com',
            text: 'The Guardian',
        },
    },
};
