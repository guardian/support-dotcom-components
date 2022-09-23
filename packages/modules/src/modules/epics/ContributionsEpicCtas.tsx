import React, { useState } from 'react';
import { EpicProps } from '@sdc/shared/types';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { defineFetchEmail } from '../shared/helpers/definedFetchEmail';

interface OnReminderOpen {
    buttonCopyAsString: string;
}

export const ContributionsEpicCtas: React.FC<EpicProps> = ({
    variant,
    countryCode,
    articleCounts,
    tracking,
    submitComponentEvent,
    onReminderOpen,
    email,
    fetchEmail,
}: EpicProps): JSX.Element | null => {
    const [fetchedEmail, setFetchedEmail] = useState<string | undefined>(undefined);
    const fetchEmailDefined = defineFetchEmail(email, fetchEmail);
    const [isReminderActive, setIsReminderActive] = useState(false);
    const showReminderFields = variant.showReminderFields;
    const onCloseReminderClick = () => {
        setIsReminderActive(false);
    };

    return (
        <>
            <ContributionsEpicButtons
                variant={variant}
                tracking={tracking}
                countryCode={countryCode}
                onOpenReminderClick={(): void => {
                    const buttonCopyAsString = showReminderFields?.reminderCta
                        .toLowerCase()
                        .replace(/\s/g, '-');

                    // This callback lets the platform react to the user interaction with the
                    // 'Remind me' button
                    if (onReminderOpen) {
                        onReminderOpen({
                            buttonCopyAsString,
                        } as OnReminderOpen);
                    }

                    fetchEmailDefined().then(resolvedEmail => {
                        if (resolvedEmail) {
                            setFetchedEmail(resolvedEmail);
                        }
                        setIsReminderActive(true);
                    });
                }}
                submitComponentEvent={submitComponentEvent}
                isReminderActive={isReminderActive}
                isSignedIn={Boolean(fetchedEmail)}
                showChoiceCards={false}
                choiceCardSelection={undefined}
                numArticles={articleCounts.for52Weeks}
            />

            {isReminderActive && showReminderFields && (
                <ContributionsEpicReminder
                    initialEmailAddress={fetchedEmail}
                    reminderFields={showReminderFields}
                    onCloseReminderClick={onCloseReminderClick}
                    submitComponentEvent={submitComponentEvent}
                />
            )}
        </>
    );
};
