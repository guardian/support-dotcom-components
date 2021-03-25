import React from 'react';
import { Story, Meta } from '@storybook/react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';
import {
    ContributionsEpicReminder,
    ContributionsEpicReminderProps,
} from './ContributionsEpicReminder';

const containerStyles = css`
    margin: 3em auto;
    padding: 0 10px;
    max-width: 620px;

    ${from.mobileLandscape} {
        padding: 0 20px;
    }
`;

const backgroundStyles = css`
    background-color: ${palette.neutral[97]};
`;

export const EpicDecorator = (Story: Story): JSX.Element => (
    <div css={containerStyles}>
        <div css={backgroundStyles}>
            <Story />
        </div>
    </div>
);

export default {
    component: ContributionsEpicReminder,
    title: 'Epics/ContributionsEpicReminder',
    args: {
        reminderPeriod: '2021-05-01',
        reminderLabel: 'May',
    },
    decorators: [EpicDecorator],
    excludeStories: /.*Decorator$/,
} as Meta;

const Template: Story<ContributionsEpicReminderProps> = (props: ContributionsEpicReminderProps) => (
    <ContributionsEpicReminder {...props} />
);

export const SignedIn = Template.bind({});
SignedIn.args = {
    initialEmailAddress: 'test.user@guardian.co.uk',
};

export const SignedOut = Template.bind({});
