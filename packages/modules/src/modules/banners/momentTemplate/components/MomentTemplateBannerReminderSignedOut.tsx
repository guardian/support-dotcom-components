import { css } from '@emotion/react';
import { Button } from '@guardian/src-button';
import { textSans } from '@guardian/src-foundations/typography';
import { error, neutral, space } from '@guardian/src-foundations';
import { TextInput } from '@guardian/src-text-input';
import React from 'react';
import { Container } from '@guardian/src-layout';
import { BannerEnrichedReminderCta } from '../../common/types';
import { ensureHasPreposition, ReminderStatus } from '../../../utils/reminders';
import { useContributionsReminderEmailForm } from '../../../../hooks/useContributionsReminderEmailForm';
import { SvgCheckmark } from '@guardian/src-icons';
import { from } from '@guardian/src-foundations/mq';
import { CtaSettings } from '../settings';
import { buttonStyles } from '../buttonStyles';

// ---- Component ---- //

export interface MomentTemplateBannerReminderSignedOutProps {
    reminderCta: BannerEnrichedReminderCta;
    reminderStatus: ReminderStatus;
    onReminderSetClick: (email: string) => void;
    setReminderCtaSettings?: CtaSettings;
}

export function MomentTemplateBannerReminderSignedOut({
    reminderCta,
    reminderStatus,
    onReminderSetClick,
    setReminderCtaSettings,
}: MomentTemplateBannerReminderSignedOutProps): JSX.Element {
    return (
        <div css={styles.container}>
            <Container>
                {reminderStatus !== ReminderStatus.Completed && (
                    <Signup
                        reminderLabel={reminderCta.reminderFields.reminderLabel}
                        reminderStatus={reminderStatus}
                        onSubmit={onReminderSetClick}
                        setReminderCtaSettings={setReminderCtaSettings}
                    />
                )}

                {reminderStatus === ReminderStatus.Completed && (
                    <ThankYou reminderLabel={reminderCta.reminderFields.reminderLabel} />
                )}
            </Container>
        </div>
    );
}

// ---- Helper components ---- //

interface SignupProps {
    reminderLabel: string;
    reminderStatus: ReminderStatus;
    onSubmit: (email: string) => void;
    setReminderCtaSettings?: CtaSettings;
}

function Signup({ reminderLabel, reminderStatus, onSubmit, setReminderCtaSettings }: SignupProps) {
    const { email, inputError, updateEmail, handleSubmit } = useContributionsReminderEmailForm();

    const reminderDateWithPreposition = ensureHasPreposition(reminderLabel);

    return (
        <div>
            <header>
                <h3 css={styles.headerCopy}>
                    Remind me to support {reminderDateWithPreposition} please
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
                    <div css={styles.errorCopy}>
                        Sorry we couldn&apos;t set a reminder for you this time. Please try again
                        later.
                    </div>
                )}
            </form>

            <div css={styles.infoCopy}>
                We will send you a maximum of two emails {reminderDateWithPreposition}. To find out
                what personal data we collect and how we use it, view our{' '}
                <a
                    css={styles.privacyLink}
                    href="https://www.theguardian.com/help/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Privacy policy
                </a>
            </div>
        </div>
    );
}

interface ThankYouProps {
    reminderLabel: string;
}

function ThankYou({ reminderLabel }: ThankYouProps) {
    const reminderLabelWithPreposition = ensureHasPreposition(reminderLabel);

    return (
        <div>
            <header>
                <h3 css={styles.thankYouHeaderCopy}>Thank you! Your reminder is set</h3>
            </header>

            <div css={styles.thankYouBodyCopy}>
                We will be in touch to invite you to contribute. Look out for a message in your
                inbox {reminderLabelWithPreposition}. If you have any questions about contributing,
                please <a href="mailto:contribution.support@theguardian.com">contact us</a>
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
    errorCopy: css`
        ${textSans.small({ fontWeight: 'bold' })};
        color: ${error[400]};
        font-style: italic;
        margin-top: ${space[1]}px;
        margin-bottom: 0;
    `,

    infoCopy: css`
        ${textSans.small({})}
        font-size: 12px;

        margin-top: ${space[3]}px;
    `,
    privacyLink: css`
        font-weight: bold;
        color: ${neutral[0]};
    `,
    thankYouHeaderCopy: css`
        ${textSans.small({ fontWeight: 'bold' })}
        margin: 0;
    `,
    thankYouBodyCopy: css`
        ${textSans.small()}
    `,
};
