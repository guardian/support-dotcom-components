import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EnvironmentMomentBanner } from './EnvironmentMomentBanner';
import { BannerProps } from '../../../../types/BannerTypes';
import { props } from '../utils/storybook';

export default {
    component: EnvironmentMomentBanner,
    title: 'Banners/EnvironmentMoment',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <EnvironmentMomentBanner {...props} />;

export const NonSupporters = Template.bind({});

export const Supporters = Template.bind({});
Supporters.args = {
    isSupporter: true,
};

export const Aus = Template.bind({});
Aus.args = {
    countryCode: 'AU',
};
