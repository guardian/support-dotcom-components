import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerUnvalidated as ContributionsBanner } from './ContributionsBanner';
import { props, content } from '../utils/storybook';
import { BannerProps } from '../../../../types/BannerTypes';
import { SecondaryCtaType } from '../../../../types/shared';

export default {
    component: ContributionsBanner,
    title: 'Banners/Contributions',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <ContributionsBanner {...props} />;

export const Default = Template.bind({});

export const WithReminder = Template.bind({});
WithReminder.args = {
    content: {
        ...content,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
};

export const WithPrefilledReminder = Template.bind({});
WithPrefilledReminder.args = {
    ...WithReminder.args,
    email: 'test@guardian.co.uk',
};
