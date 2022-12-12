import React, { useRef, useEffect } from 'react';
import { commonStyles } from './CharityAppealBannerCommonStyles';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { CharityAppealBannerCta } from './CharityAppealBannerCta';
import { CharityAppealBannerSecondaryCta } from './CharityAppealBannerSecondaryCta';
import { CharityAppealBannerCloseButton } from './CharityAppealBannerCloseButton';
import { CharityAppealBannerReminder } from './CharityAppealBannerReminder';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerRenderedContent } from '../common/types';
import { createBannerBodyCopy } from '../common/BannerText';

const styles = {
    container: (isReminderOpen: boolean, foreColor: string) => css`
        ${from.tablet} {
            display: none;
        }
        border-top: 1px solid ${foreColor};
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
    headingContainer: (backgroundColor: string, foreColor: string) => css`
        position: sticky;
        top: 0;
        background-color: ${foreColor};
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid ${backgroundColor};
        padding: 6px 12px 10px 12px;
    `,
    reminderAndLineContainer: css`
        position: relative;
        margin-top: ${space[2]}px;
    `,
    reminderContainer: css`
        padding: 0 ${space[3]}px;
    `,
    reminderLine: (backgroundColor: string, foreColor: string) => css`
        border-top: 1px solid ${foreColor};
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
            border-bottom-color: ${foreColor};
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
            border-bottom-color: ${backgroundColor};
        }
    `,
    hide: css`
        display: none;
    `,
    show: css`
        display: block;
    `,
};

interface CharityAppealBannerMobileProps {
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

export const getCharityAppealBannerMobile = (
    backgroundColor: string,
    foreColor: string,
): React.FC<CharityAppealBannerMobileProps> => ({
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
}: CharityAppealBannerMobileProps) => {
    const reminderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (reminderRef.current && isReminderOpen) {
            reminderRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [reminderRef.current, isReminderOpen]);

    return (
        <div css={styles.container(isReminderOpen, foreColor)}>
            <div css={styles.headingContainer(foreColor, backgroundColor)}>
                <div css={styles.heading}>{content.heading}</div>
                <CharityAppealBannerCloseButton onCloseClick={onCloseClick} />
            </div>
            <div css={[commonStyles.copy, styles.copy]}>
                {content.subheading && <div css={styles.subheading}>{content.subheading}</div>}
                {createBannerBodyCopy(content.paragraphs, content.highlightedText, commonStyles)}
                {children}
            </div>

            <div css={styles.ctasContainer}>
                {content.primaryCta && (
                    <div css={styles.ctaContainer}>
                        <CharityAppealBannerCta
                            onContributeClick={onContributeClick}
                            ctaText={content.primaryCta.ctaText}
                            ctaUrl={content.primaryCta.ctaUrl}
                            stacked={true}
                        />
                    </div>
                )}

                {content.secondaryCta && (
                    <div>
                        <CharityAppealBannerSecondaryCta
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
                        <div css={styles.reminderLine(backgroundColor, foreColor)}></div>

                        <div css={styles.reminderContainer}>
                            <CharityAppealBannerReminder
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

export const CharityAppealBannerMobile = getCharityAppealBannerMobile('#313433', neutral[100]);
