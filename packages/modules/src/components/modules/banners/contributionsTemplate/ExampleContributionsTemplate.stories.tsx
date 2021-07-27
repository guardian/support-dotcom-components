import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Example } from './ExampleContributionsTemplate';
import { BannerProps } from '../../../../types/BannerTypes';
import { props } from '../utils/storybook';

export default {
    component: Example,
    title: 'Banners/ContributionsTemplate',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <Example {...props} />;

export const Default = Template.bind({});
