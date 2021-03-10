import React, { useState } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Lines } from '../../Lines';
import { TextInput } from '@guardian/src-text-input';
import { Button } from '@guardian/src-button';
import { SvgArrowRightStraight, SvgCross } from '@guardian/src-icons';
import { addCookie } from '../../../lib/cookies';
import { OneOffSignupRequest, setOneOffReminderEndpoint } from '../../../api/supportRemindersApi';

const rootStyles = css`
    position: relative;

    * {
        box-sizing: border-box;
    }
`;

const closeButtonStyles = css`
    width: 30px;
    height: 30px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 0;
    background: none;
    border: none;
    padding: 0;
`;

const lineWrapperStyles = css`
    margin: ${space[3]}px auto;
`;

const containerStyles = css`
    padding: 0 ${space[1]}px;
`;

const remindHeading = css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    margin: 0 ${space[5]}px ${space[2]}px 0;
`;

const successTextStyles = css`
    margin: 0 auto ${space[2]}px;
    ${body.medium()};
`;

const linkStyles = css`
    color: ${palette.neutral[7]};
`;

const formWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ${from.tablet} {
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
    }
`;

const inputWrapper = css`
    width: 100%;
    margin-bottom: ${space[2]}px;
    flex-grow: 1;

    ${from.tablet} {
        width: auto;
        margin-right: ${space[2]}px;
        margin-bottom: 0;
    }
`;

const formTextStyles = css`
    ${textSans.small()};
    font-style: italic;
    margin-top: ${space[1]}px;
`;

const errorTextStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
    color: ${palette.error[400]};
    font-style: italic;
    margin-top: ${space[1]}px;
    margin-bottom: 0;
`;

const getCustomSubmitStyles = (isDisabled: boolean): SerializedStyles | undefined => {
    if (isDisabled) {
        // Unfortunately these overrides need !important as otherwise they'll lose
        // the specificity war against the default Source styles.
        return css`
            pointer-events: none;
            color: ${palette.neutral[60]} !important;
            background-color: ${palette.neutral[93]} !important;
            border: 1px solid ${palette.neutral[86]} !important;
        `;
    }

    return undefined;
};

const isValidEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

interface ContributionsEpicReminderProps {
    reminderPeriod: string;
    reminderLabel: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onCloseReminderClick: Function;
}

const REMINDER_PLATFORM = 'WEB';
const REMINDER_COMPONENT = 'EPIC';
const REMINDER_STAGE = 'PRE';

const dateDiff = (start: Date, end: Date): number => {
    const twentyFourHours = 86400000;
    return Math.round((end.valueOf() - start.valueOf()) / twentyFourHours);
};

const addContributionReminderCookie = (reminderDateString: string): void => {
    const today = new Date();
    const reminderDate = new Date(Date.parse(reminderDateString));

    addCookie('gu_epic_contribution_reminder', '1', dateDiff(today, reminderDate));
};

const PREPOSITION_REGEX = /^(on|in)/;

const containsPreposition = (text: string): boolean => PREPOSITION_REGEX.test(text);

const addPreposition = (text: string): string => 'in ' + text;

const ensureHasPreposition = (text: string): string =>
    containsPreposition(text) ? text : addPreposition(text);

export const ContributionsEpicReminder: React.FC<ContributionsEpicReminderProps> = ({
    reminderLabel,
    reminderPeriod,
    onCloseReminderClick,
}: ContributionsEpicReminderProps) => {
    const [isDirty, setIsDirty] = useState(false);
    const [isSubmittingState, setIsSubmittingState] = useState(false);
    const [isErrorState, setIsErrorState] = useState(false);
    const [isSuccessState, setIsSuccessState] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');

    const isEmpty = emailAddress.trim().length === 0;
    const isValid = isValidEmail(emailAddress);

    const reminderSignupData: OneOffSignupRequest = {
        email: emailAddress,
        reminderPeriod,
        reminderPlatform: REMINDER_PLATFORM,
        reminderComponent: REMINDER_COMPONENT,
        reminderStage: REMINDER_STAGE,
    };
    const submitForm = (): Promise<Response> => {
        return fetch(setOneOffReminderEndpoint(), {
            body: JSON.stringify(reminderSignupData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    let inputError;
    if (isDirty && isEmpty) {
        inputError = 'Please enter your email address';
    } else if (isDirty && !isValid) {
        inputError = 'Please enter a valid email address';
    }

    const reminderDateWithPreposition = ensureHasPreposition(reminderLabel);

    return (
        <div css={rootStyles}>
            <button css={closeButtonStyles} onClick={(): void => onCloseReminderClick()}>
                <SvgCross />
            </button>

            <div css={lineWrapperStyles}>
                <Lines />
            </div>

            <div css={containerStyles}>
                <form
                    onSubmit={(e): void => {
                        if (isValid) {
                            setIsSubmittingState(true);
                            submitForm()
                                .then(response => {
                                    if (!response.ok) {
                                        throw Error(response.statusText);
                                    }
                                    addContributionReminderCookie(reminderPeriod);
                                    setIsSuccessState(true);
                                })
                                .catch((): void => setIsErrorState(true))
                                .finally((): void => setIsSubmittingState(false));
                        }
                        setIsDirty(true);
                        e.preventDefault();
                    }}
                >
                    {!isSuccessState && (
                        <>
                            <h4 css={remindHeading}>Remind me {reminderDateWithPreposition}</h4>
                            <div css={formWrapper}>
                                <div css={inputWrapper}>
                                    <TextInput
                                        label="Email address"
                                        error={inputError}
                                        value={emailAddress}
                                        onChange={(e): void =>
                                            setEmailAddress(e.currentTarget.value)
                                        }
                                    />
                                </div>
                                <Button
                                    iconSide="right"
                                    icon={<SvgArrowRightStraight />}
                                    type="submit"
                                    disabled={isSubmittingState}
                                    css={getCustomSubmitStyles(isSubmittingState)}
                                >
                                    Set a reminder
                                </Button>
                            </div>
                        </>
                    )}

                    {isErrorState && (
                        <p css={errorTextStyles}>
                            Sorry we couldn&apos;t set a reminder for you this time. Please try
                            again later.
                        </p>
                    )}
                </form>

                {!isSuccessState && (
                    <p css={formTextStyles}>
                        We will send you a maximum of two emails {reminderDateWithPreposition}. To
                        find out what personal data we collect and how we use it, view our{' '}
                        <a
                            css={linkStyles}
                            href="https://www.theguardian.com/help/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                )}

                {isSuccessState && (
                    <>
                        <h4 css={remindHeading}>Thank you! Your reminder is set.</h4>
                        <p css={successTextStyles}>
                            We will be in touch to invite you to contribute. Look out for a message
                            in your inbox {reminderDateWithPreposition}. If you have any questions
                            about contributing, please{' '}
                            <a href="mailto:contribution.support@theguardian.com" css={linkStyles}>
                                contact us
                            </a>
                            .
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};
