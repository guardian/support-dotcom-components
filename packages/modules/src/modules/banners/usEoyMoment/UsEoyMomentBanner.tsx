import React from 'react';
import { css } from '@emotion/react';
import { news, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Container } from '@guardian/src-layout';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { UsEoyMomentBannerHeader } from './components/UsEoyMomentBannerHeader';
import { UsEoyMomentBannerArticleCount } from './components/UsEoyMomentBannerArticleCount';
import { UsEoyMomentBannerBody } from './components/UsEoyMomentBannerBody';
import { UsEoyMomentBannerCtas } from './components/UsEoyMomentBannerCtas';
import { UsEoyMomentBannerCloseButton } from './components/UsEoyMomentBannerCloseButton';
import ContributionsTemplateTicker from '../contributionsTemplate/ContributionsTemplateTicker';
import { TickerCountType, TickerEndType } from '@sdc/shared/src/types';
// import UsEoyMomentBannerVisual from './components/UsEoyMomentBannerVisual';

const styles = {
    container: css`
        position: relative;
        overflow: hidden;
        background: #fdefe0;
        border-top: 1px solid ${news[400]};

        * {
            box-sizing: border-box;
        }

        ${from.tablet} {
            background: #fdefe0;
        }
    `,
    headerContainer: css`
        margin: 0 -${space[3]}px;

        ${from.mobileLandscape} {
            margin: 0 -${space[5]}px;
        }

        ${from.tablet} {
            margin: 0;
        }
    `,
    bottomContainer: css`
        padding: ${space[2]}px 0 ${space[3]}px;

        ${from.tablet} {
            max-width: 70%;
            padding-bottom: 80px;
        }
    `,
    bodyContainer: css`
        margin-top: ${space[1]}px;
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
        margin-top: ${space[4]}px;

        ${from.tablet} {
            margin-top: ${space[6]}px;
            /* justify-content: flex-end; */
            margin-right: -65px;
        }
    `,
    closeButtonContainer: css`
        position: absolute;
        top: ${space[2]}px;
        right: ${space[4]}px;

        ${from.leftCol} {
            top: ${space[3]}px;
            right: ${space[5]}px;
        }
    `,
};

const tickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.hardstop,
    currencySymbol: '$',
    copy: {
        countLabel: 'contributed',
        goalReachedPrimary: "It's not too late to give!",
        goalReachedSecondary: '',
    },
    tickerData: {
        total: 120_000,
        goal: 150_000,
    },
};

function UsEoyMomentBanner({
    content,
    onCloseClick,
    numArticles,
    onCtaClick,
    onSecondaryCtaClick,
}: BannerRenderProps) {
    return (
        <Container cssOverrides={styles.container}>
            <div css={styles.headerContainer}>
                <UsEoyMomentBannerHeader
                    heading={content.mainContent.heading}
                    mobileHeading={content.mobileContent?.heading ?? null}
                />
            </div>

            {/* <UsEoyMomentBannerVisual /> */}

            <div css={styles.bottomContainer}>
                {numArticles !== undefined && numArticles > 5 && (
                    <section>
                        <UsEoyMomentBannerArticleCount numArticles={numArticles} />
                    </section>
                )}

                {/* ticker */}
                {/* can we override ContributionsTemplateTicker styles or do we need a new component? */}
                {tickerSettings && tickerSettings.tickerData && (
                    <ContributionsTemplateTicker
                        settings={tickerSettings}
                        accentColour={news[400]}
                    />
                )}

                <section css={styles.bodyContainer}>
                    <UsEoyMomentBannerBody
                        messageText={content.mainContent.messageText}
                        mobileMessageText={content.mobileContent?.messageText ?? null}
                        highlightedText={content.mainContent.highlightedText ?? null}
                        mobileHighlightedText={content.mobileContent?.highlightedText ?? null}
                    />
                </section>

                <section css={styles.ctasContainer}>
                    <UsEoyMomentBannerCtas
                        desktopCtas={{
                            primary: content.mainContent.primaryCta,
                            secondary: content.mainContent.secondaryCta,
                        }}
                        mobileCtas={
                            content.mobileContent
                                ? {
                                      primary: content.mobileContent.primaryCta,
                                      secondary: null,
                                  }
                                : null
                        }
                        onPrimaryCtaClick={onCtaClick}
                        onSecondaryCtaClick={onSecondaryCtaClick}
                    />
                </section>
            </div>
            <div css={styles.closeButtonContainer}>
                <UsEoyMomentBannerCloseButton onCloseClick={onCloseClick} />
            </div>
        </Container>
    );
}

const unvalidated = bannerWrapper(UsEoyMomentBanner, 'us-eoy-moment-banner');
const validated = validatedBannerWrapper(UsEoyMomentBanner, 'us-eoy-moment-banner');

export { validated as UsEoyMomentBanner, unvalidated as UsEoyMomentBannerUnvalidated };
