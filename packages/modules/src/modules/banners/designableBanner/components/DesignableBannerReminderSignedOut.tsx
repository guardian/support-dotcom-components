import { css } from '@emotion/react';
import { Button, TextInput } from '@guardian/source-react-components';
import { textSans, space, from } from '@guardian/source-foundations';
import React from 'react';
import { BannerEnrichedReminderCta } from '../../common/types';
import { ensureHasPreposition, ReminderStatus } from '../../../utils/reminders';
import { useContributionsReminderEmailForm } from '../../../../hooks/useContributionsReminderEmailForm';
import { CtaSettings } from '../settings';
import { buttonStyles } from '../styles/buttonStyles';
import { ErrorCopy, InfoCopy, ThankYou } from '../../../shared/Reminders';

// ---- Component ---- //

export interface DesignableBannerReminderSignedOutProps {
    reminderCta: BannerEnrichedReminderCta;
    reminderStatus: ReminderStatus;
    onReminderSetClick: (email: string) => void;
    setReminderCtaSettings?: CtaSettings;
}

export function DesignableBannerReminderSignedOut({
    reminderCta,
    reminderStatus,
    onReminderSetClick,
    setReminderCtaSettings,
}: DesignableBannerReminderSignedOutProps): JSX.Element {
    const reminderLabelWithPreposition = ensureHasPreposition(
        reminderCta.reminderFields.reminderLabel,
    );

    return (
        <>
            {reminderStatus === ReminderStatus.Completed ? (
                <ThankYou reminderLabelWithPreposition={reminderLabelWithPreposition} />
            ) : (
                <Signup
                    reminderLabelWithPreposition={reminderLabelWithPreposition}
                    reminderStatus={reminderStatus}
                    onSubmit={onReminderSetClick}
                    setReminderCtaSettings={setReminderCtaSettings}
                />
            )}
        </>
    );
}

// ---- Helper components ---- //

interface SignupProps {
    reminderLabelWithPreposition: string;
    reminderStatus: ReminderStatus;
    onSubmit: (email: string) => void;
    setReminderCtaSettings?: CtaSettings;
}

function Signup({
    reminderLabelWithPreposition,
    reminderStatus,
    onSubmit,
    setReminderCtaSettings,
}: SignupProps) {
    const { email, inputError, updateEmail, handleSubmit } = useContributionsReminderEmailForm();

    return (
        <>
            <header>
                <h3 css={styles.headerCopy}>
                    Remind me to support {reminderLabelWithPreposition} please
                </h3>
            </header>

            <form css={styles.form} onSubmit={handleSubmit(() => onSubmit(email))}>
                <TextInput
                    label="Email address"
                    hideLabel
                    onChange={updateEmail}
                    error={inputError}
                    value={email}
                    width={30}
                    placeholder="Enter your email"
                />

                <div css={styles.ctaContainer}>
                    <Button
                        type="submit"
                        iconSide="right"
                        priority="primary"
                        disabled={reminderStatus === ReminderStatus.Submitting}
                        cssOverrides={css`
                            ${styles.button}
                            ${setReminderCtaSettings && buttonStyles(setReminderCtaSettings)}
                        `}
                    >
                        Set reminder
                    </Button>
                </div>

                {reminderStatus === ReminderStatus.Error && (
                    <div css={styles.errorCopyContainer}>
                        <ErrorCopy />
                    </div>
                )}
            </form>

            <div css={styles.infoCopyContainer}>
                <InfoCopy reminderLabelWithPreposition={reminderLabelWithPreposition} />
            </div>
        </>
    );
}

// ---- Styles ---- //

const styles = {
    headerCopy: css`
        ${textSans.medium({ fontWeight: 'bold' })};
        margin: 0;
    `,
    form: css`
        margin-top: ${space[2]}px;

        display: flex;
        flex-direction: column;

        ${from.tablet} {
            flex-direction: row;
            align-items: flex-end;
        }

        > input {
            min-width: 100%;

            ${from.tablet} {
                min-width: auto;
            }
        }
    `,
    ctaContainer: css`
        margin-top: ${space[3]}px;

        ${from.tablet} {
            margin-top: 0;
            margin-left: ${space[3]}px;
        }
    `,
    errorCopyContainer: css`
        margin-top: ${space[1]}px;
    `,
    infoCopyContainer: css`
        margin-top: ${space[3]}px;
    `,
    button: css`
        width: 100%;
        justify-content: center;

        ${from.tablet} {
            width: auto;
        }
    `,
};
