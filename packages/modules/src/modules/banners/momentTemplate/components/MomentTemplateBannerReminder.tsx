import React from 'react';
import { useContributionsReminderSignup } from '../../../../hooks/useContributionsReminderSignup';
import { BannerEnrichedReminderCta } from '../../common/types';
import { CtaSettings } from '../settings';
import { MomentTemplateBannerReminderSignedOut } from './MomentTemplateBannerReminderSignedOut';

export interface MomentTemplateBannerReminderProps {
    reminderCta: BannerEnrichedReminderCta;
    trackReminderSetClick: () => void;
    setReminderCtaSettings?: CtaSettings;
    mobileReminderRef: React.RefObject<HTMLDivElement> | null;
}

export function MomentTemplateBannerReminder({
    reminderCta,
    trackReminderSetClick,
    setReminderCtaSettings,
    mobileReminderRef,
}: MomentTemplateBannerReminderProps): JSX.Element {
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
            <MomentTemplateBannerReminderSignedOut
                reminderCta={reminderCta}
                reminderStatus={reminderStatus}
                onReminderSetClick={onReminderSetClick}
                setReminderCtaSettings={setReminderCtaSettings}
            />
        </div>
    );
}
