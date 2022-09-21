import React from 'react';
import { ContributionsLiveblogEpic } from './ContributionsLiveblogEpic';
import { Story, Meta } from '@storybook/react';
import { EpicProps, SecondaryCtaType } from '@sdc/shared/types';
import { props } from './utils/storybook';

export default {
    component: ContributionsLiveblogEpic,
    title: 'Epics/ContributionsLiveblogEpic',
    args: props,
} as Meta;

const Template: Story<EpicProps> = (props: EpicProps) => <ContributionsLiveblogEpic {...props} />;

export const WhenOnDCR = Template.bind({});
WhenOnDCR.args = {
    tracking: {
        ...props.tracking,
        clientName: 'dcr',
    },
    variant: {
        ...props.variant,
        secondaryCta: undefined,
    },
};

export const WithoutSupportUrl = Template.bind({});
WithoutSupportUrl.args = {
    variant: {
        ...props.variant,
        cta: {
            baseUrl: 'https://theguardian.com',
            text: 'The Guardian',
        },
        secondaryCta: undefined,
    },
};

export const WithReminderCta = Template.bind({});
WithReminderCta.args = {
    variant: {
        ...props.variant,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
        showReminderFields: {
            reminderCta: 'Remind me in December',
            reminderPeriod: '2022-12-01',
            reminderLabel: 'December',
        },
    },
};

export const WithBespokeCta = Template.bind({});
