import React from 'react';
import { css } from '@emotion/react';
import {
    neutral,
    space,
    specialReport,
    between,
    from,
    until,
    body,
    textSans,
} from '@guardian/source-foundations';
import { BannerEnrichedReminderCta, BannerRenderProps } from '../common/types';
import { DesignableBannerHeader } from './components/DesignableBannerHeader';
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCtas } from './components/DesignableBannerCtas';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
import { DesignableBannerVisual } from './components/DesignableBannerVisual';
import {
    SecondaryCtaType,
    hexColourToString,
    ConfigurableDesign,
    BannerDesignImage,
    BannerDesignHeaderImage,
    Image,
} from '@sdc/shared/types';
import { DesignableBannerReminder } from './components/DesignableBannerReminder';
import DesignableBannerTicker from './components/DesignableBannerTicker';
import { templateSpacing } from './styles/templateStyles';
import useReminder from '../../../hooks/useReminder';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useChoiceCards from '../../../hooks/useChoiceCards';
import { ChoiceCards, ChoiceCardSettings } from '../common/choiceCard/ChoiceCards';
import { buttonStyles } from './styles/buttonStyles';
import { BannerTemplateSettings, CtaSettings } from './settings';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import type { ReactComponent } from '../../../types';
import { Button, SvgGuardianLogo } from '@guardian/source-react-components';

const buildImageSettings = (
    design: BannerDesignImage | BannerDesignHeaderImage,
): Image | undefined => {
    return {
        mainUrl: design.mobileUrl,
        mobileUrl: design.mobileUrl,
        tabletUrl: design.tabletUrl,
        desktopUrl: design.desktopUrl,
        wideUrl: design.desktopUrl,
        altText: design.altText,
    };
};
const buildMainImageSettings = (design: ConfigurableDesign): Image | undefined => {
    if (design.visual?.kind === 'Image') {
        return buildImageSettings(design.visual);
    }
    return undefined;
};
const buildHeaderImageSettings = (design: ConfigurableDesign): Image | undefined => {
    if (design.headerImage) {
        return buildImageSettings(design.headerImage);
    }
    return undefined;
};

const buildChoiceCardSettings = (design: ConfigurableDesign): ChoiceCardSettings | undefined => {
    if (design.visual?.kind === 'ChoiceCards') {
        const {
            buttonColour,
            buttonTextColour,
            buttonBorderColour,
            buttonSelectColour,
            buttonSelectTextColour,
            buttonSelectBorderColour,
        } = design.visual;
        return {
            buttonColour: buttonColour ? hexColourToString(buttonColour) : undefined,
            buttonTextColour: buttonTextColour ? hexColourToString(buttonTextColour) : undefined,
            buttonBorderColour: buttonBorderColour
                ? hexColourToString(buttonBorderColour)
                : undefined,
            buttonSelectColour: buttonSelectColour
                ? hexColourToString(buttonSelectColour)
                : undefined,
            buttonSelectTextColour: buttonSelectTextColour
                ? hexColourToString(buttonSelectTextColour)
                : undefined,
            buttonSelectBorderColour: buttonSelectBorderColour
                ? hexColourToString(buttonSelectBorderColour)
                : undefined,
        };
    }
    return undefined;
};

