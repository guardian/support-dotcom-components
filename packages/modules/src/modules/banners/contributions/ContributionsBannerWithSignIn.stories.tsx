import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerWithSignInUnvalidated as ContributionsBannerWithSignIn } from './ContributionsBannerWithSignIn';
import { props, content } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: ContributionsBannerWithSignIn,
    title: 'Banners/ContributionsWithSignIn',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => (
    <ContributionsBannerWithSignIn {...props} />
);

export const Default = Template.bind({});

export const WithReminder = Template.bind({});
WithReminder.args = {
    content: {
        ...content,
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
