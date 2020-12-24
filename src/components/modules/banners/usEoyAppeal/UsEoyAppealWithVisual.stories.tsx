import React from 'react';
import { Story, Meta } from '@storybook/react';
import { UsEoyAppealBannerWithVisual } from './UsEoyAppealWithVisual';
import { props, tickerSettings } from '../utils/storybook';
import { BannerProps } from '../../../../types/BannerTypes';

export default {
    component: UsEoyAppealBannerWithVisual,
    title: 'Banners/UsEoyAppealWithVisual',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => (
    <UsEoyAppealBannerWithVisual {...props} />
);

export const NonSupporters = Template.bind({});

export const Supporters = Template.bind({});
Supporters.args = {
    isSupporter: true,
};

export const WithArticleCount = Template.bind({});
WithArticleCount.args = { numArticles: 20 };

export const GoalReached = Template.bind({});
GoalReached.args = {
    tickerSettings: { ...tickerSettings, tickerData: { total: 175_000, goal: 150_000 } },
};
