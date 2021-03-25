// --- Imports --- //

import React, { useState } from 'react';
import { OneOffSignupRequest } from '../../../api/supportRemindersApi';
import { ContributionsEpicReminderSignedIn } from './ContributionsEpicReminderSignedIn';
import { ContributionsEpicReminderSignedOut } from './ContributionsEpicReminderSignedOut';
import { addContributionReminderCookie } from './utils/reminders';

// --- Types --- //

export interface ContributionsEpicReminderProps {
    initialEmailAddress?: string;
    reminderPeriod: string;
    reminderLabel: string;
    onCloseReminderClick: () => void;
}

export enum ReminderStatus {
    Editing = 'Editing',
    Submitting = 'Submitting',
    Error = 'Error',
    Completed = 'Completed',
}

// --- Consts --- //

const CREATE_ONE_OFF_REMINDER_ENDPOINT = 'https://support.theguardian.com/reminders/create/one-off';

const REMINDER_PLATFORM = 'WEB';
const REMINDER_COMPONENT = 'EPIC';
const REMINDER_STAGE = 'PRE';

// --- Components --- //

export const ContributionsEpicReminder: React.FC<ContributionsEpicReminderProps> = ({
    initialEmailAddress,
    reminderLabel,
    reminderPeriod,
    onCloseReminderClick,
}: ContributionsEpicReminderProps) => {
    const [reminderStatus, setReminderStatus] = useState<ReminderStatus>(ReminderStatus.Editing);

    const setReminder = (emailAddress: string): void => {
        const reminderSignupData: OneOffSignupRequest = {
            email: emailAddress,
            reminderPeriod,
            reminderPlatform: REMINDER_PLATFORM,
            reminderComponent: REMINDER_COMPONENT,
            reminderStage: REMINDER_STAGE,
        };

        setReminderStatus(ReminderStatus.Submitting);
        fetch(CREATE_ONE_OFF_REMINDER_ENDPOINT, {
            body: JSON.stringify(reminderSignupData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    setReminderStatus(ReminderStatus.Error);
                } else {
                    setReminderStatus(ReminderStatus.Completed);
                    addContributionReminderCookie(reminderPeriod);
                }
            })
            .catch(() => setReminderStatus(ReminderStatus.Error));
    };

    return initialEmailAddress ? (
        <ContributionsEpicReminderSignedIn
            reminderLabel={reminderLabel}
            reminderStatus={reminderStatus}
            onSetReminderClick={() => setReminder(initialEmailAddress)}
            onCloseReminderClick={onCloseReminderClick}
        />
    ) : (
        <ContributionsEpicReminderSignedOut
            reminderLabel={reminderLabel}
            reminderStatus={reminderStatus}
            onSetReminderClick={setReminder}
            onCloseReminderClick={onCloseReminderClick}
        />
    );
};
