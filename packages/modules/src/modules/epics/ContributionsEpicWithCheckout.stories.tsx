import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsEpicUnvalidated as ContributionsEpic } from './ContributionsEpicWithCheckout';
import { props } from './utils/storybook';
import { EpicProps, SecondaryCtaType } from '@sdc/shared/types';
import { EpicDecorator } from './ContributionsEpic.stories';

export default {
    component: ContributionsEpic,
    title: 'Epics/ContributionsWithCheckout',
    args: props,
    decorators: [EpicDecorator],
    excludeStories: /.*Decorator$/,
} as Meta;

const Template: Story<EpicProps> = (props: EpicProps) => <ContributionsEpic {...props} />;

export const Default = Template.bind({});
Default.args = {
    countryCode: 'GB',
    variant: {
        ...props.variant,
        secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
        showReminderFields: {
            reminderCta: 'Remind me in May',
            reminderPeriod: '2020-05-01',
            reminderLabel: 'May',
        },
    },
    stage: 'DEV',
};
