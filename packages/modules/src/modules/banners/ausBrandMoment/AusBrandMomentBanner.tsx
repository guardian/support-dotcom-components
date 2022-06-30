import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Container, Hide } from '@guardian/src-layout';
import { BannerRenderProps } from '../common/types';
import { AusBrandMomentBannerHeader } from './components/AusBrandMomentBannerHeader';
import { AusBrandMomentBannerArticleCount } from './components/AusBrandMomentBannerArticleCount';
import { AusBrandMomentBannerBody } from './components/AusBrandMomentBannerBody';
import { AusBrandMomentBannerCtas } from './components/AusBrandMomentBannerCtas';
import { AusBrandMomentBannerCloseButton } from './components/AusBrandMomentBannerCloseButton';
import { AusBrandMomentBannerVisual } from './components/AusBrandMomentBannerVisual';
import { BannerTemplateSettings } from './settings';
import { from } from '@guardian/src-foundations/mq';
import { SecondaryCtaType } from '@sdc/shared/types';
import { AusBrandMomentBannerReminder } from './components/AusBrandMomentBannerReminder';

// ---- Banner ---- //

export function getAusBrandMomentBanner(
    templateSettings: BannerTemplateSettings,
): React.FC<BannerRenderProps> {
    function AusBrandMomentBanner({
        content,
        onCloseClick,
        numArticles,
        onCtaClick,
        onSecondaryCtaClick,
        reminderTracking,
    }: BannerRenderProps): JSX.Element {
        const [isReminderActive, setIsReminderActive] = useState(false);

        const onReminderCtaClick = () => {
            reminderTracking.onReminderCtaClick();
            setIsReminderActive(!isReminderActive);
        };

        const mobileReminderRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (mobileReminderRef.current && isReminderActive) {
                mobileReminderRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, [mobileReminderRef.current, isReminderActive]);

        return (
            <div css={styles.outerContainer(templateSettings.backgroundColour)}>
                <Container
                    cssOverrides={styles.mobileStickyHeaderContainer(
                        templateSettings.backgroundColour,
                        content.mobileContent.secondaryCta?.type ===
                            SecondaryCtaType.ContributionsReminder,
                    )}
                >
                    <div css={styles.closeButtonContainer}>
                        <Hide below="mobileMedium">
                            <AusBrandMomentBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </Hide>
                    </div>

                    <div css={styles.visualContainer}>
                        <AusBrandMomentBannerVisual settings={templateSettings.imageSettings} />
                    </div>

                    <div css={styles.headerContainer}>
                        <AusBrandMomentBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent.heading}
                        />

                        <Hide above="mobileMedium" cssOverrides={styles.mobileCloseButtonContainer}>
                            <AusBrandMomentBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </Hide>
                    </div>
                </Container>

                <Container cssOverrides={styles.containerOverrides}>
                    <div css={styles.container}>
                        <div css={styles.closeButtonContainer}>
                            <Hide below="tablet">
                                <AusBrandMomentBannerCloseButton
                                    onCloseClick={onCloseClick}
                                    settings={templateSettings.closeButtonSettings}
                                />
                            </Hide>
                        </div>

                        <div css={styles.desktopVisualContainer}>
                            <AusBrandMomentBannerVisual settings={templateSettings.imageSettings} />
                        </div>

                        <div css={styles.contentContainer}>
                            <div css={styles.desktopHeaderContainer}>
                                <AusBrandMomentBannerHeader
                                    heading={content.mainContent.heading}
                                    mobileHeading={content.mobileContent.heading}
                                />
                            </div>

                            {numArticles !== undefined && numArticles > 5 && (
                                <div css={styles.articleCountContainer}>
                                    <AusBrandMomentBannerArticleCount
                                        numArticles={numArticles}
                                        settings={templateSettings}
                                    />
                                </div>
                            )}

                            <div css={styles.bodyContainer}>
                                <AusBrandMomentBannerBody
                                    mainContent={content.mainContent}
                                    mobileContent={content.mobileContent}
                                    highlightedTextSettings={
                                        templateSettings.highlightedTextSettings
                                    }
                                />
                            </div>

                            <section css={styles.ctasContainer}>
                                <AusBrandMomentBannerCtas
                                    mainContent={content.mainContent}
                                    mobileContent={content.mobileContent}
                                    onPrimaryCtaClick={onCtaClick}
                                    onSecondaryCtaClick={onSecondaryCtaClick}
                                    onReminderCtaClick={onReminderCtaClick}
                                    primaryCtaSettings={templateSettings.primaryCtaSettings}
                                    secondaryCtaSettings={templateSettings.secondaryCtaSettings}
                                />
                            </section>
                        </div>
                    </div>
                </Container>

                <Hide above="tablet">
                    <div ref={mobileReminderRef}>
                        {content.mobileContent.secondaryCta?.type ===
                            SecondaryCtaType.ContributionsReminder &&
                            isReminderActive && (
                                <AusBrandMomentBannerReminder
                                    reminderCta={content.mobileContent.secondaryCta}
                                    trackReminderSetClick={reminderTracking.onReminderSetClick}
                                    setReminderCtaSettings={templateSettings.setReminderCtaSettings}
                                />
                            )}
                    </div>
                </Hide>

                <Hide below="tablet">
                    {content.mainContent.secondaryCta?.type ===
                        SecondaryCtaType.ContributionsReminder &&
                        isReminderActive && (
                            <AusBrandMomentBannerReminder
                                reminderCta={content.mainContent.secondaryCta}
                                trackReminderSetClick={reminderTracking.onReminderSetClick}
                                setReminderCtaSettings={templateSettings.setReminderCtaSettings}
                            />
                        )}
                </Hide>
            </div>
        );
    }

    return AusBrandMomentBanner;
}

