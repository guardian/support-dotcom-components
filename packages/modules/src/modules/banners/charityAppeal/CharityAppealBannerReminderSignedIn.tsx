import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { Button, buttonReaderRevenueBrand } from '@guardian/src-button';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral, space } from '@guardian/src-foundations';
import { Columns, Column, Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import { SvgCheckmark } from '@guardian/src-icons';
import { BannerEnrichedReminderCta } from '../common/types';
import { ensureHasPreposition, ReminderStatus } from '../../utils/reminders';
import { ErrorCopy, InfoCopy, ThankYou } from '../../shared/Reminders';
import type { ReactComponent } from '../../../types';

const dfltForeColor = neutral[100];

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
        ${textSans.small({ fontWeight: 'bold' })}
        color: ${foreColor};
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
    ctaContainer: css`
        padding: 10px 0 0;

        ${from.tablet} {
            padding: 10px 0;
        }
    `,
    secondaryCtaContainer: (foreColor: string) => css`
        color: ${foreColor};
        margin-left: ${space[4]}px;
    `,
    errorCopyContainer: css`
        margin-top: ${space[1]}px;
    `,
};

export interface CharityAppealBannerReminderSignedInProps {
    reminderCta: BannerEnrichedReminderCta;
    reminderStatus: ReminderStatus;
    onReminderSetClick: () => void;
    onReminderCloseClick: () => void;
}

export const CharityAppealBannerReminderSignedIn: ReactComponent<
    CharityAppealBannerReminderSignedInProps
> = ({ reminderCta, reminderStatus, onReminderSetClick, onReminderCloseClick }) => {
    const reminderDateWithPreposition = ensureHasPreposition(
        reminderCta.reminderFields.reminderLabel,
    );

    const Body = () => (
        <div css={styles.bodyContainer(dfltForeColor)}>
            {reminderStatus !== ReminderStatus.Completed && (
                <>
                    <div css={styles.bodyCopyContainer(dfltForeColor)}>
                        Show your support for the Guardian at a later date. To make this easier, set
                        a reminder and we&apos;ll email you in May.
                    </div>

                    {reminderStatus === ReminderStatus.Error && (
                        <div css={styles.errorCopyContainer}>
                            <ErrorCopy />
                        </div>
                    )}

                    <div css={styles.infoCopyContainer(dfltForeColor)}>
                        <InfoCopy
                            reminderLabelWithPreposition={reminderDateWithPreposition}
                            privacyLinkColor={neutral[46]}
                        />
                    </div>
                </>
            )}

            {reminderStatus === ReminderStatus.Completed && (
                <ThankYou
                    reminderLabelWithPreposition={reminderDateWithPreposition}
                    thankyouColor={dfltForeColor}
                    contactUsColor={neutral[46]}
                />
            )}
        </div>
    );

    const Ctas = () => (
        <div css={styles.ctaContainer}>
            <div>
                <ThemeProvider theme={buttonReaderRevenueBrand}>
                    <div>
                        <Button
                            onClick={onReminderSetClick}
                            size="small"
                            priority="tertiary"
                            icon={<SvgCheckmark />}
                            iconSide="right"
                            disabled={reminderStatus === ReminderStatus.Submitting}
                            cssOverrides={styles.reminderBtn(dfltForeColor, '#313433')}
                        >
                            Set a reminder
                        </Button>
                    </div>
                </ThemeProvider>
                <div>
                    <Button
                        onClick={onReminderCloseClick}
                        priority="subdued"
                        cssOverrides={styles.secondaryCtaContainer(dfltForeColor)}
                    >
                        Not now
                    </Button>
                </div>
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
