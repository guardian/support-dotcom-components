import React, { useState, useEffect, useRef } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Container, Hide } from '@guardian/src-layout';
import { BannerId, BannerRenderProps } from '../common/types';
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
import MomentTemplateBannerTicker from './components/MomentTemplateBannerTicker';

// ---- CSS Styling Helpers ---- //
const getDesktopVisualContainerStyle = (
    bannerId?: BannerId,
): SerializedStyles | SerializedStyles[] => {
    switch (bannerId) {
        case 'us-eoy-giving-tues-banner':
            return [styles.desktopVisualContainer, styles.desktopGivingTuesVisualContainer];

        case 'global-new-year-banner':
            return [styles.desktopVisualContainer, styles.desktopVisualContainerNY];

        case 'us-eoy-banner-v3':
            return styles.desktopUsEoyV3Container;

        default:
            return styles.desktopVisualContainer;
    }
};

const getMobileVisualContainerStyle = (
    bannerId?: BannerId,
): SerializedStyles | SerializedStyles[] =>
    bannerId === 'us-eoy-giving-tues-banner'
        ? [styles.mobileVisualContainer, styles.mobileVisualContainerGivingTues]
        : styles.mobileVisualContainer;

const getHeaderContainerStyle = (bannerId?: BannerId): SerializedStyles | SerializedStyles[] =>
    bannerId === 'us-eoy-banner-v3'
        ? [styles.headerContainer, styles.headerContainerUsEoyV3]
        : styles.headerContainer;

// ---- Banner ---- //
export function getMomentTemplateBanner(
    templateSettings: BannerTemplateSettings,
): React.FC<BannerRenderProps> {
    const hasVisual = templateSettings.imageSettings || templateSettings.alternativeVisual;

    function MomentTemplateBanner({
        content,
        onCloseClick,
        numArticles,
        onCtaClick,
        onSecondaryCtaClick,
        reminderTracking,
        separateArticleCount,
        tickerSettings,
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

        const isEoyBanner =
            templateSettings.bannerId === 'us-eoy-banner' ||
            templateSettings.bannerId === 'us-eoy-giving-tues-banner' ||
            templateSettings.bannerId === 'us-eoy-banner-v3';

        return (
            <div css={styles.outerContainer(templateSettings.containerSettings.backgroundColour)}>
                <Container
                    cssOverrides={styles.mobileStickyHeaderContainer(
                        templateSettings.containerSettings.backgroundColour,
                        content.mobileContent.secondaryCta?.type ===
                            SecondaryCtaType.ContributionsReminder,
                        templateSettings.containerSettings.paddingTop,
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

                    {hasVisual && (
                        <div css={getMobileVisualContainerStyle(templateSettings.bannerId)}>
                            {templateSettings.imageSettings && (
                                <MomentTemplateBannerVisual
                                    settings={templateSettings.imageSettings}
                                    bannerId={templateSettings.bannerId}
                                />
                            )}
                            {templateSettings.alternativeVisual}
                        </div>
                    )}

                    <div css={getHeaderContainerStyle(templateSettings.bannerId)}>
                        <MomentTemplateBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent.heading}
                            headerSettings={templateSettings.headerSettings}
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
                    <div css={styles.container}>
                        <div css={styles.closeButtonContainer}>
                            <Hide below="tablet">
                                <MomentTemplateBannerCloseButton
                                    onCloseClick={onCloseClick}
                                    settings={templateSettings.closeButtonSettings}
                                />
                            </Hide>
                        </div>

                        {hasVisual && (
                            <div css={getDesktopVisualContainerStyle(templateSettings.bannerId)}>
                                {templateSettings.imageSettings && (
                                    <MomentTemplateBannerVisual
                                        settings={templateSettings.imageSettings}
                                        bannerId={templateSettings.bannerId}
                                    />
                                )}
                                {templateSettings.alternativeVisual}
                            </div>
                        )}

                        <div css={styles.contentContainer}>
                            <div css={styles.desktopHeaderContainer}>
                                <MomentTemplateBannerHeader
                                    heading={content.mainContent.heading}
                                    mobileHeading={content.mobileContent.heading}
                                    headerSettings={templateSettings.headerSettings}
                                />
                            </div>

                            {separateArticleCount && numArticles !== undefined && numArticles > 5 && (
                                <div css={styles.articleCountContainer}>
                                    <MomentTemplateBannerArticleCount
                                        numArticles={numArticles}
                                        settings={templateSettings}
                                        textColour={templateSettings.articleCountTextColour}
                                    />
                                </div>
                            )}

                            <div css={isEoyBanner ? styles.eoyBodyContainer : styles.bodyContainer}>
                                <MomentTemplateBannerBody
                                    mainContent={content.mainContent}
                                    mobileContent={content.mobileContent}
                                    highlightedTextSettings={
                                        templateSettings.highlightedTextSettings
                                    }
                                />
                            </div>

                            {tickerSettings?.tickerData &&
                                templateSettings.tickerStylingSettings && (
                                    <MomentTemplateBannerTicker
                                        tickerSettings={tickerSettings}
                                        stylingSettings={templateSettings.tickerStylingSettings}
                                    />
                                )}

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
    mobileStickyHeaderContainer: (
        background: string,
        hasReminderCta: boolean,
        paddingTop?: string,
    ) => css`
        background: ${background};
        position: sticky;
        top: 0px;
        z-index: 100;
        border-top: 1px solid ${neutral[0]};
        padding-top: ${paddingTop ?? space[2]}px;

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
    mobileVisualContainer: css`
        display: none;
        pointer-events: none;

        ${from.mobileMedium} {
            display: block;
        }
        ${from.tablet} {
            display: none;
        }
    `,
    mobileVisualContainerGivingTues: css`
        max-height: 180px;
        overflow: hidden;
        margin-left: -${space[5]}px;
        margin-right: -${space[5]}px;
    `,
    desktopVisualContainer: css`
        display: none;
        pointer-events: none;
        position: relative;

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
    desktopVisualContainerNY: css`
        ${from.tablet} {
            width: 500px;
        }
        ${from.desktop} {
            width: 520px;
        }
        ${from.leftCol} {
            width: 540px;
        }
    `,
    desktopGivingTuesVisualContainer: css`
        ${from.tablet} {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `,
    desktopUsEoyV3Container: css`
        display: none;
        pointer-events: none;
        position: relative;

        ${from.tablet} {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 238px;
            margin-left: ${space[3]}px;
        }
        ${from.desktop} {
            align-items: flex-end;
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
    headerContainerUsEoyV3: css`
        justify-content: space-between;
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
    eoyBodyContainer: css`
        margin-top: ${space[4]}px;
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
