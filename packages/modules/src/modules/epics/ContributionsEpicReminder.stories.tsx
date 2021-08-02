import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    ContributionsEpicReminder,
    ContributionsEpicReminderProps,
} from './ContributionsEpicReminder';
import { EpicDecorator } from './ContributionsEpic.stories';

export default {
    component: ContributionsEpicReminder,
    title: 'Epics/ContributionsEpicReminder',
    args: {
        reminderPeriod: '2021-05-01',
        reminderLabel: 'May',
    },
    decorators: [EpicDecorator],
} as Meta;

const Template: Story<ContributionsEpicReminderProps> = (props: ContributionsEpicReminderProps) => (
    <ContributionsEpicReminder {...props} />
);

export const SignedIn = Template.bind({});
SignedIn.args = {
    initialEmailAddress: 'test.user@guardian.co.uk',
};

export const SignedOut = Template.bind({});
