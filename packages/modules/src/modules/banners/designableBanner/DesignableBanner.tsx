import React from 'react';
import { css } from '@emotion/react';
import { neutral, space, specialReport } from '@guardian/src-foundations';
import { BannerEnrichedReminderCta, BannerRenderProps } from '../common/types';
import { DesignableBannerHeader } from './components/DesignableBannerHeader';
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCtas } from './components/DesignableBannerCtas';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
import { DesignableBannerVisual } from './components/DesignableBannerVisual';
import { between, from, until } from '@guardian/src-foundations/mq';
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
import { BannerTemplateSettings } from './settings';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import type { ReactComponent } from '../../../types';
import { SvgGuardianLogo } from '@guardian/src-brand';
import { Hide } from '@guardian/src-layout';

const buildImageSettings = (
    design: BannerDesignImage | BannerDesignHeaderImage,
): Image | undefined => {
    return {
        mainUrl: design.mobileUrl,
        mobileUrl: design.mobileUrl,
        tabletUrl: design.tabletDesktopUrl,
        desktopUrl: design.tabletDesktopUrl,
        wideUrl: design.wideUrl,
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
    tracking,
    design,
}: BannerRenderProps): JSX.Element => {
    // We can't render anything without a design
    if (!design) {
        return <></>;
    }

    const {
        basic,
        primaryCta,
        secondaryCta,
        highlightedText,
        closeButton,
        guardianRoundel,
        ticker,
    } = design.colours;

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
                        : neutral[100]
                }`,
            },
            hover: {
                backgroundColour: neutral[100],
                textColour: specialReport[100],
                border: `1px solid ${
                    secondaryCta.hover.border
                        ? hexColourToString(secondaryCta.hover.border)
                        : specialReport[100]
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
            guardianRoundel: guardianRoundel,
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

    const { choiceCardSelection, setChoiceCardSelection, getCtaText, currencySymbol } =
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

    return (
        <div
            css={styles.outerContainer(
                templateSettings.containerSettings.backgroundColour,
                templateSettings.containerSettings.textColor,
            )}
        >
            <div css={styles.containerOverrides}>
                <DesignableBannerCloseButton
                    onCloseClick={onCloseClick}
                    settings={templateSettings.closeButtonSettings}
                    styleOverides={styles.closeButtonOverrides}
                />
                <div css={getHeaderContainerCss()}>
                    <DesignableBannerHeader
                        heading={content.mainContent.heading}
                        mobileHeading={content.mobileContent.heading}
                        headerSettings={templateSettings.headerSettings}
                    />
                </div>
                <div css={styles.contentContainer}>
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
                        <section css={styles.ctasContainer}>
                            <DesignableBannerCtas
                                mainOrMobileContent={mainOrMobileContent}
                                onPrimaryCtaClick={onCtaClick}
                                onSecondaryCtaClick={onSecondaryCtaClick}
                                onReminderCtaClick={onReminderCtaClick}
                                primaryCtaSettings={templateSettings.primaryCtaSettings}
                                secondaryCtaSettings={templateSettings.secondaryCtaSettings}
                            />
                        </section>
                    )}
                </div>
                <div
                    css={styles.bannerVisualContainer(
                        templateSettings.containerSettings.backgroundColour,
                        !!templateSettings.choiceCardSettings,
                    )}
                >
                    {templateSettings.imageSettings && (
                        <DesignableBannerVisual
                            settings={templateSettings.imageSettings}
                            bannerId={templateSettings.bannerId}
                        />
                    )}
                    {/*
                        I think `alternativeVisual` was for using SVG as the image, which is currently beyond the scope of the design tool. Suggest we remove?
                    */}
                    {templateSettings.alternativeVisual}
                    {showChoiceCards && (
                        <ChoiceCards
                            setSelectionsCallback={setChoiceCardSelection}
                            selection={choiceCardSelection}
                            submitComponentEvent={submitComponentEvent}
                            currencySymbol={currencySymbol}
                            componentId={'contributions-banner-choice-cards'}
                            amountsTest={choiceCardAmounts}
                            design={templateSettings.choiceCardSettings}
                            countryCode={countryCode}
                            bannerTracking={tracking}
                            numArticles={numArticles}
                            content={content}
                            getCtaText={getCtaText}
                            cssCtaOverides={buttonStyles(templateSettings.primaryCtaSettings)}
                            onCtaClick={onCtaClick}
                        />
                    )}
                </div>
                <Hide below="tablet">
                    <div css={styles.guardianLogoContainer}>
                        <SvgGuardianLogo />
                    </div>
                </Hide>
            </div>
            {mainOrMobileContent.secondaryCta?.type === SecondaryCtaType.ContributionsReminder &&
                isReminderActive && (
                    <DesignableBannerReminder
                        reminderCta={mainOrMobileContent.secondaryCta as BannerEnrichedReminderCta}
                        trackReminderSetClick={reminderTracking.onReminderSetClick}
                        setReminderCtaSettings={templateSettings.setReminderCtaSettings}
                        mobileReminderRef={isTabletOrAbove ? null : mobileReminderRef}
                    />
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
        padding: 0 10px;
        * {
            box-sizing: border-box;
        }
        ${from.tablet} {
            border-top: 1px solid ${neutral[0]};
            padding: 0 ${space[5]}px;
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
        ${from.tablet} {
            position: static;
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            grid-template-rows: auto 1fr 32px;
            column-gap: ${space[5]}px;
            position: relative;
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
        }
        ${from.desktop} {
            column-gap: 60px;
        }
        ${from.wide} {
            column-gap: 100px;
        }
        ${templateSpacing.bannerContainer};
    `,
    closeButtonOverrides: css`
        ${until.tablet} {
            position: fixed;
            margin-top: ${space[3]}px;
            right: 0;
        }
        ${from.tablet} {
            margin-top: ${space[3]}px;
            grid-column: 2 / span 1;
            grid-row: 1 / span 1;
        }
    `,
    headerContainer: (background: string, bannerHasImage: boolean) => css`
        order: 1;
        ${until.tablet} {
            max-width: calc(100% - 40px - ${space[3]}px);
        }
        ${between.mobileMedium.and.tablet} {
            order: ${bannerHasImage ? '2' : '1'};
            max-width: ${bannerHasImage ? '100%' : 'calc(100% - 40px - ${space[3]}px)'};
        }
        ${from.tablet} {
            grid-column: 1 / span 1;
            grid-row: 1 / span 1;
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
            grid-column: 1 / span 1;
            grid-row: 1 / span 1;
            background: ${background};
        }
        ${templateSpacing.bannerHeader}
    `,
    contentContainer: css`
        order: 2;
        ${from.tablet} {
            grid-column: 1 / span 1;
            grid-row: 2 / span 2;
        }
    `,
    bannerVisualContainer: (background: string, isChoiceCardsContainer?: boolean) => css`
        display: ${isChoiceCardsContainer ? 'block' : 'none'};
        order: ${isChoiceCardsContainer ? '3' : '1'};
        background: ${background};
        ${from.mobileMedium} {
            display: block;
        }
        ${from.tablet} {
            grid-column: 2 / span 1;
            grid-row-start: ${isChoiceCardsContainer ? '2' : '1'};
            grid-row-end: span ${isChoiceCardsContainer ? '1' : '2'};
            align-self: ${isChoiceCardsContainer ? 'start' : 'center'};
            margin-top: ${isChoiceCardsContainer ? '0' : `calc(${space[3]}px + 40px)`};
        }
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
    `,
    guardianLogoContainer: css`
        width: 100px;
        grid-column: 2 / span 1;
        grid-row: 3 / span 1;
        position: fixed;
        right: 0;
        margin-right: ${space[5]}px;
        padding-top: ${space[3]}px;
    `,
};

const unvalidated = bannerWrapper(DesignableBanner, 'designable-banner');
const validated = validatedBannerWrapper(DesignableBanner, 'designable-banner');

export { validated as DesignableBanner, unvalidated as DesignableBannerUnvalidated };
