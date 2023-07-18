import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Container } from '@guardian/src-layout';
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
import { templateSpacing } from './styles/templateStyles';
import useReminder from '../../../hooks/useReminder';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useChoiceCards from '../../../hooks/useChoiceCards';
import { ChoiceCards } from '../choiceCardsButtonsBanner/components/ChoiceCards';

export function getMomentTemplateBanner(
    templateSettings: BannerTemplateSettings,
): React.FC<BannerRenderProps> {
    const hasVisual =
        templateSettings.imageSettings ||
        templateSettings.alternativeVisual ||
        templateSettings.choiceCards;
    const hasBannerAndHeaderVisuals =
        !!templateSettings.imageSettings && !!templateSettings.headerSettings?.image;

    function getHeightHeader(id: string) {
        const element = document.getElementById(id);
        return (element?.offsetHeight || 0) + space[6];
    }

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
        tracking,
    }: BannerRenderProps): JSX.Element {
        const [heightHeader, setHeightHeader] = useState<number>(
            getHeightHeader('headerContainer'),
        );

        useEffect(() => {
            handleRefresh();
            window.addEventListener('resize', handleRefresh);
        }, []);

        function handleRefresh() {
            setHeightHeader(getHeightHeader('headerContainer'));
        }

        const { isReminderActive, onReminderCtaClick, mobileReminderRef } = useReminder(
            reminderTracking,
        );
        const isTabletOrAbove = useMediaQuery(from.tablet);
        const mainOrMobileContent = isTabletOrAbove ? content.mainContent : content.mobileContent;

        const {
            choiceCardSelection,
            setChoiceCardSelection,
            getCtaText,
            currencySymbol,
        } = useChoiceCards(choiceCardAmounts, countryCode);
        const showChoiceCards = !!(templateSettings.choiceCards && choiceCardAmounts?.amounts);

        return (
            <div
                css={styles.outerContainer(
                    templateSettings.containerSettings.backgroundColour,
                    templateSettings.containerSettings.textColor,
                )}
            >
                <Container cssOverrides={styles.containerOverrides(templateSettings.choiceCards)}>
                    <div css={styles.closeButtonContainer}>
                        <MomentTemplateBannerCloseButton
                            onCloseClick={onCloseClick}
                            settings={templateSettings.closeButtonSettings}
                        />
                    </div>

                    {hasVisual && (
                        <div
                            css={styles.bannerVisualContainer(
                                templateSettings.containerSettings.backgroundColour,
                                hasBannerAndHeaderVisuals,
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
                                    amounts={choiceCardAmounts.amounts}
                                    amountsTestName={choiceCardAmounts?.testName}
                                    amountsVariantName={choiceCardAmounts?.variantName}
                                    countryCode={countryCode}
                                    bannerTracking={tracking}
                                    numArticles={numArticles}
                                    content={content}
                                    getCtaText={getCtaText}
                                    verticalPosAdjust={heightHeader}
                                />
                            )}
                        </div>
                    )}

                    <div css={styles.contentContainer}>
                        <div
                            css={styles.headerContainer(
                                templateSettings.containerSettings.backgroundColour,
                                content.mobileContent.secondaryCta?.type ===
                                    SecondaryCtaType.ContributionsReminder,
                                templateSettings.choiceCards,
                            )}
                            id="headerContainer"
                        >
                            <MomentTemplateBannerHeader
                                heading={content.mainContent.heading}
                                mobileHeading={content.mobileContent.heading}
                                headerSettings={templateSettings.headerSettings}
                            />
                        </div>

                        {separateArticleCount && numArticles !== undefined && numArticles > 5 && (
                            <MomentTemplateBannerArticleCount
                                numArticles={numArticles}
                                settings={templateSettings}
                            />
                        )}

                        <div css={styles.bodyContainer} id="bodyContainer">
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
                </Container>

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
    `,
    containerOverrides: (isChoiceCardsContainer?: boolean) => css`
        ${from.tablet} {
            position: relative;
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
        }

        & > div {
            display: flex;
            flex-direction: column;

            ${isChoiceCardsContainer
                ? 'flex-direction: column-reverse;'
                : 'flex-direction: column;'}

            ${from.tablet} {
                flex-direction: row-reverse;
            }
        }

        ${templateSpacing.bannerContainer};
    `,
    bannerVisualContainer: (
        background: string,
        hasBannerAndHeaderVisuals: boolean,
        isChoiceCardsContainer?: boolean,
    ) => css`
        display: none;

        ${from.mobileMedium} {
            ${hasBannerAndHeaderVisuals
                ? ``
                : `
            display: block;

            // Mobile Sticky Header Styles
            background: ${background};
            position: sticky;
            top: 0px;
            z-index: 100;
            `}
        }

        ${from.tablet} {
            display: block;

            // Mobile Sticky Header Styles
            background: ${background};
            top: 0px;
            width: 238px;
            margin-left: ${space[3]}px;
            position: relative;
            z-index: 100;
        }

        ${from.desktop} {
            width: 320px;
            margin-left: ${space[5]}px;
        }

        ${from.leftCol} {
            width: 370px;
            margin-left: ${space[9]}px;
        }

        ${isChoiceCardsContainer
            ? `
        display: block; // choice cards visible below mobileMedium

        ${from.tablet} {
            width: 350px;
        }
    `
            : `
                pointer-events: none;
        `}
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
            width: 860px;
        }
    `,
    headerContainer: (background: string, hasReminderCta: boolean, choiceCards?: boolean) => css`
        ${templateSpacing.bannerHeader}
        max-width: calc(100% - 46px); // 46px approx close button size

        ${from.tablet} {
            // Mobile Sticky Header Styles
            background: ${background};
            position: sticky;
            top: ${choiceCards ? '0px' : '140px'}; // 140px for banner visual
            z-index: 100;
            ${hasReminderCta
                ? `
                    border-bottom: 1px solid ${neutral[0]};
                    padding-bottom: ${space[2]}px;
                `
                : ''}
        }

        ${from.tablet} {
            max-width: initial;
            position: relative;
            top: initial;
            z-index: initial;
            padding-bottom: 0px;
            border-bottom: initial;
        }
    `,
    bodyContainer: css`
        ${templateSpacing.bannerBodyCopy}
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
    `,
    closeButtonContainer: css`
        ${templateSpacing.bannerCloseButton}
        z-index: 101;
        position: absolute;
    `,
};
