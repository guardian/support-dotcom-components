import React from 'react';
import { Story, Meta } from '@storybook/react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import {
    ContributionsEpicReminderSignedIn,
    ContributionsEpicReminderSignedInProps,
} from './ContributionsEpicReminderSignedIn';

const epicContainerStyles = css`
    margin: 3em auto;
    padding: 0 10px;
    max-width: 620px;

    ${from.mobileLandscape} {
        padding: 0 20px;
    }
`;

export default {
    component: ContributionsEpicReminderSignedIn,
    title: 'Epics/ContributionsEpicReminderSignedIn',
    args: {
        reminderLabel: 'May',
        reminderStatus: 'EDITING',
    },
    decorators: [
        Story => (
            <div css={epicContainerStyles}>
                <Story />
            </div>
        ),
    ],
} as Meta;

const Template: Story<ContributionsEpicReminderSignedInProps> = (
    props: ContributionsEpicReminderSignedInProps,
) => <ContributionsEpicReminderSignedIn {...props} />;

export const Default = Template.bind({});
