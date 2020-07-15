import React, { useState } from 'react';
import { css } from 'emotion';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { ReminderFields } from '../../../lib/variants';
import { Lines } from '@guardian/src-ed-lines'; // TODO remove as too big
import { TextInput } from '@guardian/src-text-input';
import { Button } from '@guardian/src-button';
import { SvgArrowRightStraight, SvgClose } from '@guardian/src-svgs';
import { isProd } from '../../../lib/env';

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
    color: ${palette.error.main};
    font-style: italic;
    margin-top: ${space[1]}px;
    margin-bottom: 0;
`;

const getCustomSubmitStyles = (isDisabled: boolean): string | undefined => {
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

interface Props extends ReminderFields {
    onCloseReminderClick: Function;
}

type ReminderPayload = {
    email: string;
    reminderDate: string;
};

const contributionsReminderUrl = isProd
    ? 'https://contribution-reminders.support.guardianapis.com/remind-me'
    : 'https://contribution-reminders-code.support.guardianapis.com/remind-me';

const submitForm = ({ email, reminderDate }: ReminderPayload): Promise<Response> => {
    return fetch(contributionsReminderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            reminderDate,
            isPreContribution: true,
        }),
    });
};

export const ContributionsEpicReminder: React.FC<Props> = ({
    reminderDate,
    reminderDateAsString,
    onCloseReminderClick,
}: Props) => {
    const [isDirty, setIsDirty] = useState(false);
    const [isSubmittingState, setIsSubmittingState] = useState(false);
    const [isErrorState, setIsErrorState] = useState(false);
    const [isSuccessState, setIsSuccessState] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');

    const isEmpty = emailAddress.trim().length === 0;
    const isValid = isValidEmail(emailAddress);

    let inputError;
    if (isDirty && isEmpty) {
        inputError = 'Please enter your email address';
    } else if (isDirty && !isValid) {
        inputError = 'Please enter a valid email address';
    }

    return (
        <div className={rootStyles}>
            <button className={closeButtonStyles} onClick={(): void => onCloseReminderClick()}>
                <SvgClose />
            </button>

            <div className={lineWrapperStyles}>
                <Lines />
            </div>

            <div className={containerStyles}>
                <form
                    onSubmit={(e): void => {
                        if (isValid) {
                            const formValues: ReminderPayload = {
                                email: emailAddress,
                                reminderDate: reminderDate,
                            };
                            setIsSubmittingState(true);
                            submitForm(formValues)
                                .then(response => {
                                    if (!response.ok) {
                                        throw Error(response.statusText);
                                    }
                                    return response;
                                })
                                .then(response => response.json())
                                .then(json => {
                                    if (json !== 'OK') {
                                        throw Error('Server error');
                                    }
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
                            <h4 className={remindHeading}>Remind me in {reminderDateAsString}</h4>
                            <div className={formWrapper}>
                                <div className={inputWrapper}>
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
                                    className={getCustomSubmitStyles(isSubmittingState)}
                                >
                                    Set a reminder
                                </Button>
                            </div>
                        </>
                    )}

                    {isErrorState && (
                        <p className={errorTextStyles}>
                            Sorry we couldn&apos;t set a reminder for you this time. Please try
                            again later.
                        </p>
                    )}
                </form>

                {!isSuccessState && (
                    <p className={formTextStyles}>
                        We will use this to send you a single email in {reminderDateAsString}. To
                        find out what personal data we collect and how we use it, please visit our{' '}
                        <a
                            className={linkStyles}
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
                        <h4 className={remindHeading}>Thank you! Your reminder is set.</h4>
                        <p className={successTextStyles}>
                            We will be in touch to invite you to contribute. Look out for a message
                            in your inbox in {reminderDateAsString}. If you have any questions about
                            contributing, please{' '}
                            <a
                                href="mailto:contribution.support@theguardian.com"
                                className={linkStyles}
                            >
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
