import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import {
    Button,
    buttonThemeBrandAlt,
    Columns,
    Column,
    Hide,
    TextInput,
    SvgCheckmark,
} from '@guardian/source/react-components';
import { textSans, space, from } from '@guardian/source/foundations';
import { BannerEnrichedReminderCta } from '../common/types';
import { ensureHasPreposition, ReminderStatus } from '../../utils/reminders';
import { useContributionsReminderEmailForm } from '../../../hooks/useContributionsReminderEmailForm';
import { ErrorCopy, InfoCopy, ThankYou } from '../../shared/Reminders';
import type { ReactComponent } from '../../../types';

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

const errorCopyContainerStyles = css`
    margin-top: ${space[1]}px;
`;

const infoCopyContainerStyles = css`
    margin-top: ${space[3]}px;
`;

export interface ContributionsBannerReminderSignedOutProps {
    reminderCta: BannerEnrichedReminderCta;
    reminderStatus: ReminderStatus;
    onReminderSetClick: (email: string) => void;
}

export const ContributionsBannerReminderSignedOut: ReactComponent<
    ContributionsBannerReminderSignedOutProps
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
                            <div css={bodyContainerStyles}>
                                <ThankYou
                                    reminderLabelWithPreposition={reminderLabelWithPreposition}
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
                                    <div css={bodyContainerStyles}>
                                        <ThankYou
                                            reminderLabelWithPreposition={
                                                reminderLabelWithPreposition
                                            }
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
                                    <div css={bodyContainerStyles}>
                                        <ThankYou
                                            reminderLabelWithPreposition={
                                                reminderLabelWithPreposition
                                            }
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
                                <div css={bodyContainerStyles}>
                                    <ThankYou
                                        reminderLabelWithPreposition={reminderLabelWithPreposition}
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
        <div css={bodyContainerStyles}>
            <div css={bodyCopyContainerStyles}>Remind me {reminderDateWithPreposition}</div>
            <form onSubmit={onSubmit} css={formContainerStyles}>
                <div>
                    <TextInput
                        label="Email address"
                        value={email}
                        error={inputError}
                        onChange={updateEmail}
                        width={30}
                    />
                </div>

                <div>
                    <ThemeProvider theme={buttonThemeBrandAlt}>
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
                    <ErrorCopy />
                </div>
            )}

            <div css={infoCopyContainerStyles}>
                <InfoCopy reminderLabelWithPreposition={reminderDateWithPreposition} />
            </div>
        </div>
    );
}
