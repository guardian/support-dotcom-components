import { css } from '@emotion/react';
import { Button } from '@guardian/src-button';
import { textSans } from '@guardian/source-foundations';
import { neutral, space } from '@guardian/source-foundations';
import { TextInput } from '@guardian/src-text-input';
import React from 'react';
import { Container } from '@guardian/src-layout';
import { BannerEnrichedReminderCta } from '../../common/types';
import { ensureHasPreposition, ReminderStatus } from '../../../utils/reminders';
import { useContributionsReminderEmailForm } from '../../../../hooks/useContributionsReminderEmailForm';
import { SvgCheckmark } from '@guardian/src-icons';
import { from } from '@guardian/source-foundations';
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
        <div css={styles.container}>
            <Container>
                {reminderStatus !== ReminderStatus.Completed && (
                    <Signup
                        reminderLabelWithPreposition={reminderLabelWithPreposition}
                        reminderStatus={reminderStatus}
                        onSubmit={onReminderSetClick}
                        setReminderCtaSettings={setReminderCtaSettings}
                    />
                )}

                {reminderStatus === ReminderStatus.Completed && (
                    <ThankYou reminderLabelWithPreposition={reminderLabelWithPreposition} />
                )}
            </Container>
        </div>
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
        <div>
            <header>
                <h3 css={styles.headerCopy}>
                    Remind me to support {reminderLabelWithPreposition} please
                </h3>
            </header>

            <form css={styles.form} onSubmit={handleSubmit(() => onSubmit(email))}>
                <TextInput
                    label="Email address"
                    onChange={updateEmail}
                    error={inputError}
                    value={email}
                    width={30}
                />

                <div css={styles.ctaContainer}>
                    <Button
                        type="submit"
                        icon={<SvgCheckmark />}
                        iconSide="right"
                        priority="tertiary"
                        disabled={reminderStatus === ReminderStatus.Submitting}
                        cssOverrides={
                            setReminderCtaSettings && buttonStyles(setReminderCtaSettings)
                        }
                    >
                        Set a reminder
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
        </div>
    );
}

// ---- Styles ---- //

const styles = {
    container: css`
        border-top: 2px solid ${neutral[0]};

        padding-top: ${space[2]}px;
        padding-bottom: ${space[5]}px;
    `,
    headerCopy: css`
        ${textSans.medium()};
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
};
