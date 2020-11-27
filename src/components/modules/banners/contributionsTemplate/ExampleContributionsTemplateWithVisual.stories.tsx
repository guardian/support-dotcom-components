import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Example, ExampleWithTicker } from './ExampleContributionsTemplateWithVisual';
import { BannerProps } from '../../../../types/BannerTypes';
import { props } from '../utils/storybook';

export default {
    component: Example,
    title: 'Banners/ContributionsTemplateWithVisual',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <Example {...props} />;

const TemplateWithTicker: Story<BannerProps> = (props: BannerProps) => (
    <ExampleWithTicker {...props} />
);

export const WithoutTicker = Template.bind({});

export const WithTicker = TemplateWithTicker.bind({});
