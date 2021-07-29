import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
	ContributionsEpicReminderSignedIn,
	ContributionsEpicReminderSignedInProps,
} from './ContributionsEpicReminderSignedIn';
import { ReminderStatus } from '../utils/reminders';
import { EpicDecorator } from './ContributionsEpic.stories';

export default {
	component: ContributionsEpicReminderSignedIn,
	title: 'Epics/ContributionsEpicReminderSignedIn',
	args: {
		reminderLabel: 'May',
		reminderStatus: ReminderStatus.Editing,
	},
	decorators: [EpicDecorator],
} as Meta;

const Template: Story<ContributionsEpicReminderSignedInProps> = (
	props: ContributionsEpicReminderSignedInProps,
) => <ContributionsEpicReminderSignedIn {...props} />;

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
