import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CharityAppealBannerWithSignInUnvalidated as CharityAppealBannerWithSignIn } from './CharityAppealBannerWithSignIn';
import { props, contentCharityAppeal } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: CharityAppealBannerWithSignIn,
    title: 'Banners/CharityAppealWithSignIn',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => (
    <CharityAppealBannerWithSignIn {...props} />
);

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
