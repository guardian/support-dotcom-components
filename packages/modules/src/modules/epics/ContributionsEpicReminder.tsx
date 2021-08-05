// --- Imports --- //

import React from 'react';
import { ContributionsEpicReminderSignedIn } from './ContributionsEpicReminderSignedIn';
import { ContributionsEpicReminderSignedOut } from './ContributionsEpicReminderSignedOut';
import { OphanComponentEvent } from '@sdc/shared/types';
import {
    OPHAN_COMPONENT_EVENT_REMINDER_CLOSE,
    OPHAN_COMPONENT_EVENT_REMINDER_SET,
} from './utils/ophan';
import { useContributionsReminderSignup } from '../../hooks/useContributionsReminderSignup';

// --- Types --- //

export interface ContributionsEpicReminderProps {
    initialEmailAddress?: string;
    reminderPeriod: string;
    reminderLabel: string;
    onCloseReminderClick: () => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
}

// --- Components --- //

export const ContributionsEpicReminder: React.FC<ContributionsEpicReminderProps> = ({
    initialEmailAddress,
    reminderLabel,
    reminderPeriod,
    onCloseReminderClick,
    submitComponentEvent,
}: ContributionsEpicReminderProps) => {
    const { reminderStatus, createReminder } = useContributionsReminderSignup(
        reminderPeriod,
        'WEB',
        'EPIC',
        'PRE',
    );

    const onSetReminderClick = (email: string) => {
        if (submitComponentEvent) {
            submitComponentEvent(OPHAN_COMPONENT_EVENT_REMINDER_SET);
        }
        createReminder(email);
    };

    const closeReminder = () => {
        if (submitComponentEvent) {
            submitComponentEvent(OPHAN_COMPONENT_EVENT_REMINDER_CLOSE);
        }
        onCloseReminderClick();
    };

    return initialEmailAddress ? (
        <ContributionsEpicReminderSignedIn
            reminderLabel={reminderLabel}
            reminderStatus={reminderStatus}
            onSetReminderClick={() => onSetReminderClick(initialEmailAddress)}
            onCloseReminderClick={closeReminder}
        />
    ) : (
        <ContributionsEpicReminderSignedOut
            reminderLabel={reminderLabel}
            reminderStatus={reminderStatus}
            onSetReminderClick={onSetReminderClick}
            onCloseReminderClick={closeReminder}
        />
    );
};
