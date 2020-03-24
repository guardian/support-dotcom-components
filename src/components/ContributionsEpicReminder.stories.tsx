import React, { ReactElement } from 'react';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import testData from './ContributionsEpic.testData';

export default {
    component: ContributionsEpicReminder,
    title: 'Components/ContributionsEpicReminder',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <ContributionsEpicReminder
                reminderDate={text(
                    'reminderDate',
                    testData.content.showReminderFields.reminderDate,
                )}
                reminderDateAsString={text(
                    'reminderDateAsString',
                    testData.content.showReminderFields.reminderDateAsString,
                )}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Epic Reminder in default state' };
