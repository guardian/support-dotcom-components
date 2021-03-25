// --- Imports --- //

import React, { useState } from 'react';
import { addCookie } from '../../../lib/cookies';
import { OneOffSignupRequest } from '../../../api/supportRemindersApi';
import { ContributionsEpicReminderSignedIn } from './ContributionsEpicReminderSignedIn';
import { ContributionsEpicReminderSignedOut } from './ContributionsEpicReminderSignedOut';

// --- Utils --- //

const dateDiff = (start: Date, end: Date): number => {
    const twentyFourHours = 86400000;
    return Math.round((end.valueOf() - start.valueOf()) / twentyFourHours);
};

const addContributionReminderCookie = (reminderDateString: string): void => {
    const today = new Date();
    const reminderDate = new Date(Date.parse(reminderDateString));

    addCookie('gu_epic_contribution_reminder', '1', dateDiff(today, reminderDate));
};

const createOneOffReminderEndpoint = 'https://support.theguardian.com/reminders/create/one-off';

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

const REMINDER_PLATFORM = 'WEB';
const REMINDER_COMPONENT = 'EPIC';
const REMINDER_STAGE = 'PRE';

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
        fetch(createOneOffReminderEndpoint, {
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
