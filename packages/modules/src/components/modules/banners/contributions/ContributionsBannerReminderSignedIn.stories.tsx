import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    ContributionsBannerReminderSignedIn,
    ContributionsBannerReminderSignedInProps,
} from './ContributionsBannerReminderSignedIn';
import { css } from '@emotion/core';
import { brandAlt } from '@guardian/src-foundations/palette';
import { SecondaryCtaType } from '../../../../types/shared';
import { ReminderStatus } from '../../utils/reminders';

const containerStyles = css`
    background-color: ${brandAlt[400]};
`;

const BannerDecorator = (Story: Story): JSX.Element => (
    <div css={containerStyles}>
        <Story />
    </div>
);

export default {
    component: ContributionsBannerReminderSignedIn,
    title: 'Banners/ContributionsBannerReminderSignedIn',
    args: {
        reminderCta: {
            type: SecondaryCtaType.ContributionsReminder,
            reminderFields: {
                reminderCta: 'Remind me in May',
                reminderLabel: 'May 2021',
                reminderPeriod: '2021-05-01',
            },
        },
        reminderStatus: ReminderStatus.Editing,
    },
    decorators: [BannerDecorator],
} as Meta;

const Template: Story<ContributionsBannerReminderSignedInProps> = (
    props: ContributionsBannerReminderSignedInProps,
) => <ContributionsBannerReminderSignedIn {...props} />;

export const Default = Template.bind({});

export const Completed = Template.bind({});
Completed.args = {
    reminderStatus: ReminderStatus.Completed,
};

export const Submitting = Template.bind({});
Submitting.args = {
    reminderStatus: ReminderStatus.Submitting,
};

export const Error = Template.bind({});
Error.args = {
    reminderStatus: ReminderStatus.Error,
};
