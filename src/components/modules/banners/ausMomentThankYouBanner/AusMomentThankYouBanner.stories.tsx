import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AusMomentThankYouBanner } from './AusMomentThankYouBanner';
import { BannerProps } from '../../../../types/BannerTypes';
import { props } from '../utils/storybook';

export default {
    component: AusMomentThankYouBanner,
    title: 'Banners/AusMomentThankYou',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <AusMomentThankYouBanner {...props} />;

export const Default = Template.bind({});
