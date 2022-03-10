import React from 'react';
import { ContributionsLiveblogEpic } from './ContributionsLiveblogEpic';
import { Story, Meta } from '@storybook/react';
import { EpicProps } from '@sdc/shared/types';
import { props } from './utils/storybook';
import { WithReminder } from '../banners/contributions/ContributionsBanner.stories';

export default {
    component: ContributionsLiveblogEpic,
    title: 'Epics/ContributionsLiveblogEpic',
    args: props,
} as Meta;

const Template: Story<EpicProps> = (props: EpicProps) => <ContributionsLiveblogEpic {...props} />;

export const Default = Template.bind({});

export const WithoutSupportUrl = Template.bind({});
WithoutSupportUrl.args = {
    ...WithReminder.args,
    variant: {
        ...props.variant,
        cta: {
            baseUrl: 'https://theguardian.com',
            text: 'The Guardian',
        },
    },
};

export const WhenOnDCR = Template.bind({});
WhenOnDCR.args = {
    tracking: {
        ...props.tracking,
        platformId: 'dcr',
    },
};
