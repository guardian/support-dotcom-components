import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { BannerEnrichedReminderCta, BannerRenderProps } from '../common/types';
import { MomentTemplateBannerHeader } from './components/MomentTemplateBannerHeader';
import { MomentTemplateBannerArticleCount } from './components/MomentTemplateBannerArticleCount';
import { MomentTemplateBannerBody } from './components/MomentTemplateBannerBody';
import { MomentTemplateBannerCtas } from './components/MomentTemplateBannerCtas';
import { MomentTemplateBannerCloseButton } from './components/MomentTemplateBannerCloseButton';
import { MomentTemplateBannerVisual } from './components/MomentTemplateBannerVisual';
import { BannerTemplateSettings } from './settings';
import { between, from, until } from '@guardian/src-foundations/mq';
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
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent.heading}
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
                                amounts={choiceCardAmounts.amounts}
                                amountsTestName={choiceCardAmounts?.testName}
                                amountsVariantName={choiceCardAmounts?.variantName}
                                countryCode={countryCode}
                                bannerTracking={tracking}
                                numArticles={numArticles}
                                content={content}
                                getCtaText={getCtaText}
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
            position: absolute;
            top: ${space[3]}px;
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
};
