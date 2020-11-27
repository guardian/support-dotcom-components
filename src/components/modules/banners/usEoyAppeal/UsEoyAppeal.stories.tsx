import React from 'react';
import { Story, Meta } from '@storybook/react';
import { UsEoyAppealBanner } from './UsEoyAppeal';
import { props, tickerSettings } from '../utils/storybook';
import { BannerProps } from '../../../../types/BannerTypes';

export default {
    component: UsEoyAppealBanner,
    title: 'Banners/UsEoyAppeal',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <UsEoyAppealBanner {...props} />;

export const NonSupporters = Template.bind({});

export const Supporters = Template.bind({});
Supporters.args = {
    isSupporter: true,
};

export const GoalReached = Template.bind({});
GoalReached.args = {
    tickerSettings: { ...tickerSettings, tickerData: { total: 175_000, goal: 150_000 } },
};