// ---- Styles ---- //

const styles = {
    outerContainer: (background: string) => css`
        background: ${background};
        max-height: 100vh;
        overflow: auto;

        * {
            box-sizing: border-box;
        }

        ${from.tablet} {
            border-top: 1px solid ${neutral[0]};
        }
    `,
    containerOverrides: css`
        position: relative;
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
    `,
    container: css`
        overflow: hidden;
        display: flex;
        flex-direction: column;

        ${from.tablet} {
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
    `,
    mobileStickyHeaderContainer: (background: string, hasReminderCta: boolean) => css`
        background: ${background};
        position: sticky;
        top: 0px;
        z-index: 100;
        border-top: 1px solid ${neutral[0]};
        padding-top: ${space[2]}px;

        ${hasReminderCta
            ? `
                border-bottom: 1px solid ${neutral[0]};
                padding-bottom: ${space[2]}px;
            `
            : ''}

        ${from.tablet} {
            display: none;
        }
    `,
    visualContainer: css`
        display: none;

        ${from.mobileMedium} {
            display: block;
        }
        ${from.tablet} {
            display: none;
        }
    `,
    desktopVisualContainer: css`
        display: none;

        ${from.tablet} {
            display: block;
            width: 238px;
            margin-left: ${space[3]}px;
        }
        ${from.desktop} {
            width: 320px;
            margin-left: ${space[5]}px;
        }
        ${from.leftCol} {
            width: 370px;
            margin-left: ${space[9]}px;
        }
    `,
    contentContainer: css`
        ${from.tablet} {
            width: 450px;
        }
        ${from.desktop} {
            width: 600px;
        }
        ${from.leftCol} {
            width: 700px;
        }
        ${from.wide} {
            width: 780px;
        }
    `,
    headerContainer: css`
        display: flex;
        align-items: center;

        ${from.mobileMedium} {
            margin-top: ${space[2]}px;
        }
    `,
    desktopHeaderContainer: css`
        display: none;
        margin-top: ${space[2]}px;

        ${from.tablet} {
            display: block;
        }
    `,
    articleCountContainer: css`
        margin-top: ${space[4]}px;

        ${from.tablet} {
            margin-top: ${space[3]}px;
        }
    `,
    bodyContainer: css`
        margin-top: ${space[1]}px;
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
        margin-top: ${space[5]}px;

        ${from.tablet} {
            margin-top: ${space[6]}px;
        }
    `,
    mobileCloseButtonContainer: css`
        margin-left: ${space[3]}px;
    `,
    closeButtonContainer: css`
        position: absolute;
        top: ${space[2]}px;
        right: ${space[4]}px;
    `,
};
