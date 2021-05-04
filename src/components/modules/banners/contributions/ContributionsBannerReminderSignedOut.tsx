import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { Button, buttonBrandAlt } from '@guardian/src-button';
import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral, error } from '@guardian/src-foundations/palette';
import { Columns, Column, Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import { TextInput } from '@guardian/src-text-input';
import { SvgCheckmark } from '@guardian/src-icons';
import { BannerEnrichedReminderCta } from '../common/types';
import { ReminderStatus } from '../../utils/reminders';
import { useContributionsReminderEmailForm } from '../../../hooks/useContributionsReminderEmailForm';

const bodyContainerStyles = css`
    padding: 10px 0;
    box-sizing: border-box;

    ${from.tablet} {
        height: 100%;
    }

    ${from.leftCol} {
        padding: 10px ${space[3]}px;
        margin-left: -9px;
        border-left: 1px solid black;
    }

    ${from.wide} {
        margin-left: -10px;
    }
`;

const bodyCopyContainerStyles = css`
    ${textSans.small({ fontWeight: 'bold' })}
`;

const formContainerStyles = css`
    display: flex;
    flex-direction: column;

    // hack to tweak source text input
    > label {
        div {
            font-size: 15px !important;
        }

        input {
            height: 36px;
        }
    }

    & > * + * {
        margin-top: ${space[3]}px;
    }

    ${from.tablet} {
        flex-direction: row;
        align-items: flex-end;

        & > * + * {
            margin-top: 0;
            margin-left: ${space[5]}px;
        }
    }
`;

const emailInputStyles = css`
    max-width: 300px;

    ${from.tablet} {
        width: 300px;
    }
`;

const errorCopyContainerStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
    color: ${error[400]};
    font-style: italic;
    margin-top: ${space[1]}px;
    margin-bottom: 0;
`;

const infoCopyContainerStyles = css`
    ${textSans.small({})}
    font-size: 12px;

    margin-top: ${space[3]}px;
`;

const thankyouHeaderStyles = css`
    ${textSans.small({ fontWeight: 'bold' })}
`;

const thankyouBodyStyles = css`
    ${textSans.small({})}
`;

const privacyLinkSyles = css`
    font-weight: bold;
    color: ${neutral[0]};
`;

const contactLinkStyles = css`
    color: ${neutral[0]};
`;

export interface ContributionsBannerReminderSignedOutProps {
    reminderCta: BannerEnrichedReminderCta;
    reminderStatus: ReminderStatus;
    onReminderSetClick: (email: string) => void;
}

export const ContributionsBannerReminderSignedOut: React.FC<ContributionsBannerReminderSignedOutProps> = ({
    reminderCta,
    reminderStatus,
    onReminderSetClick,
}) => {
    const { email, inputError, updateEmail, handleSubmit } = useContributionsReminderEmailForm();

    return (
        <>
            <Hide above="tablet">
                <Columns>
                    <Column width={1}>
                        {reminderStatus !== ReminderStatus.Completed && (
                            <Body
                                onSubmit={handleSubmit(() => onReminderSetClick(email))}
                                email={email}
                                updateEmail={updateEmail}
                                inputError={inputError}
                                reminderLabel={reminderCta.reminderFields.reminderLabel}
                                reminderStatus={reminderStatus}
                            />
                        )}

                        {reminderStatus === ReminderStatus.Completed && (
                            <ThankYou reminderLabel={reminderCta.reminderFields.reminderLabel} />
                        )}
                    </Column>
                </Columns>
            </Hide>

            <Hide below="tablet">
                <Hide above="leftCol">
                    <Columns>
                        {reminderStatus !== ReminderStatus.Completed && (
                            <Column width={1}>
                                <Body
                                    onSubmit={handleSubmit(() => onReminderSetClick(email))}
                                    email={email}
                                    updateEmail={updateEmail}
                                    inputError={inputError}
                                    reminderLabel={reminderCta.reminderFields.reminderLabel}
                                    reminderStatus={reminderStatus}
                                />
                            </Column>
                        )}

                        {reminderStatus === ReminderStatus.Completed && (
                            <>
                                <Column width={9 / 16}>
                                    <ThankYou
                                        reminderLabel={reminderCta.reminderFields.reminderLabel}
                                    />
                                </Column>

                                <Column width={4 / 16}> </Column>
                            </>
                        )}
                    </Columns>
                </Hide>
            </Hide>

            <Hide below="leftCol">
                <Hide above="wide">
                    <Columns>
                        <Column width={2 / 14}> </Column>

                        {reminderStatus !== ReminderStatus.Completed && (
                            <>
                                <Column width={10 / 14}>
                                    <Body
                                        onSubmit={handleSubmit(() => onReminderSetClick(email))}
                                        email={email}
                                        updateEmail={updateEmail}
                                        inputError={inputError}
                                        reminderLabel={reminderCta.reminderFields.reminderLabel}
                                        reminderStatus={reminderStatus}
                                    />
                                </Column>

                                <Column width={2 / 16}> </Column>
                            </>
                        )}

                        {reminderStatus === ReminderStatus.Completed && (
                            <>
                                <Column width={9 / 14}>
                                    <ThankYou
                                        reminderLabel={reminderCta.reminderFields.reminderLabel}
                                    />
                                </Column>

                                <Column width={3 / 14}> </Column>
                            </>
                        )}
                    </Columns>
                </Hide>
            </Hide>

            <Hide below="wide">
                <Columns>
                    <Column width={3 / 16}> </Column>

                    {reminderStatus !== ReminderStatus.Completed && (
                        <Column width={13 / 16}>
                            <Body
                                onSubmit={handleSubmit(() => onReminderSetClick(email))}
                                email={email}
                                updateEmail={updateEmail}
                                inputError={inputError}
                                reminderLabel={reminderCta.reminderFields.reminderLabel}
                                reminderStatus={reminderStatus}
                            />
                        </Column>
                    )}

                    {reminderStatus === ReminderStatus.Completed && (
                        <>
                            <Column width={9 / 16}>
                                <ThankYou
                                    reminderLabel={reminderCta.reminderFields.reminderLabel}
                                />
                            </Column>

                            <Column width={4 / 16}> </Column>
                        </>
                    )}
                </Columns>
            </Hide>
        </>
    );
};

interface BodyProps {
    reminderLabel: string;
    email: string;
    updateEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputError?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    reminderStatus: ReminderStatus;
}

function Body({
    reminderLabel,
    email,
    updateEmail,
    inputError,
    onSubmit,
    reminderStatus,
}: BodyProps) {
    return (
        <div css={bodyContainerStyles}>
            <div css={bodyCopyContainerStyles}>Remind me in {reminderLabel}</div>
            <form onSubmit={onSubmit} css={formContainerStyles}>
                <TextInput
                    label="Email address"
                    value={email}
                    error={inputError}
                    onChange={updateEmail}
                    cssOverrides={emailInputStyles}
                />

                <div>
                    <ThemeProvider theme={buttonBrandAlt}>
                        <Button
                            type="submit"
                            size="small"
                            icon={<SvgCheckmark />}
                            iconSide="right"
                            priority="tertiary"
                            disabled={reminderStatus === ReminderStatus.Submitting}
                        >
                            Set a reminder
                        </Button>
                    </ThemeProvider>
                </div>
            </form>

            {reminderStatus === ReminderStatus.Error && (
                <div css={errorCopyContainerStyles}>
                    Sorry we couldn&apos;t set a reminder for you this time. Please try again later.
                </div>
            )}

            <div css={infoCopyContainerStyles}>
                We will send you a maximum of two emails in {reminderLabel}. To find out what
                personal data we collect and how we use it, view our{' '}
                <a
                    css={privacyLinkSyles}
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
    return (
        <div css={bodyContainerStyles}>
            <div css={thankyouHeaderStyles}>Thank you! Your reminder is set</div>

            <div css={thankyouBodyStyles}>
                We will be in touch to invite you to contribute. Look out for a messsage in your
                inbox in {reminderLabel}. If you have any questions about contributing, please{' '}
                <a href="mailto:contribution.support@theguardian.com" css={contactLinkStyles}>
                    contact us
                </a>
            </div>
        </div>
    );
}
