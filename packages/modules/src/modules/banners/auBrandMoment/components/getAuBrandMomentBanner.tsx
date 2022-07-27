import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Container, Hide } from '@guardian/src-layout';
import { BannerRenderProps } from '../../common/types';
import { MomentTemplateBannerHeader } from './MomentTemplateBannerHeader';
import { MomentTemplateBannerArticleCount } from './MomentTemplateBannerArticleCount';
import { MomentTemplateBannerBody } from './MomentTemplateBannerBody';
import { MomentTemplateBannerCtas } from './MomentTemplateBannerCtas';
import { MomentTemplateBannerCloseButton } from './MomentTemplateBannerCloseButton';
import { MomentTemplateBannerVisual } from './MomentTemplateBannerVisual';
import { BannerTemplateSettings } from '../settings';
import { from } from '@guardian/src-foundations/mq';

// ---- Banner ---- //

export function getAuBrandMomentBanner(
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
            <div css={styles.outerContainer}>
                <Container
                    cssOverrides={styles.mobileStickyHeaderContainer(
                        templateSettings.backgroundColour,
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

                    <div css={styles.visualContainer}>
                        <MomentTemplateBannerVisual settings={templateSettings.imageSettings} />
                    </div>

                    <div css={styles.headerContainer}>
                        <MomentTemplateBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent.heading}
                        />

                        <Hide above="mobileMedium" cssOverrides={styles.mobileCloseButtonContainer}>
                            <MomentTemplateBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </Hide>
                    </div>
                </Container>

                <Container cssOverrides={styles.containerOverrides}>
                    <div css={styles.closeButtonContainer}>
                        <Hide below="tablet">
                            <MomentTemplateBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </Hide>
                    </div>
                    <div css={styles.container}>
                        <div css={styles.contentContainer}>
                            <div css={styles.desktopHeaderContainer}>
                                <MomentTemplateBannerHeader
                                    heading={content.mainContent.heading}
                                    mobileHeading={content.mobileContent.heading}
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

                        <div css={styles.desktopVisualContainer}>
                            <MomentTemplateBannerVisual settings={templateSettings.imageSettings} />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return MomentTemplateBanner;
}

// ---- Styles ---- //

const styles = {
    outerContainer: css`
        background: #fffdf5;
        max-height: 100vh;
        overflow: auto;

        * {
            box-sizing: border-box;
        }

        ${from.tablet} {
            border-top: 1px solid ${neutral[0]};
            display: flex;
        }
    `,
    containerOverrides: css`
        position: relative;
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
        div {
            ${from.tablet} {
                padding-right: 0;
            }
        }
    `,
    container: css`
        overflow: hidden;
        display: flex;
        flex-direction: column;

        ${from.tablet} {
            display: inline-flex;
            flex-direction: row;
        }
    `,
    mobileStickyHeaderContainer: (background: string) => css`
        background: ${background};
        position: sticky;
        top: 0px;
        z-index: 100;
        border-top: 1px solid ${neutral[0]};
        padding-top: ${space[2]}px;

        ${from.mobileMedium} {
            padding-top: 0;
            div {
                padding-right: 0;
                padding-left: 0;
            }
        }

        ${from.tablet} {
            display: none;
        }
    `,
    visualContainer: css`
        display: none;

        ${from.mobileMedium} {
            display: block;
        }
        ${from.mobileLandscape} {
            display: none;
        }
    `,
    desktopVisualContainer: css`
        display: none;

        ${from.tablet} {
            display: inline-block;
            position: absolute;
            right: 0;
            width: 33%;
        }
        ${from.desktop} {
            width: 41%;
        }
        ${from.leftCol} {
            width: 52%;
        }
        ${from.wide} {
            width: 44%;
        }
    `,
    contentContainer: css`
        ${from.tablet} {
            width: 410px;
        }
        ${from.desktop} {
            width: 590px;
        }
        ${from.leftCol} {
            width: 570px;
        }
        ${from.wide} {
            width: 670px;
        }
    `,
    headerContainer: css`
        display: flex;
        align-items: center;

        ${from.mobileMedium} {
            margin-top: ${space[5]}px;
            margin-left: ${space[3]}px;
        }
    `,
    desktopHeaderContainer: css`
        display: none;

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
        z-index: 5;
    `,
};
