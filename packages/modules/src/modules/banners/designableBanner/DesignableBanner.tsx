import React from 'react';
import { css } from '@emotion/react';
import { brand, brandAlt, neutral, space } from '@guardian/src-foundations';
import { BannerEnrichedReminderCta, BannerRenderProps } from '../common/types';
import { DesignableBannerHeader } from './components/DesignableBannerHeader';
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCtas } from './components/DesignableBannerCtas';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
import { DesignableBannerVisual } from './components/DesignableBannerVisual';
import { between, from, until } from '@guardian/src-foundations/mq';
import { SecondaryCtaType } from '@sdc/shared/types';
import { DesignableBannerReminder } from './components/DesignableBannerReminder';
import DesignableBannerTicker from './components/DesignableBannerTicker';
import { templateSpacing } from './styles/templateStyles';
import useReminder from '../../../hooks/useReminder';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useChoiceCards from '../../../hooks/useChoiceCards';
import { ChoiceCards } from '../choiceCardsButtonsBanner/components/ChoiceCards';
import { BannerTemplateSettings } from './settings';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';

const DesignableBanner: React.FC<BannerRenderProps> = ({
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
    const templateSettings: BannerTemplateSettings = {
        containerSettings: {
            backgroundColour: '#F1F8FC',
        },
        headerSettings: {
            textColour: '#0077B6',
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: '#0077B6',
                textColour: 'white',
            },
            hover: {
                backgroundColour: '#004E7C',
                textColour: 'white',
                border: '1px solid #004E7C',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: '#F1F8FC',
                textColour: '#004E7C',
                border: '1px solid #004E7C',
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: '#004E7C',
                border: '1px solid #004E7C',
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: '#F1F8FC',
                textColour: brand[400],
                border: `1px solid ${brand[400]}`,
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: brand[400],
            },
            theme: 'brand',
        },
        highlightedTextSettings: {
            textColour: neutral[0],
            highlightColour: brandAlt[400],
        },
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
            mobileUrl:
                'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
            tabletUrl:
                'https://i.guim.co.uk/img/media/d1af2bcab927ca0ad247522105fe41a52a474d27/0_0_1080_1000/500.png?width=500&quality=75&s=af39fa30f36fce453eabaef3063a3180',
            desktopUrl:
                'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
            wideUrl:
                'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
            altText: 'Guardian logo being held up by supporters of the Guardian',
        },
        bannerId: 'designable-banner',
    };

    // We can't render anything without a design
    if (!design) {
        return <></>;
    }

    const imageSettings = {
        mainUrl: design.image.mobileUrl,
        mobileUrl: design.image.mobileUrl,
        tabletUrl: design.image.tabletDesktopUrl,
        desktopUrl: design.image.tabletDesktopUrl,
        wideUrl: design.image.wideUrl,
        altText: design.image.altText,
    };

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
    const showChoiceCards = !!(templateSettings.choiceCards && choiceCardAmounts?.amountsCardData);

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

                <div
                    css={styles.headerContainer(
                        templateSettings.containerSettings.backgroundColour,
                        !!imageSettings,
                    )}
                >
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

                    {!templateSettings.choiceCards && (
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
                        templateSettings.choiceCards,
                    )}
                >
                    {imageSettings && (
                        <DesignableBannerVisual
                            settings={imageSettings}
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
                            amounts={choiceCardAmounts.amountsCardData}
                            amountsTestName={choiceCardAmounts.testName}
                            amountsVariantName={choiceCardAmounts.variantName}
                            countryCode={countryCode}
                            bannerTracking={tracking}
                            numArticles={numArticles}
                            content={content}
                            getCtaText={getCtaText}
                        />
                    )}
                </div>
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

const unvalidated = bannerWrapper(DesignableBanner, 'designable-banner');
const validated = validatedBannerWrapper(DesignableBanner, 'designable-banner');

export { validated as DesignableBanner, unvalidated as DesignableBannerUnvalidated };
