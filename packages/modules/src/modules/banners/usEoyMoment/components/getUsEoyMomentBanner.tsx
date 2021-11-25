import React from 'react';
import { css } from '@emotion/react';
import { neutral, news, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Container } from '@guardian/src-layout';
import { BannerRenderProps } from '../../common/types';
import { UsEoyMomentBannerHeader } from '../components/UsEoyMomentBannerHeader';
import { UsEoyMomentBannerArticleCount } from '../components/UsEoyMomentBannerArticleCount';
import { UsEoyMomentBannerBody } from '../components/UsEoyMomentBannerBody';
import { UsEoyMomentBannerCtas } from '../components/UsEoyMomentBannerCtas';
import { UsEoyMomentBannerCloseButton } from '../components/UsEoyMomentBannerCloseButton';
import UsEoyMomentBannerTicker from '../components/UsEoyMomentBannerTicker';
import UsEoyMomentBannerVisual from '../components/UsEoyMomentBannerVisual';

const styles = {
    outerContainer: css`
        background: #fdefe0;
        border-top: 1px solid ${news[400]};
    `,
    container: css`
        position: relative;
        overflow: hidden;
        max-width: 1300px;
        margin: 0 auto;

        * {
            box-sizing: border-box;
        }

        ${from.tablet} {
            background: #fdefe0;
        }

        ${from.wide} {
            border-right: 1px solid #707070;
            border-left: 1px solid #707070;
        }
    `,
    headerContainer: css`
        margin: 0 -${space[3]}px;
        display: inline-block;

        ${from.mobileLandscape} {
            margin: 0 -${space[5]}px;
        }

        ${from.tablet} {
            margin: 0;
        }
    `,
    horizontalRule: css`
        clear: both;
        margin: 0 -${space[3]}px 0 0;
        background-color: ${neutral[20]};
        height: 1px;
        border-width: 0;

        ${from.mobileLandscape} {
            margin-right: -${space[5]}px;
        }

        ${from.tablet} {
            display: none;
        }
    `,
    bottomContainer: css`
        padding-bottom: ${space[6]}px;

        ${from.tablet} {
            max-width: 58%;
        }

        ${from.desktop} {
            max-width: 66%;
        }

        ${from.leftCol} {
            max-width: 64%;
        }

        ${from.leftCol} {
            max-width: 68%;
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

function getUsEoyMomentBanner(isGivingTuesday: boolean): React.FC<BannerRenderProps> {
    function UsEoyMomentBanner({
        content,
        onCloseClick,
        numArticles,
        onCtaClick,
        onSecondaryCtaClick,
        tickerSettings,
    }: BannerRenderProps) {
        return (
            <div css={styles.outerContainer}>
                <Container cssOverrides={styles.container}>
                    <div css={styles.headerContainer}>
                        <UsEoyMomentBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent?.heading ?? null}
                        />
                    </div>

                    <UsEoyMomentBannerVisual isGivingTuesday={isGivingTuesday} />
                    <hr css={styles.horizontalRule} />

                    <div css={styles.bottomContainer}>
                        {numArticles !== undefined && numArticles > 5 && (
                            <section>
                                <UsEoyMomentBannerArticleCount numArticles={numArticles} />
                            </section>
                        )}

                        {tickerSettings?.tickerData && (
                            <UsEoyMomentBannerTicker
                                tickerSettings={tickerSettings}
                                accentColour={news[400]}
                            />
                        )}

                        <section css={styles.bodyContainer}>
                            <UsEoyMomentBannerBody
                                messageText={content.mainContent.messageText}
                                mobileMessageText={content.mobileContent?.messageText ?? null}
                                highlightedText={content.mainContent.highlightedText ?? null}
                                mobileHighlightedText={
                                    content.mobileContent?.highlightedText ?? null
                                }
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
            </div>
        );
    }
    return UsEoyMomentBanner;
}

export default getUsEoyMomentBanner;
