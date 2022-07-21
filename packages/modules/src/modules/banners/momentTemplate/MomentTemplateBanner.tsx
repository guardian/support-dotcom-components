import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Container, Hide } from '@guardian/src-layout';
import { BannerRenderProps } from '../common/types';
import { MomentTemplateBannerHeader } from './components/MomentTemplateBannerHeader';
import { MomentTemplateBannerArticleCount } from './components/MomentTemplateBannerArticleCount';
import { MomentTemplateBannerBody } from './components/MomentTemplateBannerBody';
import { MomentTemplateBannerCtas } from './components/MomentTemplateBannerCtas';
import { MomentTemplateBannerCloseButton } from './components/MomentTemplateBannerCloseButton';
import { MomentTemplateBannerVisual } from './components/MomentTemplateBannerVisual';
import { BannerTemplateSettings } from './settings';
import { from } from '@guardian/src-foundations/mq';
import { SecondaryCtaType } from '@sdc/shared/types';
import { MomentTemplateBannerReminder } from './components/MomentTemplateBannerReminder';

// ---- Banner ---- //

export function getMomentTemplateBanner(
    templateSettings: BannerTemplateSettings,
): React.FC<BannerRenderProps> {
    function MomentTemplateBanner({
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
                            <MomentTemplateBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </Hide>
                    </div>

                    <div
                        css={
                            templateSettings.mobileVisualContainerOverride ?? styles.visualContainer
                        }
                    >
                        <MomentTemplateBannerVisual settings={templateSettings.imageSettings} />
                    </div>

                    <div css={styles.headerContainer}>
                        <MomentTemplateBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent.heading}
                            settings={templateSettings.headerBackground}
                        />

                        <Hide above="mobileMedium" cssOverrides={styles.mobileCloseButtonContainer}>
                            <MomentTemplateBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </Hide>
                    </div>
                </Container>

                <Container
                    cssOverrides={styles.containerOverrides(
                        templateSettings.removeContainerPaddingRight,
                    )}
                >
                    <div css={styles.container}>
                        <div css={styles.closeButtonContainer}>
                            <Hide below="tablet">
                                <MomentTemplateBannerCloseButton
                                    onCloseClick={onCloseClick}
                                    settings={templateSettings.closeButtonSettings}
                                />
                            </Hide>
                        </div>

                        <div
                            css={
                                templateSettings.desktopVisualContainerOverride ??
                                styles.desktopVisualContainer
                            }
                        >
                            <MomentTemplateBannerVisual settings={templateSettings.imageSettings} />
                        </div>

                        <div css={styles.contentContainer}>
                            <div css={styles.desktopHeaderContainer}>
                                <MomentTemplateBannerHeader
                                    heading={content.mainContent.heading}
                                    mobileHeading={content.mobileContent.heading}
                                    settings={templateSettings.headerBackground}
                                />
                            </div>

                            {numArticles !== undefined && numArticles > 5 && (
                                <div css={styles.articleCountContainer}>
                                    <MomentTemplateBannerArticleCount
                                        numArticles={numArticles}
                                        settings={templateSettings}
                                    />
                                </div>
                            )}

                            <div css={styles.bodyContainer}>
                                <MomentTemplateBannerBody
                                    mainContent={content.mainContent}
                                    mobileContent={content.mobileContent}
                                    highlightedTextSettings={
                                        templateSettings.highlightedTextSettings
                                    }
                                />
                            </div>

                            <section css={styles.ctasContainer}>
                                <MomentTemplateBannerCtas
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
                                <MomentTemplateBannerReminder
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
                            <MomentTemplateBannerReminder
                                reminderCta={content.mainContent.secondaryCta}
                                trackReminderSetClick={reminderTracking.onReminderSetClick}
                                setReminderCtaSettings={templateSettings.setReminderCtaSettings}
                            />
                        )}
                </Hide>
            </div>
        );
    }

    return MomentTemplateBanner;
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
    containerOverrides: (removeContainerPaddingRight?: boolean) => css`
        position: relative;
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
        ${removeContainerPaddingRight
            ? `
            div {
                ${from.tablet} {
                    padding-right: 0;
                }
            }`
            : ''};
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
