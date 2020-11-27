import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBanner } from './ContributionsBanner';
import { props } from '../utils/storybook';
import { BannerProps } from '../../../../types/BannerTypes';

export default {
    component: ContributionsBanner,
    title: 'Banners/Contributions',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <ContributionsBanner {...props} />;

export const Default = Template.bind({});
