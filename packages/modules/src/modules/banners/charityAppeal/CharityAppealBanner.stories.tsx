import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CharityAppealBannerUnvalidated as CharityAppealBanner } from './CharityAppealBanner';
import { props, contentCharityAppeal } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: CharityAppealBanner,
    title: 'Banners/CharityAppeal',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <CharityAppealBanner {...props} />;

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
