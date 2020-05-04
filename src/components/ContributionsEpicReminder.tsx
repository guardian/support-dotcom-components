import React from 'react';
import { css } from 'emotion';
import { headline, textSans, body } from '@guardian/src-foundations/typography/cjs';
import { palette, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq/cjs';
import { ReminderFields } from '../lib/variants';
import { Lines } from '@guardian/src-ed-lines';
import { TextInput } from '@guardian/src-text-input';
import { Button } from '@guardian/src-button';
import { SvgArrowRightStraight, SvgClose } from '@guardian/src-svgs';

const rootStyles = css`
    display: none;
    position: relative;

    &.visible {
        display: block;
    }

    [data-target='epic-success'] {
        display: none;
    }

    [data-target='epic-error'] {
        display: none;
    }

    &.success [data-target='epic-success'] {
        display: block;
    }

    &.success [data-target='epic-form'] {
        display: none;
    }

    &.success [data-target='epic-close'] {
        display: none !important;
    }

    &.invalid [data-target='epic-input'] {
        border: 4px solid ${palette.error.main};
        color: ${palette.error.main};
    }

    &.submitting [data-target='epic-submit'] {
        pointer-events: none;
        color: ${palette.neutral[60]};
        background-color: ${palette.neutral[93]};
        border: 1px solid ${palette.neutral[86]};
    }

    &.error [data-target='epic-error'] {
        display: block;
    }

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
`;

export const ContributionsEpicReminder: React.FC<ReminderFields> = ({
    reminderCTA,
    reminderDate,
    reminderDateAsString,
}: ReminderFields) => (
    <div className={rootStyles} data-target="epic-reminder" data-button-copy={reminderCTA}>
        <div data-target="epic-close" className={closeButtonStyles} tabIndex={0}>
            <SvgClose />
        </div>

        <div className={lineWrapperStyles}>
            <Lines />
        </div>
        <div className={containerStyles}>
            <form data-target="epic-form" data-reminder-date={reminderDate}>
                <h4 className={remindHeading}>Remind me in {reminderDateAsString}</h4>
                <div className={formWrapper}>
                    <div className={inputWrapper}>
                        <TextInput label="Email address" data-target="epic-input" />
                    </div>
                    <Button
                        iconSide="right"
                        icon={<SvgArrowRightStraight />}
                        data-target="epic-submit"
                        type="submit"
                    >
                        Set a reminder
                    </Button>
                </div>
                <p className={errorTextStyles} data-target="epic-error">
                    Sorry we couldn&apos;t set a reminder for you this time. Please try again later.
                </p>
                <p className={formTextStyles}>
                    We will use this to send you a single email in {reminderDateAsString}. To find
                    out what personal data we collect and how we use it, please visit our{' '}
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
            <div data-target="epic-success">
                <h4 className={remindHeading}>Thank you! Your reminder is set.</h4>
                <p className={successTextStyles}>
                    We will be in touch to invite you to contribute. Look out for a message in your
                    inbox in {reminderDateAsString}. If you have any questions about contributing,
                    please{' '}
                    <a href="mailto:contribution.support@theguardian.com" className={linkStyles}>
                        contact us
                    </a>
                    .
                </p>
            </div>
        </div>
    </div>
);
