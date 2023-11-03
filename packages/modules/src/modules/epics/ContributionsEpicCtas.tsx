import React, { useState } from 'react';
import { EpicProps } from '@sdc/shared/types';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { ChoiceCardSelection } from '../shared/helpers/choiceCards';
import type { ReactComponent } from '../../types';

interface OnReminderOpen {
    buttonCopyAsString: string;
}

type ContributionsEpicCtasProps = EpicProps & {
    showApplePayButton?: boolean;
    applePayAuthorised?: boolean;
    showChoiceCards?: boolean;
    choiceCardSelection?: ChoiceCardSelection;
    amountsTestName?: string;
    amountsVariantName?: string;
};

export const ContributionsEpicCtas: ReactComponent<ContributionsEpicCtasProps> = ({
    variant,
    countryCode,
    articleCounts,
    tracking,
    submitComponentEvent,
    onReminderOpen,
    fetchEmail,
    showApplePayButton,
    applePayAuthorised,
    showChoiceCards,
    choiceCardSelection,
    amountsTestName,
    amountsVariantName,
}: ContributionsEpicCtasProps): JSX.Element => {
    const [fetchedEmail, setFetchedEmail] = useState<string | undefined>(undefined);
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

                    if (fetchEmail) {
                        fetchEmail().then((resolvedEmail) => {
                            if (resolvedEmail) {
                                setFetchedEmail(resolvedEmail);
                            }
                            setIsReminderActive(true);
                        });
                    } else {
                        setIsReminderActive(true);
                    }
                }}
                submitComponentEvent={submitComponentEvent}
                isReminderActive={isReminderActive}
                isSignedIn={Boolean(fetchedEmail)}
                showApplePayButton={showApplePayButton}
                applePayAuthorised={applePayAuthorised}
                showChoiceCards={showChoiceCards}
                choiceCardSelection={choiceCardSelection}
                amountsTestName={amountsTestName}
                amountsVariantName={amountsVariantName}
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
