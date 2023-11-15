// --- Imports --- //

import React from 'react';
// move to DCR
import { ContributionsEpicReminderSignedIn } from './ContributionsEpicReminderSignedIn';
// move to DCR
import { ContributionsEpicReminderSignedOut } from './ContributionsEpicReminderSignedOut';
// shared
import { OphanComponentEvent } from '@sdc/shared/types';
// move to DCR
import {
    OPHAN_COMPONENT_EVENT_REMINDER_CLOSE,
    OPHAN_COMPONENT_EVENT_REMINDER_SET,
} from './utils/ophan';
// move to DCR
import { useContributionsReminderSignup } from '../../hooks/useContributionsReminderSignup';
// shared
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
