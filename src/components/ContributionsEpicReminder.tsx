import React from 'react';
import { css } from 'emotion';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { ReminderFields } from '../lib/variants';
import { GuardianLines } from './GuardianLines';
import { TextInput } from '@guardian/src-text-input';
import { Button } from '@guardian/src-button';
import { SvgArrowRightStraight, SvgClose } from '@guardian/src-svgs';

const rootStyles = css`
    [data-target='success'] {
        display: none;
    }

    [data-target='error'] {
        display: none;
    }

    &.success [data-target='success'] {
        display: block;
    }

    &.success [data-target='form'] {
        display: none;
    }

    &.success [data-target='close'] {
        display: none !important;
    }

    &.invalid [data-target='input'] {
        border: 4px solid ${palette.error.main};
        color: ${palette.error.main};
    }

    &.submitting [data-target='submit'] {
        pointer-events: none;
        color: ${palette.neutral[60]};
        background-color: ${palette.neutral[93]};
        border: 1px solid ${palette.neutral[86]};
    }

    &.error [data-target='error'] {
        display: block;
    }

    * {
        box-sizing: border-box;
    }
`;

const checkboxStyles = css`
    display: none;

    + [data-target='toggle'] [data-target='close'] {
        display: none;
    }

    :checked ~ [data-target='pane'] {
        display: block;
    }

    :checked + [data-target='toggle'] [data-target='close'] {
        display: block;
    }

    :checked + [data-target='toggle'] [data-target='open'] {
        display: none;
    }
`;

const toggleStyles = css`
    display: block;
    position: relative;
    text-align: right;
    padding-right: ${space[4]}px;
`;

const openButtonStyles = css`
    ${textSans.medium({
        fontWeight: 'bold',
    })};
    text-decoration: underline;
    cursor: pointer;
`;

const closeButtonStyles = css`
    width: 30px;
    height: 30px;
    cursor: pointer;
    position: absolute;
    bottom: -47px;
    right: 0;
`;

const paneStyles = css`
    display: none;
`;

const lineWrapperStyles = css`
    margin: ${space[2]}px auto;
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
    ${textSans.small({ fontWeight: 'bold' })};
    font-style: italic;
    margin-top: ${space[1]}px;
`;

const errorTextStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
    color: ${palette.error.main};
    font-style: italic;
    margin-top: ${space[1]}px;
`;

export const ContributionsEpicReminder: React.FC<ReminderFields> = ({
    reminderDate,
    reminderDateAsString,
}: ReminderFields) => {
    const unique = new Date().valueOf();
    return (
        <div data-target={`contributions-epic-reminder`} className={rootStyles}>
            <input id={`epicSwitch${unique}`} type="checkbox" className={checkboxStyles} />
            <label
                htmlFor={`epicSwitch${unique}`}
                className={toggleStyles}
                data-target="toggle"
                tabIndex={0}
            >
                <div data-target="open" className={openButtonStyles}>
                    Not a good time? Remind me later
                </div>
                <div data-target="close" className={closeButtonStyles} tabIndex={0}>
                    <SvgClose />
                </div>
            </label>
            <div className={paneStyles} data-target="pane">
                <div className={lineWrapperStyles}>
                    <GuardianLines />
                </div>
                <div className={containerStyles}>
                    <form data-target="form" data-reminder-date={reminderDate}>
                        <h4 className={remindHeading}>Remind me in {reminderDateAsString}</h4>
                        <div className={formWrapper}>
                            <div className={inputWrapper}>
                                <TextInput label="Email address" data-target="input" />
                            </div>
                            <Button
                                iconSide="right"
                                icon={<SvgArrowRightStraight />}
                                data-target="submit"
                                type="submit"
                            >
                                Set a reminder
                            </Button>
                        </div>
                        <p className={errorTextStyles} data-target="error">
                            We couldn&apos;t set a reminder for you this time. Please try again
                            later.
                        </p>
                        <p className={formTextStyles}>
                            We will use this to send you a single email in {reminderDateAsString}.
                            To find out what personal data we collect and how we use it, please
                            visit our{' '}
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
                    </form>
                    <div data-target="success">
                        <h4 className={remindHeading}>Thank you! Your support is so valuable.</h4>
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
                    </div>
                </div>
            </div>
        </div>
    );
};
