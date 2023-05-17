import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Container, Hide } from '@guardian/src-layout';
import { BannerEnrichedReminderCta, BannerRenderProps } from '../common/types';
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
import { bannerSpacing } from './styles/templateStyles';
import useReminder from '../../../hooks/useReminder';
import useMediaQuery from '../../../hooks/useMediaQuery';

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
        const { isReminderActive, onReminderCtaClick, mobileReminderRef } = useReminder(
            reminderTracking,
        );

        const isTabletOrAbove = useMediaQuery(from.tablet);

        const mainOrMobileContent = isTabletOrAbove ? 'mainContent' : 'mobileContent';

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
                        <div css={styles.mobileVisualContainer}>
                            {templateSettings.imageSettings && (
                                <MomentTemplateBannerVisual
                                    settings={templateSettings.imageSettings}
                                    bannerId={templateSettings.bannerId}
                                />
                            )}
                            {templateSettings.alternativeVisual}
                        </div>
                    )}

                    <div css={styles.headerContainer}>
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
                            <div css={styles.desktopVisualContainer}>
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

                            {separateArticleCount &&
                                numArticles !== undefined &&
                                numArticles > 5 && (
                                    <MomentTemplateBannerArticleCount
                                        numArticles={numArticles}
                                        settings={templateSettings}
                                        textColour={templateSettings.articleCountTextColour}
                                    />
                                )}

                            <div css={styles.bodyContainer}>
                                <MomentTemplateBannerBody
                                    mainContent={content.mainContent}
                                    mobileContent={content.mobileContent}
                                    highlightedTextSettings={
                                        templateSettings.highlightedTextSettings
                                    }
                                    bodyCopySettings={templateSettings.bodyCopySettings}
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
                                    mainOrMobileContent={content[mainOrMobileContent]}
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

                {content[mainOrMobileContent].secondaryCta?.type ===
                    SecondaryCtaType.ContributionsReminder &&
                    isReminderActive && (
                        <MomentTemplateBannerReminder
                            reminderCta={
                                content[mainOrMobileContent]
                                    .secondaryCta as BannerEnrichedReminderCta
                            }
                            trackReminderSetClick={reminderTracking.onReminderSetClick}
                            setReminderCtaSettings={templateSettings.setReminderCtaSettings}
                            mobileReminderRef={isTabletOrAbove ? null : mobileReminderRef}
                        />
                    )}
            </div>
        );
    }

    return MomentTemplateBanner;
}

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
        ${paddingTop && `padding-top: ${paddingTop}px`};

        ${hasReminderCta
            ? `
                border-bottom: 1px solid ${neutral[0]};
                padding-bottom: ${space[2]}px;
            `
            : ''}

        ${from.tablet} {
            display: none;
        }

        ${bannerSpacing.heading};
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
    desktopVisualContainerLogoWithHands3D: css`
        width: 100%;
        min-height: 100%;
        align-self: stretch;
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

        ${bannerSpacing.heading}
    `,
    desktopHeaderContainer: css`
        display: none;
        margin-top: ${space[2]}px;

        ${from.tablet} {
            display: block;
        }

        ${bannerSpacing.heading}
    `,
    bodyContainer: css`
        ${bannerSpacing.bodyCopyAndArticleCount}
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
