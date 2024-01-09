import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerUnvalidated as ContributionsBanner } from './ContributionsBanner';
import { props, content } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: ContributionsBanner,
    title: 'Banners/Custom/Contributions',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
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

export const WithNonSupportUrl = Template.bind({});
WithNonSupportUrl.args = {
    content: {
        ...content,
        cta: {
            baseUrl: 'theguardian.com',
            text: 'Continue to the Guardian',
        },
    },
};
