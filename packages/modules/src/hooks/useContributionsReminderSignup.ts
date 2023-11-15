import {
    //shared
    OneOffSignupRequest,
    ReminderComponent,
    ReminderPlatform,
    ReminderStage,
} from '@sdc/shared/dist/types';
import { useState } from 'react';
// move to dcr
import { addContributionReminderCookie, ReminderStatus } from '../modules/utils/reminders';

const CREATE_ONE_OFF_REMINDER_ENDPOINT = 'https://support.theguardian.com/reminders/create/one-off';

interface ContributionsReminderSignup {
    reminderStatus: ReminderStatus;
    createReminder: (email: string) => void;
}

export function useContributionsReminderSignup(
    reminderPeriod: string,
    reminderPlatform: ReminderPlatform,
    reminderComponent: ReminderComponent,
    reminderStage: ReminderStage,
    reminderOption?: string,
): ContributionsReminderSignup {
    const [reminderStatus, setReminderStatus] = useState<ReminderStatus>(ReminderStatus.Editing);

    const createReminder = (email: string): void => {
        const reminderSignupData: OneOffSignupRequest = {
            email,
            reminderPeriod,
            reminderPlatform,
            reminderComponent,
            reminderStage,
            reminderOption,
        };

        setReminderStatus(ReminderStatus.Submitting);
        fetch(CREATE_ONE_OFF_REMINDER_ENDPOINT, {
            body: JSON.stringify(reminderSignupData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    setReminderStatus(ReminderStatus.Error);
                } else {
                    setReminderStatus(ReminderStatus.Completed);
                    addContributionReminderCookie(reminderPeriod);
                }
            })
            .catch(() => setReminderStatus(ReminderStatus.Error));
    };

    return { reminderStatus, createReminder };
}
