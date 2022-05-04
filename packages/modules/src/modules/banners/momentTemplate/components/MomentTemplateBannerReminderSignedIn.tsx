import React from 'react';
import { css } from '@emotion/react';
import { Button } from '@guardian/src-button';
import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral, error } from '@guardian/src-foundations/palette';
import { Container } from '@guardian/src-layout';
import { SvgCheckmark } from '@guardian/src-icons';
import { BannerEnrichedReminderCta } from '../../common/types';
import { ensureHasPreposition, ReminderStatus } from '../../../utils/reminders';
import { CtaSettings } from '../settings';
import { buttonStyles } from '../buttonStyles';

export interface MomentTemplateBannerReminderSignedInProps {
    reminderCta: BannerEnrichedReminderCta;
    reminderStatus: ReminderStatus;
    onReminderSetClick: () => void;
    onReminderCloseClick: () => void;
    setReminderCtaSettings?: CtaSettings;
}

// ---- Component ---- //

export function MomentTemplateBannerReminderSignedIn({
    reminderCta,
    reminderStatus,
    onReminderSetClick,
    setReminderCtaSettings,
}: MomentTemplateBannerReminderSignedInProps): JSX.Element {
    const reminderDateWithPreposition = ensureHasPreposition(
        reminderCta.reminderFields.reminderLabel,
    );

    return (
        <div css={styles.container}>
            <Container>
                {reminderStatus !== ReminderStatus.Completed && (
                    <Signup
                        reminderStatus={reminderStatus}
                        onReminderSetClick={onReminderSetClick}
                        reminderDateWithPreposition={reminderDateWithPreposition}
                        setReminderCtaSettings={setReminderCtaSettings}
                    />
                )}

                {reminderStatus === ReminderStatus.Completed && (
                    <ThankYou reminderDateWithPreposition={reminderDateWithPreposition} />
                )}
            </Container>
        </div>
    );
}

// ---- Helper components ---- //

interface SignupProps {
    reminderStatus: ReminderStatus;
    onReminderSetClick: () => void;
    reminderDateWithPreposition: string;
    setReminderCtaSettings?: CtaSettings;
}

function Signup({
    reminderStatus,
    onReminderSetClick,
    reminderDateWithPreposition,
    setReminderCtaSettings,
}: SignupProps) {
    return (
        <div>
            <div css={styles.bodyCopy}>
                Show your support for the Guardian at a later date. To make this easier, set a
                reminder and we&apos;ll email you {reminderDateWithPreposition}.
            </div>

            {reminderStatus === ReminderStatus.Error && (
                <div css={styles.errorCopy}>
                    Sorry we couldn&apos;t set a reminder for you this time. Please try again later.
                </div>
            )}

            <div css={styles.ctaContainer}>
                <Button
                    onClick={onReminderSetClick}
                    size="small"
                    priority="tertiary"
                    icon={<SvgCheckmark />}
                    iconSide="right"
                    disabled={reminderStatus === ReminderStatus.Submitting}
                    cssOverrides={setReminderCtaSettings && buttonStyles(setReminderCtaSettings)}
                >
                    Set a reminder
                </Button>
            </div>

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
    reminderDateWithPreposition: string;
}

function ThankYou({ reminderDateWithPreposition }: ThankYouProps) {
    return (
        <div>
            <div css={styles.thankyouHeader}>Thank you! Your reminder is set</div>

            <div css={styles.thankyouBody}>
                We will be in touch to invite you to contribute. Look out for a message in your
                inbox {reminderDateWithPreposition}. If you have any questions about contributing,
                please{' '}
                <a href="mailto:contribution.support@theguardian.com" css={styles.contactLink}>
                    contact us
                </a>
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
    bodyCopy: css`
        ${textSans.small({ fontWeight: 'bold' })}
    `,
    errorCopy: css`
        ${textSans.small({ fontWeight: 'bold' })};
        color: ${error[400]};
        font-style: italic;
        margin-top: ${space[1]}px;
        margin-bottom: 0;
    `,
    ctaContainer: css`
        margin-top: ${space[3]}px;
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
    contactLink: css`
        color: ${neutral[0]};
    `,
    thankyouHeader: css`
        ${textSans.small({ fontWeight: 'bold' })}
    `,
    thankyouBody: css`
        ${textSans.small({})}
    `,
};
