import React from 'react';
import { Story, Meta } from '@storybook/react';
import { GlobalEoyBanner } from './GlobalEoy';
import { props } from '../utils/storybook';
import { BannerProps } from '../../../../types/BannerTypes';

export default {
    component: GlobalEoyBanner,
    title: 'Banners/GlobalEoy',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <GlobalEoyBanner {...props} />;

export const NonSupporters = Template.bind({});

export const Supporters = Template.bind({});
Supporters.args = {
    isSupporter: true,
};
