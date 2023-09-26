import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { Button, buttonReaderRevenueBrand } from '@guardian/src-button';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral, space } from '@guardian/src-foundations';
import { Columns, Column, Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import { TextInput } from '@guardian/src-text-input';
import { SvgCheckmark } from '@guardian/src-icons';
import { BannerEnrichedReminderCta } from '../common/types';
import { ensureHasPreposition, ReminderStatus } from '../../utils/reminders';
import { useContributionsReminderEmailForm } from '../../../hooks/useContributionsReminderEmailForm';
import { ErrorCopy, InfoCopy, ThankYou } from '../../shared/Reminders';
import type { ReactComponent } from '../../../types';

const styles = {
    bodyContainer: (foreColor: string) => css`
        padding: 10px 0;
        box-sizing: border-box;

        ${from.tablet} {
            height: 100%;
        }

        ${from.leftCol} {
            padding: 10px ${space[3]}px;
            margin-left: -9px;
            border-left: 1px solid ${foreColor};
        }

        ${from.wide} {
            margin-left: -10px;
        }
    `,
    bodyCopyContainer: (foreColor: string) => css`
        ${textSans.small({ fontWeight: 'bold' })};
        color: ${foreColor};
    `,
    emailInput: (foreColor: string) => css`
        max-width: 300px;
        ${from.tablet} {
            width: 300px;
        }
        .control-label {
            color: ${foreColor};
            background-color: ${foreColor};
        }
    `,
    reminderBtn: (foreColor: string, backColor: string) => css`
        background-color: ${backColor};
        color: ${foreColor};
        border-style: solid;
        border-color: ${foreColor};
        &:hover {
            background-color: ${foreColor};
            color: ${backColor};
        }
    `,
    infoCopyContainer: (foreColor: string) => css`
        color: ${foreColor};
        margin-top: ${space[3]}px;
    `,
    formContainer: (foreColor: string) => css`
        display: flex;
        flex-direction: column;
        // hack to tweak source text input
        > label {
            div {
                font-size: 13px !important;
                color: ${foreColor};
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
    `,
    errorCopyContainer: css`
        margin-top: ${space[1]}px;
    `,
};

export interface CharityAppealBannerReminderSignedOutProps {
    reminderCta: BannerEnrichedReminderCta;
    reminderStatus: ReminderStatus;
    onReminderSetClick: (email: string) => void;
}

export const CharityAppealBannerReminderSignedOut: ReactComponent<
    CharityAppealBannerReminderSignedOutProps
> = ({ reminderCta, reminderStatus, onReminderSetClick }) => {
    const { email, inputError, updateEmail, handleSubmit } = useContributionsReminderEmailForm();

    const reminderLabelWithPreposition = ensureHasPreposition(
        reminderCta.reminderFields.reminderLabel,
    );

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
                            <div css={styles.bodyContainer(neutral[100])}>
                                <ThankYou
                                    reminderLabelWithPreposition={reminderLabelWithPreposition}
                                    thankyouColor={neutral[100]}
                                    contactUsColor={neutral[46]}
                                />
                            </div>
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
                                    <div css={styles.bodyContainer(neutral[100])}>
                                        <ThankYou
                                            reminderLabelWithPreposition={
                                                reminderLabelWithPreposition
                                            }
                                            thankyouColor={neutral[100]}
                                            contactUsColor={neutral[46]}
                                        />
                                    </div>
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
                                    <div css={styles.bodyContainer(neutral[100])}>
                                        <ThankYou
                                            reminderLabelWithPreposition={
                                                reminderLabelWithPreposition
                                            }
                                            thankyouColor={neutral[100]}
                                            contactUsColor={neutral[46]}
                                        />
                                    </div>
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
                                <div css={styles.bodyContainer(neutral[100])}>
                                    <ThankYou
                                        reminderLabelWithPreposition={reminderLabelWithPreposition}
                                        thankyouColor={neutral[100]}
                                        contactUsColor={neutral[46]}
                                    />
                                </div>
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
    const reminderDateWithPreposition = ensureHasPreposition(reminderLabel);

    return (
        <div css={styles.bodyContainer(neutral[100])}>
            <div css={styles.bodyCopyContainer(neutral[100])}>
                Remind me {reminderDateWithPreposition}
            </div>
            <form onSubmit={onSubmit} css={styles.formContainer(neutral[100])}>
                <TextInput
                    label="Email address"
                    value={email}
                    error={inputError}
                    onChange={updateEmail}
                    cssOverrides={styles.emailInput(neutral[100])}
                />
                <div>
                    <ThemeProvider theme={buttonReaderRevenueBrand}>
                        <Button
                            type="submit"
                            size="small"
                            icon={<SvgCheckmark />}
                            iconSide="right"
                            priority="tertiary"
                            disabled={reminderStatus === ReminderStatus.Submitting}
                            cssOverrides={styles.reminderBtn(neutral[100], '#313433')}
                        >
                            Set a reminder
                        </Button>
                    </ThemeProvider>
                </div>
            </form>

            {reminderStatus === ReminderStatus.Error && (
                <div css={styles.errorCopyContainer}>
                    <ErrorCopy />
                </div>
            )}

            <div css={styles.infoCopyContainer(neutral[100])}>
                <InfoCopy
                    reminderLabelWithPreposition={reminderDateWithPreposition}
                    privacyLinkColor={neutral[46]}
                />
            </div>
        </div>
    );
}
