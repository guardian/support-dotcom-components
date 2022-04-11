import React from 'react';
import { css } from '@emotion/react';
import { neutral, space, breakpoints } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
// import { Container } from '@guardian/src-layout';
import { BannerRenderProps } from '../../common/types';
import { ElectionAuMomentBannerHeader } from './ElectionAuMomentBannerHeader';
import { ElectionAuMomentBannerArticleCount } from './ElectionAuMomentBannerArticleCount';
import { ElectionAuMomentBannerBody } from './ElectionAuMomentBannerBody';
import { ElectionAuMomentBannerCtas } from './ElectionAuMomentBannerCtas';
import { ElectionAuMomentBannerCloseButton } from './ElectionAuMomentBannerCloseButton';
import ElectionAuMomentBannerVisual from './ElectionAuMomentBannerVisual';

const styles = {
    outerContainer: css`
        * {
            box-sizing: border-box;
        }
        background: #e4e4e3;
        border-top: 2px solid ${neutral[0]};
    `,
    innerContainer: css`
        position: relative;
        overflow: hidden;
        width: 100%;
        padding: 0 ${space[3]}px ${space[3]}px;

        ${from.mobileLandscape} {
            padding: 0 ${space[5]}px;
            padding-bottom: ${space[4]}px;
        }
        ${from.tablet} {
            width: ${breakpoints.tablet}px;
        }
        ${from.desktop} {
            width: ${breakpoints.desktop}px;
        }
        ${from.leftCol} {
            width: ${breakpoints.leftCol}px;
        }
        ${from.wide} {
            width: ${breakpoints.wide}px;
            max-width: 1300px;
            margin: 0 auto;
        }
    `,

    bottomContainer: css`
        padding-bottom: ${space[3]}px;

        ${from.tablet} {
            max-width: 45%;
        }

        ${from.desktop} {
            max-width: 47%;
        }

        ${from.wide} {
            max-width: 45%;
        }
    `,
    bodyContainer: css`
        margin-top: ${space[1]}px;
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
    `,
    closeButtonContainer: css`
        position: absolute;
        top: ${space[2]}px;
        right: ${space[3]}px;

        ${from.mobileLandscape} {
            right: ${space[5]}px;
        }

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
                <div css={styles.innerContainer}>
                    <ElectionAuMomentBannerVisual />
                    <div>
                        <ElectionAuMomentBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent?.heading ?? null}
                        />

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
                        </div>
                    </div>
                    <section css={styles.ctasContainer}>
                        <ElectionAuMomentBannerCtas
                            desktopCtas={{
                                primary: content.mainContent.primaryCta,
                                secondary: content.mainContent.secondaryCta,
                            }}
                            mobileCtas={{
                                primary: content.mobileContent?.primaryCta || null,
                                secondary: content.mobileContent?.secondaryCta || null,
                            }}
                            onPrimaryCtaClick={onCtaClick}
                            onSecondaryCtaClick={onSecondaryCtaClick}
                        />
                    </section>
                    <div css={styles.closeButtonContainer}>
                        <ElectionAuMomentBannerCloseButton onCloseClick={onCloseClick} />
                    </div>
                </div>
            </div>
        );
    }
    return ElectionAuMomentBanner;
}

export default getElectionAuMomentBanner;
