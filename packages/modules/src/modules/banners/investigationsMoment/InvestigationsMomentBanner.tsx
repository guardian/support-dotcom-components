import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Container, Hide } from '@guardian/src-layout';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { InvestigationsMomentBannerHeader } from './components/InvestigationsMomentBannerHeader';
import { InvestigationsMomentBannerArticleCount } from './components/InvestigationsMomentBannerArticleCount';
import { InvestigationsMomentBannerBody } from './components/InvestigationsMomentBannerBody';
import { InvestigationsMomentBannerCtas } from './components/InvestigationsMomentBannerCtas';
import { InvestigationsMomentBannerCloseButton } from './components/InvestigationsMomentBannerCloseButton';
import InvestigationsMomentBannerPolygon from './components/InvestigationsMomentBannerPolygon';

const styles = {
    container: css`
        position: relative;
        overflow: hidden;
        background: ${neutral[0]};
        border-top: 1px solid ${neutral[0]};

        * {
            box-sizing: border-box;
        }

        ${from.tablet} {
            background: ${neutral[100]};
        }
    `,
    desktopShadowRight: css`
        position: absolute;
        pointer-events: none;
        display: flex;
        justify-content: flex-end;
        top: 0;
        right: 0;
        width: 150px;
        height: 80px;

        ${from.mobileMedium} {
            width: 200px;
        }

        ${from.mobileLandscape} {
            width: 300px;
        }

        ${from.phablet} {
            width: 475px;
        }

        ${from.tablet} {
            bottom: 0;
            width: auto;
            height: auto;
        }

        svg {
            display: block;
            height: 100%;

            ${from.tablet} {
                height: 90%;
            }

            ${from.desktop} {
                height: 95%;
            }

            ${from.leftCol} {
                height: 90%;
            }
        }
    `,
    desktopShadowBottom: css`
        position: absolute;
        pointer-events: none;
        bottom: 0;
        left: 0;
        right: 20px;

        svg {
            display: block;
        }

        ${from.wide} {
            height: 125px;
            width: 1250px;
            right: auto;
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
            justify-content: flex-end;
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

function InvestigationsMomentBanner({
    content,
    onCloseClick,
    numArticles,
    onCtaClick,
    onSecondaryCtaClick,
    separateArticleCount,
}: BannerRenderProps) {
    return (
        <Container cssOverrides={styles.container}>
            <div css={styles.headerContainer}>
                <InvestigationsMomentBannerHeader
                    heading={content.mainContent.heading}
                    mobileHeading={content.mobileContent?.heading ?? null}
                />
            </div>
            <div css={styles.bottomContainer}>
                {separateArticleCount && numArticles !== undefined && numArticles > 5 && (
                    <section>
                        <InvestigationsMomentBannerArticleCount numArticles={numArticles} />
                    </section>
                )}

                <section css={styles.bodyContainer}>
                    <InvestigationsMomentBannerBody
                        messageText={content.mainContent.paragraphs}
                        mobileMessageText={content.mobileContent?.paragraphs ?? null}
                        highlightedText={content.mainContent.highlightedText ?? null}
                        mobileHighlightedText={content.mobileContent?.highlightedText ?? null}
                    />
                </section>

                <section css={styles.ctasContainer}>
                    <InvestigationsMomentBannerCtas
                        desktopCtas={{
                            primary: content.mainContent.primaryCta,
                            secondary: content.mainContent.secondaryCta,
                        }}
                        mobileCtas={
                            content.mobileContent
                                ? {
                                      primary: content.mobileContent.primaryCta,
                                      secondary: content.mobileContent.secondaryCta,
                                  }
                                : null
                        }
                        onPrimaryCtaClick={onCtaClick}
                        onSecondaryCtaClick={onSecondaryCtaClick}
                    />
                </section>
            </div>
            <Hide above="mobileMedium">
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowRight}
                    viewBox="0 0 150 80"
                    polygonPoints="0 0, 150 0, 150 80"
                />
            </Hide>
            <Hide below="mobileMedium" above="mobileLandscape">
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowRight}
                    viewBox="0 0 200 80"
                    polygonPoints="0 0, 200 0, 200 80"
                />
            </Hide>
            <Hide below="mobileLandscape" above="phablet">
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowRight}
                    viewBox="0 0 300 80"
                    polygonPoints="0 0, 300 0, 300 80"
                />
            </Hide>
            <Hide below="phablet" above="tablet">
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowRight}
                    viewBox="0 0 475 80"
                    polygonPoints="0 0, 475 0, 475 80"
                />
            </Hide>
            <Hide below="tablet" above="desktop">
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowRight}
                    viewBox="0 0 100 200"
                    polygonPoints="0 0, 100 0, 100 200"
                />
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowBottom}
                    viewBox="0 0 1000 100"
                    polygonPoints="0 100, 1000 100, 0 0"
                />
            </Hide>
            <Hide below="desktop" above="leftCol">
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowRight}
                    viewBox="0 0 300 400"
                    polygonPoints="0 0, 300 0, 300 400"
                />
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowBottom}
                    viewBox="0 0 1000 100"
                    polygonPoints="0 100, 1000 100, 0 0"
                />
            </Hide>
            <Hide below="leftCol" above="wide">
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowRight}
                    viewBox="0 0 350 400"
                    polygonPoints="0 0, 350 0, 350 400"
                />
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowBottom}
                    viewBox="0 0 1000 100"
                    polygonPoints="0 100, 1000 100, 0 0"
                />
            </Hide>
            <Hide below="wide">
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowRight}
                    viewBox="0 0 530 400"
                    polygonPoints="0 0, 530 0, 530 400"
                />
                <InvestigationsMomentBannerPolygon
                    cssOverrides={styles.desktopShadowBottom}
                    viewBox="0 0 1000 100"
                    polygonPoints="0 100, 1000 100, 0 0"
                />
            </Hide>
            <div css={styles.closeButtonContainer}>
                <InvestigationsMomentBannerCloseButton onCloseClick={onCloseClick} />
            </div>
        </Container>
    );
}

const unvalidated = bannerWrapper(InvestigationsMomentBanner, 'investigations-moment-banner');
const validated = validatedBannerWrapper(
    InvestigationsMomentBanner,
    'investigations-moment-banner',
);

export {
    validated as InvestigationsMomentBanner,
    unvalidated as InvestigationsMomentBannerUnvalidated,
};
