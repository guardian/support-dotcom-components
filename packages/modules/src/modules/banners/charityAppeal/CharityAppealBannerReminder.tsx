import React from 'react';
import { BannerEnrichedReminderCta } from '../common/types';
import { CharityAppealBannerReminderSignedIn } from './CharityAppealBannerReminderSignedIn';
import { CharityAppealBannerReminderSignedOut } from './CharityAppealBannerReminderSignedOut';
import { useContributionsReminderSignup } from '../../../hooks/useContributionsReminderSignup';

export interface CharityAppealBannerReminderProps {
    reminderCta: BannerEnrichedReminderCta;
    trackReminderSetClick: () => void;
    onReminderCloseClick: () => void;
    email?: string;
}

export const CharityAppealBannerReminder: React.FC<CharityAppealBannerReminderProps> = ({
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
                <CharityAppealBannerReminderSignedIn
                    reminderCta={reminderCta}
                    reminderStatus={reminderStatus}
                    onReminderSetClick={() => onReminderSetClick(email)}
                    onReminderCloseClick={onReminderCloseClick}
                />
            ) : (
                <CharityAppealBannerReminderSignedOut
                    reminderCta={reminderCta}
                    reminderStatus={reminderStatus}
                    onReminderSetClick={onReminderSetClick}
                />
            )}
        </div>
    );
};
