import React from 'react';
import { useContributionsReminderSignup } from '../../../../hooks/useContributionsReminderSignup';
import { BannerEnrichedReminderCta } from '../../common/types';
import { CtaSettings } from '../settings';
import { AusBrandMomentBannerReminderSignedOut } from './AusBrandMomentBannerReminderSignedOut';

// ---- Component ---- //

export interface AusBrandMomentBannerReminderProps {
    reminderCta: BannerEnrichedReminderCta;
    trackReminderSetClick: () => void;
    setReminderCtaSettings?: CtaSettings;
}

export function AusBrandMomentBannerReminder({
    reminderCta,
    trackReminderSetClick,
    setReminderCtaSettings,
}: AusBrandMomentBannerReminderProps): JSX.Element {
    const { reminderStatus, createReminder } = useContributionsReminderSignup(
        reminderCta.reminderFields.reminderPeriod,
        'WEB',
        'BANNER',
        'PRE',
        reminderCta.reminderFields.reminderOption,
    );

    const onReminderSetClick = (email: string) => {
        trackReminderSetClick();
        createReminder(email);
    };

    return (
        <AusBrandMomentBannerReminderSignedOut
            reminderCta={reminderCta}
            reminderStatus={reminderStatus}
            onReminderSetClick={onReminderSetClick}
            setReminderCtaSettings={setReminderCtaSettings}
        />
    );
}
