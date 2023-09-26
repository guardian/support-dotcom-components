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
import { ReminderFields } from '@sdc/shared/dist/lib';
import type { ReactComponent } from '../../types';

// --- Types --- //

export interface ContributionsEpicReminderProps {
    initialEmailAddress?: string;
    reminderFields: ReminderFields;
    onCloseReminderClick: () => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
}

// --- Components --- //

export const ContributionsEpicReminder: ReactComponent<ContributionsEpicReminderProps> = ({
    initialEmailAddress,
    reminderFields,
    onCloseReminderClick,
    submitComponentEvent,
}: ContributionsEpicReminderProps) => {
    const { reminderStatus, createReminder } = useContributionsReminderSignup(
        reminderFields.reminderPeriod,
        'WEB',
        'EPIC',
        'PRE',
        reminderFields.reminderOption,
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
            reminderLabel={reminderFields.reminderLabel}
            reminderStatus={reminderStatus}
            onSetReminderClick={() => onSetReminderClick(initialEmailAddress)}
            onCloseReminderClick={closeReminder}
        />
    ) : (
        <ContributionsEpicReminderSignedOut
            reminderLabel={reminderFields.reminderLabel}
            reminderStatus={reminderStatus}
            onSetReminderClick={onSetReminderClick}
            onCloseReminderClick={closeReminder}
        />
    );
};
