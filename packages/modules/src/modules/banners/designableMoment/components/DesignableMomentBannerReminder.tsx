import React from 'react';
import { useContributionsReminderSignup } from '../../../../hooks/useContributionsReminderSignup';
import { BannerEnrichedReminderCta } from '../../common/types';
import { CtaSettings } from '../settings';
import { DesignableMomentBannerReminderSignedOut } from './DesignableMomentBannerReminderSignedOut';

export interface DesignableMomentBannerReminderProps {
    reminderCta: BannerEnrichedReminderCta;
    trackReminderSetClick: () => void;
    setReminderCtaSettings?: CtaSettings;
    mobileReminderRef: React.RefObject<HTMLDivElement> | null;
}

export function DesignableMomentBannerReminder({
    reminderCta,
    trackReminderSetClick,
    setReminderCtaSettings,
    mobileReminderRef,
}: DesignableMomentBannerReminderProps): JSX.Element {
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
        <div ref={mobileReminderRef}>
            <DesignableMomentBannerReminderSignedOut
                reminderCta={reminderCta}
                reminderStatus={reminderStatus}
                onReminderSetClick={onReminderSetClick}
                setReminderCtaSettings={setReminderCtaSettings}
            />
        </div>
    );
}
