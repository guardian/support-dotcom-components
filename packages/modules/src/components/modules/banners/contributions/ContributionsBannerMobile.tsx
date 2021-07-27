import React, { useRef, useEffect } from 'react';
import { commonStyles } from './ContributionsBannerCommonStyles';
import { css } from '@emotion/react';
import { brandAlt, neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { ContributionsBannerCta } from './ContributionsBannerCta';
import { ContributionsBannerSecondaryCta } from './ContributionsBannerSecondaryCta';
import { ContributionsBannerCloseButton } from './ContributionsBannerCloseButton';
import { BannerRenderedContent } from '../common/types';
import { ContributionsBannerReminder } from './ContributionsBannerReminder';
import { SecondaryCtaType } from '../../../../types/shared';

const styles = {
    container: (isReminderOpen: boolean) => css`
        ${from.tablet} {
            display: none;
        }
        border-top: 1px solid ${neutral[7]};
        max-height: ${isReminderOpen ? '100vh' : '80vh'};
        box-sizing: border-box;
        padding-bottom: ${space[5]}px;
        overflow-y: auto;
        overflow-x: hidden;
    `,
    heading: css`
        ${headline.xxsmall({ fontWeight: 'bold' })};
        max-width: 90%; /* to avoid pushing the close button off screen on mobile devices with extra large font */
    `,
    copy: css`
        margin-top: 2px;
        padding: 0 ${space[3]}px;
    `,
    ctasContainer: css`
        padding: 0 ${space[3]}px;

        & > * + * {
            margin-top: ${space[3]}px;
        }
    `,
    ctaContainer: css`
        > :first-child {
            margin-right: 5px;
        }
        margin-top: 20px;
    `,
    headingContainer: css`
        position: sticky;
        top: 0;
        background-color: ${brandAlt[400]};
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid ${neutral[7]};
        padding: 6px 12px 10px 12px;
    `,
    reminderAndLineContainer: css`
        position: relative;
        margin-top: ${space[2]}px;
    `,
    reminderContainer: css`
        padding: 0 ${space[3]}px;
    `,
    reminderLine: css`
        border-top: 1px solid black;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;

        &:before {
            content: '';
            display: block;
            position: absolute;
            left: 90px;
            bottom: 100%;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-bottom-color: black;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            left: 91px;
            bottom: 100%;
            width: 0;
            height: 0;
            border: 9px solid transparent;
            border-bottom-color: ${brandAlt[400]};
        }
    `,
    hide: css`
        display: none;
    `,
    show: css`
        display: block;
    `,
};

interface ContributionsBannerMobileProps {
    onContributeClick: () => void;
    onSecondaryCtaClick: () => void;
    onCloseClick: () => void;
    content: BannerRenderedContent;
    onReminderCtaClick: () => void;
    onReminderCloseClick: () => void;
    trackReminderSetClick: () => void;
    isReminderOpen: boolean;
    email?: string;
}

export const ContributionsBannerMobile: React.FC<ContributionsBannerMobileProps> = ({
    onContributeClick,
    onSecondaryCtaClick,
    onCloseClick,
    content,
    onReminderCtaClick,
    isReminderOpen,
    onReminderCloseClick,
    trackReminderSetClick,
    email,
}: ContributionsBannerMobileProps) => {
    const reminderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (reminderRef.current && isReminderOpen) {
            reminderRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [reminderRef.current, isReminderOpen]);

    return (
        <div css={styles.container(isReminderOpen)}>
            <div css={styles.headingContainer}>
                <div css={styles.heading}>{content.heading}</div>
                <ContributionsBannerCloseButton onCloseClick={onCloseClick} />
            </div>
            <div css={[commonStyles.copy, styles.copy]}>
                {content.messageText}
                {content.highlightedText && (
                    <>
                        {' '}
                        <span css={commonStyles.highlightedText}>{content.highlightedText}</span>
                    </>
                )}
            </div>

            <div css={styles.ctasContainer}>
                {content.primaryCta && (
                    <div css={styles.ctaContainer}>
                        <ContributionsBannerCta
                            onContributeClick={onContributeClick}
                            ctaText={content.primaryCta.ctaText}
                            ctaUrl={content.primaryCta.ctaUrl}
                            stacked={true}
                        />
                    </div>
                )}

                {content.secondaryCta && (
                    <div>
                        <ContributionsBannerSecondaryCta
                            secondaryCta={content.secondaryCta}
                            onReminderCtaClick={onReminderCtaClick}
                            onCustomCtaClick={onSecondaryCtaClick}
                        />
                    </div>
                )}
            </div>

            <div ref={reminderRef} css={isReminderOpen ? styles.show : styles.hide}>
                {content.secondaryCta?.type === SecondaryCtaType.ContributionsReminder && (
                    <div css={styles.reminderAndLineContainer}>
                        <div css={styles.reminderLine}></div>

                        <div css={styles.reminderContainer}>
                            <ContributionsBannerReminder
                                reminderCta={content.secondaryCta}
                                trackReminderSetClick={trackReminderSetClick}
                                onReminderCloseClick={onReminderCloseClick}
                                email={email}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
