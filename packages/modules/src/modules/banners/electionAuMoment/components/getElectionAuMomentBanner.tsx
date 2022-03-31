import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Container } from '@guardian/src-layout';
import { BannerRenderProps } from '../../common/types';
import { ElectionAuMomentBannerHeader } from './ElectionAuMomentBannerHeader';
import { ElectionAuMomentBannerArticleCount } from './ElectionAuMomentBannerArticleCount';
import { ElectionAuMomentBannerBody } from './ElectionAuMomentBannerBody';
import { ElectionAuMomentBannerCtas } from './ElectionAuMomentBannerCtas';
import { ElectionAuMomentBannerCloseButton } from './ElectionAuMomentBannerCloseButton';
import ElectionAuMomentBannerVisual from './ElectionAuMomentBannerVisual';

const styles = {
    outerContainer: css`
        background: #f79e1b;
        border-top: 3px solid ${neutral[0]};
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
            background: #f79e1b;
        }
    `,
    headerContainer: css`
        margin: 0 -${space[3]}px;
        display: inline-block;
        max-width: 45%;

        ${from.mobileLandscape} {
            max-width: 50%;
            margin: 0 -${space[5]}px;
        }

        ${from.tablet} {
            max-width: 58%;
            margin: 0;
        }

        ${from.desktop} {
            max-width: 66%;
            font-size: 43px;
        }

        ${from.leftCol} {
            max-width: 70%;
            font-size: 50px;
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

function getElectionAuMomentBanner(): React.FC<BannerRenderProps> {
    function ElectionAuMomentBanner({
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
                        <ElectionAuMomentBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent?.heading ?? null}
                        />
                    </div>

                    <ElectionAuMomentBannerVisual />
                    <hr css={styles.horizontalRule} />

                    <div css={styles.bottomContainer}>
                        {numArticles !== undefined && numArticles > 5 && (
                            <section>
                                <ElectionAuMomentBannerArticleCount numArticles={numArticles} />
                            </section>
                        )}

                        <section css={styles.bodyContainer}>
                            <ElectionAuMomentBannerBody
                                messageText={content.mainContent.paragraphs}
                                mobileMessageText={content.mobileContent?.paragraphs ?? null}
                                highlightedText={content.mainContent.highlightedText ?? null}
                                mobileHighlightedText={
                                    content.mobileContent?.highlightedText ?? null
                                }
                            />
                        </section>

                        <section css={styles.ctasContainer}>
                            <ElectionAuMomentBannerCtas
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
                        <ElectionAuMomentBannerCloseButton onCloseClick={onCloseClick} />
                    </div>
                </Container>
            </div>
        );
    }
    return ElectionAuMomentBanner;
}

export default getElectionAuMomentBanner;
