import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerWithSignInUnvalidated as ContributionsBannerWithSignIn } from './ContributionsBannerWithSignIn';
import { props } from '../utils/storybook';
import { BannerProps } from '@sdc/shared/types';

export default {
    component: ContributionsBannerWithSignIn,
    title: 'Banners/Custom/Contributions',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => (
    <ContributionsBannerWithSignIn {...props} />
);

export const WithSignIn = Template.bind({});
