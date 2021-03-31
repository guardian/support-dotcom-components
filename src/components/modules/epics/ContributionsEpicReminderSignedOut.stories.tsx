import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    ContributionsEpicReminderSignedOut,
    ContributionsEpicReminderSignedOutProps,
} from './ContributionsEpicReminderSignedOut';
import { ReminderStatus } from './utils/reminders';
import { EpicDecorator } from './ContributionsEpic.stories';

export default {
    component: ContributionsEpicReminderSignedOut,
    title: 'Epics/ContributionsEpicReminderSignedOut',
    args: {
        reminderLabel: 'May',
        reminderStatus: ReminderStatus.Editing,
    },
    decorators: [EpicDecorator],
} as Meta;

const Template: Story<ContributionsEpicReminderSignedOutProps> = (
    props: ContributionsEpicReminderSignedOutProps,
) => <ContributionsEpicReminderSignedOut {...props} />;

export const Default = Template.bind({});

export const Submitting = Template.bind({});
Submitting.args = {
    reminderStatus: ReminderStatus.Submitting,
};

export const Completed = Template.bind({});
Completed.args = {
    reminderStatus: ReminderStatus.Completed,
};

export const Error = Template.bind({});
Error.args = {
    reminderStatus: ReminderStatus.Error,
};
