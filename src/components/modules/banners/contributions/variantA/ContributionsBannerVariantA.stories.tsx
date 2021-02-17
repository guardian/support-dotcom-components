import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerVariantA } from './ContributionsBannerVariantA';
import { props } from '../../utils/storybook';
import { BannerProps } from '../../../../../types/BannerTypes';

export default {
    component: ContributionsBannerVariantA,
    title: 'Banners/ContributionsVariantA',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => (
    <ContributionsBannerVariantA {...props} />
);

export const Default = Template.bind({});
