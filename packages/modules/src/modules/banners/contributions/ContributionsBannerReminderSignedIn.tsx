import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import {
    Button,
    buttonThemeBrandAlt,
    Columns,
    Column,
    Hide,
    SvgCheckmark,
} from '@guardian/source-react-components';
import { textSans, space, from } from '@guardian/source-foundations';
import { BannerEnrichedReminderCta } from '../common/types';
import { ensureHasPreposition, ReminderStatus } from '../../utils/reminders';
import { ErrorCopy, InfoCopy, ThankYou } from '../../shared/Reminders';
import type { ReactComponent } from '../../../types';

const bodyContainerStyles = css`
    padding: 10px 0;
    box-sizing: border-box;

    ${from.tablet} {
        height: 100%;
    }

    ${from.leftCol} {
        margin-left: -9px;
        padding: 10px ${space[3]}px;
        border-left: 1px solid black;
    }

    ${from.wide} {
        margin-left: -10px;
    }
`;

const ctaContainerStyles = css`
    padding: 10px 0 0;

    ${from.tablet} {
        padding: 10px 0;
    }
`;

const secondaryCtaContainerStyles = css`
    margin-left: ${space[4]}px;
`;

const bodyCopyContainerStyles = css`
    ${textSans.small({ fontWeight: 'bold' })}
`;

const errorCopyContainerStyles = css`
    margin-top: ${space[1]}px;
`;

const infoCopyContainerStyles = css`
    margin-top: ${space[3]}px;
`;

export interface ContributionsBannerReminderSignedInProps {
    reminderCta: BannerEnrichedReminderCta;
    reminderStatus: ReminderStatus;
    onReminderSetClick: () => void;
    onReminderCloseClick: () => void;
}

export const ContributionsBannerReminderSignedIn: ReactComponent<
    ContributionsBannerReminderSignedInProps
> = ({ reminderCta, reminderStatus, onReminderSetClick, onReminderCloseClick }) => {
    const reminderDateWithPreposition = ensureHasPreposition(
        reminderCta.reminderFields.reminderLabel,
    );

    const Body = () => (
        <div css={bodyContainerStyles}>
            {reminderStatus !== ReminderStatus.Completed && (
                <>
                    <div css={bodyCopyContainerStyles}>
                        Show your support for the Guardian at a later date. To make this easier, set
                        a reminder and we&apos;ll email you in May.
                    </div>

                    {reminderStatus === ReminderStatus.Error && (
                        <div css={errorCopyContainerStyles}>
                            <ErrorCopy />
                        </div>
                    )}

                    <div css={infoCopyContainerStyles}>
                        <InfoCopy reminderLabelWithPreposition={reminderDateWithPreposition} />
                    </div>
                </>
            )}

            {reminderStatus === ReminderStatus.Completed && (
                <ThankYou reminderLabelWithPreposition={reminderDateWithPreposition} />
            )}
        </div>
    );

    const Ctas = () => (
        <div css={ctaContainerStyles}>
            <div>
                <ThemeProvider theme={buttonThemeBrandAlt}>
                    <div>
                        <Button
                            onClick={onReminderSetClick}
                            size="small"
                            priority="tertiary"
                            icon={<SvgCheckmark />}
                            iconSide="right"
                            disabled={reminderStatus === ReminderStatus.Submitting}
                        >
                            Set a reminder
                        </Button>
                    </div>

                    <div css={secondaryCtaContainerStyles}>
                        <Button onClick={onReminderCloseClick} priority="subdued">
                            Not now
                        </Button>
                    </div>
                </ThemeProvider>
            </div>
        </div>
    );

    return (
        <>
            <Hide above="tablet">
                <Columns>
                    <Column width={1}>
                        <Body />
                        {reminderStatus !== ReminderStatus.Completed && <Ctas />}
                    </Column>
                </Columns>
            </Hide>

            <Hide below="tablet">
                <Hide above="leftCol">
                    <Columns>
                        <Column width={8 / 12}>
                            <Body />
                        </Column>
                        <Column width={4 / 12}>
                            {reminderStatus !== ReminderStatus.Completed && <Ctas />}
                        </Column>
                    </Columns>
                </Hide>
            </Hide>

            <Hide below="leftCol">
                <Hide above="wide">
                    <Columns>
                        <Column width={2 / 14}> </Column>
                        <Column width={8 / 14}>
                            <Body />
                        </Column>
                        <Column width={4 / 14}>
                            {reminderStatus !== ReminderStatus.Completed && <Ctas />}
                        </Column>
                    </Columns>
                </Hide>
            </Hide>

            <Hide below="wide">
                <Columns>
                    <Column width={3 / 16}> </Column>
                    <Column width={8 / 16}>
                        <Body />
                    </Column>
                    <Column width={4 / 16}>
                        {reminderStatus !== ReminderStatus.Completed && <Ctas />}
                    </Column>
                    <Column width={1 / 16}> </Column>
                </Columns>
            </Hide>
        </>
    );
};
