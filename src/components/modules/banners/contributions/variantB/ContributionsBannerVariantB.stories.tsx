import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerVariantB } from './ContributionsBannerVariantB';
import { props } from '../../utils/storybook';
import { BannerProps } from '../../../../../types/BannerTypes';

export default {
    component: ContributionsBannerVariantB,
    title: 'Banners/ContributionsVariantB',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => (
    <ContributionsBannerVariantB {...props} />
);

export const Default = Template.bind({});
