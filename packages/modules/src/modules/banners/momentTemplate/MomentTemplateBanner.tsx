import React from 'react';
import { css } from '@emotion/react';
import { neutral, space, between, from, until } from '@guardian/source-foundations';
import { BannerEnrichedReminderCta, BannerRenderProps } from '../common/types';
import { MomentTemplateBannerHeader } from './components/MomentTemplateBannerHeader';
import { MomentTemplateBannerArticleCount } from './components/MomentTemplateBannerArticleCount';
import { MomentTemplateBannerBody } from './components/MomentTemplateBannerBody';
import { MomentTemplateBannerCtas } from './components/MomentTemplateBannerCtas';
import { MomentTemplateBannerCloseButton } from './components/MomentTemplateBannerCloseButton';
import { MomentTemplateBannerVisual } from './components/MomentTemplateBannerVisual';
import { BannerTemplateSettings } from './settings';
import { SecondaryCtaType, Image } from '@sdc/shared/types';
import { MomentTemplateBannerReminder } from './components/MomentTemplateBannerReminder';
import { templateSpacing } from './styles/templateStyles';
import useReminder from '../../../hooks/useReminder';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useChoiceCards from '../../../hooks/useChoiceCards';
import { ChoiceCards } from '../common/choiceCard/ChoiceCards';
import { buttonStyles } from './styles/buttonStyles';
import { ReactComponent } from '../../../types';
import { MomentTemplateBannerTicker } from './components/MomentTemplateBannerTicker';

export function getMomentTemplateBanner(
    templateSettings: BannerTemplateSettings,
): ReactComponent<BannerRenderProps> {
    function MomentTemplateBanner({
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
    }: BannerRenderProps): JSX.Element {
        const { isReminderActive, onReminderCtaClick, mobileReminderRef } =
            useReminder(reminderTracking);
        const isTabletOrAbove = useMediaQuery(from.tablet);
        const mainOrMobileContent = isTabletOrAbove ? content.mainContent : content.mobileContent;

        const {
            choiceCardSelection,
            setChoiceCardSelection,
            getCtaText,
            getCtaUrl,
            currencySymbol,
        } = useChoiceCards(choiceCardAmounts, countryCode, content);

        const showChoiceCards = !!(
            templateSettings.choiceCards && choiceCardAmounts?.amountsCardData
        );

        return (
            <div
                css={styles.outerContainer(
                    templateSettings.containerSettings.backgroundColour,
                    templateSettings.containerSettings.textColor,
                    templateSettings.containerSettings.backgroundImages,
                )}
            >
                <div css={styles.containerOverrides}>
                    <MomentTemplateBannerCloseButton
                        onCloseClick={onCloseClick}
                        settings={templateSettings.closeButtonSettings}
                        styleOverides={styles.closeButtonOverrides}
                    />

                    <div
                        css={styles.headerContainer(
                            templateSettings.containerSettings.backgroundColour,
                            !!templateSettings.imageSettings,
                        )}
                    >
                        <MomentTemplateBannerHeader
                            mainOrMobileContent={mainOrMobileContent.heading}
                            headerSettings={templateSettings.headerSettings}
                        />
                    </div>

                    <div css={styles.contentContainer}>
                        {separateArticleCount && Number(numArticles) > 5 && (
                            <MomentTemplateBannerArticleCount
                                numArticles={numArticles as number}
                                settings={templateSettings}
                            />
                        )}

                        <div css={templateSpacing.bannerBodyCopy}>
                            <MomentTemplateBannerBody
                                mainContent={content.mainContent}
                                mobileContent={content.mobileContent}
                                highlightedTextSettings={templateSettings.highlightedTextSettings}
                            />
                        </div>

                        {tickerSettings?.tickerData && templateSettings.tickerStylingSettings && (
                            <MomentTemplateBannerTicker
                                tickerSettings={tickerSettings}
                                stylingSettings={templateSettings.tickerStylingSettings}
                            />
                        )}

                        {!templateSettings.choiceCards && (
                            <section css={styles.ctasContainer}>
                                <MomentTemplateBannerCtas
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
                            templateSettings.choiceCards,
                        )}
                    >
                        {templateSettings.imageSettings && (
                            <MomentTemplateBannerVisual
                                settings={templateSettings.imageSettings}
                                bannerId={templateSettings.bannerId}
                            />
                        )}
                        {templateSettings.alternativeVisual}
                        {showChoiceCards && (
                            <ChoiceCards
                                setSelectionsCallback={setChoiceCardSelection}
                                selection={choiceCardSelection}
                                submitComponentEvent={submitComponentEvent}
                                currencySymbol={currencySymbol}
                                componentId={'choice-cards-buttons-banner-blue'}
                                amountsTest={choiceCardAmounts}
                                design={templateSettings.choiceCardSettings}
                                content={content}
                                getCtaText={getCtaText}
                                getCtaUrl={getCtaUrl}
                                cssCtaOverides={buttonStyles(templateSettings.primaryCtaSettings)}
                                onCtaClick={onCtaClick}
                            />
                        )}
                    </div>
                </div>
                {mainOrMobileContent.secondaryCta?.type ===
                    SecondaryCtaType.ContributionsReminder &&
                    isReminderActive && (
                        <MomentTemplateBannerReminder
                            reminderCta={
                                mainOrMobileContent.secondaryCta as BannerEnrichedReminderCta
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
    outerContainer: (
        background: string,
        textColor: string = 'inherit',
        backgroundImages?: Image,
    ) => css`
        background: ${background};
        ${backgroundImages?.mainUrl && `background-image: url(${backgroundImages.mainUrl});`}
        color: ${textColor};
        max-height: 100vh;
        overflow: auto;
        padding: 0 10px;
        * {
            box-sizing: border-box;
        }
        ${until.tablet} {
            ${backgroundImages?.mobileUrl &&
            `background-image: url(${backgroundImages.mobileUrl});`}
        }
        ${from.tablet} {
            border-top: 1px solid ${neutral[0]};
            padding: 0 ${space[5]}px;
        }
        ${between.tablet.and.desktop} {
            ${backgroundImages?.tabletUrl &&
            `background-image: url(${backgroundImages.tabletUrl});`}
        }
        ${between.desktop.and.leftCol} {
            ${backgroundImages?.desktopUrl &&
            `background-image: url(${backgroundImages.desktopUrl});`}
        }
        ${between.leftCol.and.wide} {
            ${backgroundImages?.leftColUrl &&
            `background-image: url(${backgroundImages.leftColUrl});`}
        }
        ${from.wide} {
            ${backgroundImages?.wideUrl && `background-image: url(${backgroundImages.wideUrl});`}
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
            grid-template-rows: auto 1fr;
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
            max-width: calc(100% - 34px - ${space[3]}px);
        }
        ${between.mobileMedium.and.tablet} {
            order: ${bannerHasImage ? '2' : '1'};
            max-width: ${bannerHasImage ? '100%' : 'calc(100% - 34px - ${space[3]}px)'};
        }
        ${from.tablet} {
            grid-column: 1 / span 1;
            grid-row: 1 / span 1;
        }
        ${templateSpacing.bannerHeader}
    `,
    contentContainer: css`
        order: 2;
        ${from.tablet} {
            grid-column: 1 / span 1;
            grid-row: 2 / span 1;
        }
    `,
    bannerVisualContainer: (background: string, isChoiceCardsContainer?: boolean) => css`
        display: ${isChoiceCardsContainer ? 'block' : 'none'};
        order: ${isChoiceCardsContainer ? '3' : '1'};
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
};
