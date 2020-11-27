import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AusMomentContributionsBanner } from './AusMomentContributionsBanner';
import { BannerProps } from '../../../../types/BannerTypes';
import { props, tickerSettings } from '../utils/storybook';

export default {
    component: AusMomentContributionsBanner,
    title: 'Banners/AusMoment',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => (
    <AusMomentContributionsBanner {...props} />
);

export const Default = Template.bind({});

export const GoalReached = Template.bind({});
GoalReached.args = {
    tickerSettings: { ...tickerSettings, tickerData: { total: 175_000, goal: 150_000 } },
};