const DesignableBanner: ReactComponent<BannerRenderProps> = ({
    content,
    onCloseClick,
    numArticles,
    onCtaClick,
    onSecondaryCtaClick,
    reminderTracking,
    separateArticleCount,
    tickerSettings,
    choiceCardAmounts,
    countryCode,
    submitComponentEvent,
    design,
}: BannerRenderProps): JSX.Element => {
    // We can't render anything without a design
    if (!design) {
        return <></>;
    }

    const { basic, primaryCta, secondaryCta, highlightedText, closeButton, ticker } =
        design.colours;

    const imageSettings = buildMainImageSettings(design);
    const choiceCardSettings = buildChoiceCardSettings(design);

    const templateSettings: BannerTemplateSettings = {
        containerSettings: {
            backgroundColour: hexColourToString(basic.background),
            textColor: hexColourToString(basic.bodyText),
        },
        headerSettings: {
            textColour: hexColourToString(basic.headerText),
            headerImage: buildHeaderImageSettings(design),
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: hexColourToString(primaryCta.default.background),
                textColour: hexColourToString(primaryCta.default.text),
            },
            hover: {
                backgroundColour: hexColourToString(primaryCta.hover.background),
                textColour: hexColourToString(primaryCta.hover.text),
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: hexColourToString(secondaryCta.default.background),
                textColour: hexColourToString(secondaryCta.default.text),
                border: `1px solid ${
                    secondaryCta.default.border
                        ? hexColourToString(secondaryCta.default.border)
                        : undefined
                }`,
            },
            hover: {
                backgroundColour: hexColourToString(secondaryCta.hover.background),
                textColour: hexColourToString(secondaryCta.hover.text),
                border: `1px solid ${
                    secondaryCta.hover.border
                        ? hexColourToString(secondaryCta.hover.border)
                        : undefined
                }`,
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: hexColourToString(closeButton.default.background),
                textColour: hexColourToString(closeButton.default.text),
                border: `1px solid ${
                    closeButton.default.border
                        ? hexColourToString(closeButton.default.border)
                        : specialReport[100]
                }`,
            },
            hover: {
                backgroundColour: hexColourToString(closeButton.hover.background),
                textColour: hexColourToString(closeButton.hover.text),
                border: `1px solid ${
                    closeButton.hover.border
                        ? hexColourToString(closeButton.hover.border)
                        : neutral[100]
                }`,
            },
        },
        highlightedTextSettings: {
            textColour: hexColourToString(highlightedText.text),
            highlightColour: hexColourToString(highlightedText.highlight),
        },
        articleCountTextColour: hexColourToString(basic.articleCountText),
        choiceCardSettings,
        imageSettings,
        bannerId: 'designable-banner',
        tickerStylingSettings: {
            textColour: hexColourToString(ticker.text),
            filledProgressColour: hexColourToString(ticker.filledProgress),
            progressBarBackgroundColour: hexColourToString(ticker.progressBarBackground),
            goalMarkerColour: hexColourToString(ticker.goalMarker),
        },
    };

    const { isReminderActive, onReminderCtaClick, mobileReminderRef } =
        useReminder(reminderTracking);
    const isTabletOrAbove = useMediaQuery(from.tablet);
    const mainOrMobileContent = isTabletOrAbove ? content.mainContent : content.mobileContent;

    const { choiceCardSelection, setChoiceCardSelection, getCtaText, getCtaUrl, currencySymbol } =
        useChoiceCards(choiceCardAmounts, countryCode, content);
    const showChoiceCards = !!(
        templateSettings.choiceCardSettings && choiceCardAmounts?.amountsCardData
    );

    const getHeaderContainerCss = () => {
        if (!!templateSettings?.headerSettings?.headerImage) {
            return styles.headerWithImageContainer(
                templateSettings.containerSettings.backgroundColour,
            );
        }
        return styles.headerContainer(
            templateSettings.containerSettings.backgroundColour,
            !!templateSettings.imageSettings,
        );
    };

    const showReminder =
        mainOrMobileContent.secondaryCta?.type === SecondaryCtaType.ContributionsReminder;

    return (
        <div
            css={styles.outerContainer(
                templateSettings.containerSettings.backgroundColour,
                templateSettings.containerSettings.textColor,
            )}
        >
            <div css={styles.containerOverrides}>
                <div css={getHeaderContainerCss()}>
                    <DesignableBannerHeader
                        heading={content.mainContent.heading}
                        mobileHeading={content.mobileContent.heading}
                        headerSettings={templateSettings.headerSettings}
                    />
                </div>
                <div css={styles.contentContainer(showReminder)}>
                    {separateArticleCount && Number(numArticles) > 5 && (
                        <DesignableBannerArticleCount
                            numArticles={numArticles as number}
                            settings={templateSettings}
                        />
                    )}

                    <div css={templateSpacing.bannerBodyCopy}>
                        <DesignableBannerBody
                            mainContent={content.mainContent}
                            mobileContent={content.mobileContent}
                            highlightedTextSettings={templateSettings.highlightedTextSettings}
                        />
                    </div>

                    {tickerSettings?.tickerData && templateSettings.tickerStylingSettings && (
                        <DesignableBannerTicker
                            tickerSettings={tickerSettings}
                            stylingSettings={templateSettings.tickerStylingSettings}
                        />
                    )}

                    {!templateSettings.choiceCardSettings && (
                        <DesignableBannerCtas
                            mainOrMobileContent={mainOrMobileContent}
                            onPrimaryCtaClick={onCtaClick}
                            onSecondaryCtaClick={onSecondaryCtaClick}
                            primaryCtaSettings={templateSettings.primaryCtaSettings}
                            secondaryCtaSettings={templateSettings.secondaryCtaSettings}
                        />
                    )}
                </div>
                {templateSettings.imageSettings ? (
                    <div
                        css={styles.bannerVisualContainer(
                            templateSettings.containerSettings.backgroundColour,
                        )}
                    >
                        <DesignableBannerCloseButton
                            onCloseClick={onCloseClick}
                            settings={templateSettings.closeButtonSettings}
                            styleOverides={styles.closeButtonOverrides(false)}
                        />
                        <DesignableBannerVisual
                            settings={templateSettings.imageSettings}
                            bannerId={templateSettings.bannerId}
                        />

                        {/*
                        I think `alternativeVisual` was for using SVG as the image, which is currently beyond the scope of the design tool. Suggest we remove?
                    */}
                        {templateSettings.alternativeVisual}
                    </div>
                ) : (
                    <DesignableBannerCloseButton
                        onCloseClick={onCloseClick}
                        settings={templateSettings.closeButtonSettings}
                        styleOverides={styles.closeButtonOverrides(true)}
                    />
                )}
                {showChoiceCards && (
                    <div
                        css={styles.choiceCardsContainer(
                            templateSettings.containerSettings.backgroundColour,
                        )}
                    >
                        <ChoiceCards
                            setSelectionsCallback={setChoiceCardSelection}
                            selection={choiceCardSelection}
                            submitComponentEvent={submitComponentEvent}
                            currencySymbol={currencySymbol}
                            componentId={'contributions-banner-choice-cards'}
                            amountsTest={choiceCardAmounts}
                            design={templateSettings.choiceCardSettings}
                            content={content}
                            getCtaText={getCtaText}
                            getCtaUrl={getCtaUrl}
                            cssCtaOverides={buttonStyles(templateSettings.primaryCtaSettings)}
                            onCtaClick={onCtaClick}
                        />
                    </div>
                )}
                <div css={styles.guardianLogoContainer}>
                    <SvgGuardianLogo textColor={hexColourToString(basic.logo)} />
                </div>

                {showReminder && (
                    <div css={styles.reminderContainer}>
                        <span css={styles.reminderText}>Not ready to support today? </span>
                        <Button
                            priority="subdued"
                            onClick={onReminderCtaClick}
                            cssOverrides={styles.reminderCta(templateSettings.secondaryCtaSettings)}
                        >
                            Remind me later
                        </Button>
                    </div>
                )}
            </div>

            {isReminderActive && (
                <div css={styles.reminderFormContainer}>
                    <div css={styles.containerOverrides}>
                        <DesignableBannerReminder
                            reminderCta={
                                mainOrMobileContent.secondaryCta as BannerEnrichedReminderCta
                            }
                            trackReminderSetClick={reminderTracking.onReminderSetClick}
                            setReminderCtaSettings={templateSettings.secondaryCtaSettings}
                            mobileReminderRef={isTabletOrAbove ? null : mobileReminderRef}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    outerContainer: (background: string, textColor: string = 'inherit') => css`
        background: ${background};
        color: ${textColor};
        max-height: 100vh;
        overflow: auto;
        * {
            box-sizing: border-box;
        }
        ${from.tablet} {
            border-top: 1px solid ${neutral[0]};
        }
        b,
        strong {
            font-weight: bold;
        }
    `,
    containerOverrides: css`
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 0 10px;
        ${from.tablet} {
            position: static;
            display: grid;
            grid-template-columns: 1fr 280px;
            grid-template-rows: auto 1fr auto;
            column-gap: ${space[5]}px;
            position: relative;
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
            padding: 0 ${space[5]}px;
        }
        ${from.desktop} {
            column-gap: 60px;
            grid-template-columns: 1fr 460px;
        }
        ${from.wide} {
            column-gap: 100px;
        }
        ${templateSpacing.bannerContainer};
    `,
    closeButtonOverrides: (isGridCell: boolean) => css`
        ${until.tablet} {
            position: fixed;
            margin-top: ${space[3]}px;
            padding-right: 10px;
            right: 0;
        }
        ${from.tablet} {
            margin-top: ${space[3]}px;

            ${isGridCell
                ? css`
                      grid-column: 2;
                      grid-row: 1;
                  `
                : css`
                      margin-bottom: ${space[3]}px;
                      display: flex;
                      justify-content: flex-end;
                  `}
        }
    `,
    headerContainer: (background: string, bannerHasImage: boolean) => css`
        order: ${bannerHasImage ? '2' : '1'};
        ${until.tablet} {
            ${bannerHasImage ? '' : `max-width: calc(100% - 40px - ${space[3]}px);`}
        }

        ${from.tablet} {
            grid-column: 1;
            grid-row: 1;
            background: ${background};
        }

        ${templateSpacing.bannerHeader}
    `,
    headerWithImageContainer: (background: string) => css`
        order: 1;
        max-width: '100%';
        ${between.mobileMedium.and.tablet} {
            order: '2';
        }
        ${from.tablet} {
            grid-column: 1;
            grid-row: 1;
            background: ${background};
        }
        ${templateSpacing.bannerHeader}
    `,
    contentContainer: (showRemindMeLater: boolean) => css`
        order: 2;
        ${from.tablet} {
            grid-column: 1;
            grid-row: ${showRemindMeLater ? '2' : '2 / span 2'};
        }
    `,
    bannerVisualContainer: (background: string) => css`
        order: 1;
        background: ${background};
        ${from.tablet} {
            grid-column: 2;
            grid-row: 1 / span 2;
            align-self: flex-start;
        }
    `,
    choiceCardsContainer: (background: string) => css`
        order: 3;
        background: ${background};
        ${from.tablet} {
            grid-column: 2;
            grid-row: 2;
            align-self: flex-start;
            display: flex;
            justify-content: flex-end;
        }
    `,
    guardianLogoContainer: css`
        display: none;
        ${from.tablet} {
            display: block;
            width: 100px;
        }
        grid-column: 2;
        grid-row: 3;
        justify-self: end;
        padding-top: ${space[3]}px;
    `,
    reminderContainer: css`
        ${body.small({ lineHeight: 'regular' })};
        grid-column: 1;
        grid-row: 3;
        order: 4;
        align-self: center;
        margin-top: ${space[2]}px;

        ${from.tablet} {
            align-self: end;
        }
    `,
    reminderText: css`
        ${textSans.medium()}
        display: none;

        ${from.tablet} {
            display: inline;
        }
    `,
    reminderCta: ({ default: defaultSettings }: CtaSettings) => css`
        ${textSans.medium({ lineHeight: 'regular', fontWeight: 'bold' })}
        color: ${defaultSettings.backgroundColour};
        display: inline;
        height: auto;
        min-height: auto;
    `,

    reminderFormContainer: css`
        border-top: 2px solid ${neutral[0]};
        margin-top: ${space[3]}px;
    `,
};

const unvalidated = bannerWrapper(DesignableBanner, 'designable-banner');
const validated = validatedBannerWrapper(DesignableBanner, 'designable-banner');

export { validated as DesignableBanner, unvalidated as DesignableBannerUnvalidated };
