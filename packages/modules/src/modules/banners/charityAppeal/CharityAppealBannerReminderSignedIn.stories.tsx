import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    CharityAppealBannerReminderSignedIn,
    CharityAppealBannerReminderSignedInProps,
} from './CharityAppealBannerReminderSignedIn';
import { css } from '@emotion/react';
import { SecondaryCtaType } from '@sdc/shared/types';
import { ReminderStatus } from '../../utils/reminders';

const containerStyles = css`
    background-color: ${'#313433'};
`;

const BannerDecorator = (Story: Story): JSX.Element => (
    <div css={containerStyles}>
        <Story />
    </div>
);

export default {
    component: CharityAppealBannerReminderSignedIn,
    title: 'Banners/CharityAppeal/BannerReminderSignedIn',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
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

const Template: Story<CharityAppealBannerReminderSignedInProps> = (
    props: CharityAppealBannerReminderSignedInProps,
) => <CharityAppealBannerReminderSignedIn {...props} />;

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
