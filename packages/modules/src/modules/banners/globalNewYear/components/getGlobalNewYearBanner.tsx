import React from 'react';
import { css } from '@emotion/react';
import { brand, neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Container } from '@guardian/src-layout';
import { BannerRenderProps } from '../../common/types';
import { GlobalNewYearBannerHeader } from './GlobalNewYearBannerHeader';
import { GlobalNewYearBannerArticleCount } from './GlobalNewYearBannerArticleCount';
import { GlobalNewYearBannerBody } from './GlobalNewYearBannerBody';
import { GlobalNewYearBannerCtas } from './GlobalNewYearBannerCtas';
import { GlobalNewYearBannerCloseButton } from './GlobalNewYearBannerCloseButton';
import GlobalNewYearBannerVisual from './GlobalNewYearBannerVisual';

const styles = {
    outerContainer: css`
        background: #f79e1b;
        border-top: 1px solid ${brand[400]};
    `,
    container: css`
        position: relative;
        overflow: hidden;
        max-width: 1300px;

        * {
            box-sizing: border-box;
        }

        ${from.tablet} {
            background: #f79e1b;
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

function getGlobalNewYearBanner(): React.FC<BannerRenderProps> {
    function GlobalNewYearBanner({
        content,
        onCloseClick,
        numArticles,
        onCtaClick,
        onSecondaryCtaClick,
    }: BannerRenderProps) {
        return (
            <div css={styles.outerContainer}>
                <Container cssOverrides={styles.container}>
                    <div css={styles.headerContainer}>
                        <GlobalNewYearBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent?.heading ?? null}
                        />
                    </div>

                    <GlobalNewYearBannerVisual />
                    <hr css={styles.horizontalRule} />

                    <div css={styles.bottomContainer}>
                        {numArticles !== undefined && numArticles > 5 && (
                            <section>
                                <GlobalNewYearBannerArticleCount numArticles={numArticles} />
                            </section>
                        )}

                        <section css={styles.bodyContainer}>
                            <GlobalNewYearBannerBody
                                messageText={content.mainContent.messageText}
                                mobileMessageText={content.mobileContent?.messageText ?? null}
                                highlightedText={content.mainContent.highlightedText ?? null}
                                mobileHighlightedText={
                                    content.mobileContent?.highlightedText ?? null
                                }
                            />
                        </section>

                        <section css={styles.ctasContainer}>
                            <GlobalNewYearBannerCtas
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
                        <GlobalNewYearBannerCloseButton onCloseClick={onCloseClick} />
                    </div>
                </Container>
            </div>
        );
    }
    return GlobalNewYearBanner;
}

export default getGlobalNewYearBanner;
