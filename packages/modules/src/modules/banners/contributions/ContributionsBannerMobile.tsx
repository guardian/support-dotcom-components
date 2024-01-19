import React, { useRef, useEffect } from 'react';
import { commonStyles } from './ContributionsBannerCommonStyles';
import { css } from '@emotion/react';
import { brandAlt, neutral } from '@guardian/source-foundations';
import { from } from '@guardian/source-foundations';
import { space } from '@guardian/source-foundations';
import { headline } from '@guardian/source-foundations';
import { ContributionsBannerCta } from './ContributionsBannerCta';
import { ContributionsBannerSecondaryCta } from './ContributionsBannerSecondaryCta';
import { ContributionsBannerCloseButton } from './ContributionsBannerCloseButton';
import { ContributionsBannerReminder } from './ContributionsBannerReminder';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerRenderedContent } from '../common/types';
import { createBannerBodyCopy } from '../common/BannerText';
import type { ReactComponent } from '../../../types';

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
    subheading: css`
        ${headline.xxxsmall({ fontWeight: 'bold' })};
        padding-top: 6px;
        padding-bottom: 10px;
    `,
    copy: css`
        margin-top: 2px;
        padding: 0 ${space[3]}px;
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: ${space[3]}px;

        & > * + * {
            margin-top: ${space[3]}px;
        }
    `,
    ctaContainer: css`
        > :first-child {
            margin-right: 5px;
        }
        margin-top: 12px;
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
    children?: React.ReactNode;
}

export const ContributionsBannerMobile: ReactComponent<ContributionsBannerMobileProps> = ({
    onContributeClick,
    onSecondaryCtaClick,
    onCloseClick,
    content,
    onReminderCtaClick,
    isReminderOpen,
    onReminderCloseClick,
    trackReminderSetClick,
    email,
    children,
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
                {content.subheading && <div css={styles.subheading}>{content.subheading}</div>}
                {createBannerBodyCopy(content.paragraphs, content.highlightedText, commonStyles)}
                {children}
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
