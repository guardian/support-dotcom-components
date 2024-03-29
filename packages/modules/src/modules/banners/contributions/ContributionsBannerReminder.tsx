import React from 'react';
import { BannerEnrichedReminderCta } from '../common/types';
import { ContributionsBannerReminderSignedIn } from './ContributionsBannerReminderSignedIn';
import { ContributionsBannerReminderSignedOut } from './ContributionsBannerReminderSignedOut';
import { useContributionsReminderSignup } from '../../../hooks/useContributionsReminderSignup';
import type { ReactComponent } from '../../../types';

export interface ContributionsBannerReminderProps {
    reminderCta: BannerEnrichedReminderCta;
    trackReminderSetClick: () => void;
    onReminderCloseClick: () => void;
    email?: string;
}

export const ContributionsBannerReminder: ReactComponent<ContributionsBannerReminderProps> = ({
    reminderCta,
    trackReminderSetClick,
    onReminderCloseClick,
    email,
}) => {
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
        <div>
            {email ? (
                <ContributionsBannerReminderSignedIn
                    reminderCta={reminderCta}
                    reminderStatus={reminderStatus}
                    onReminderSetClick={() => onReminderSetClick(email)}
                    onReminderCloseClick={onReminderCloseClick}
                />
            ) : (
                <ContributionsBannerReminderSignedOut
                    reminderCta={reminderCta}
                    reminderStatus={reminderStatus}
                    onReminderSetClick={onReminderSetClick}
                />
            )}
        </div>
    );
};
