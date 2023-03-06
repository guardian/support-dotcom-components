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
        padding: 0 0 ${space[3]}px;

        ${from.tablet} {
            max-width: 88%;
            padding-bottom: 54px;
        }
        ${from.desktop} {
            max-width: 80%;
            padding-bottom: 62px;
        }
        ${from.leftCol} {
            max-width: 82%;
        }
        ${from.wide} {
            max-width: 78%;
        }
    `,
    bodyContainer: css`
        display: flex;
        flex-direction: column;
        margin-top: ${space[1]}px;

        ${from.tablet} {
            flex-direction: row;
        }
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: column;
        margin-top: ${space[4]}px;

        ${from.tablet} {
            margin-top: ${space[2]}px;
            justify-content: flex-end;
            margin-right: 0px;
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
                </section>
            </div>

            <Hide above="mobileMedium">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 150 0, 150 80" />
                    </svg>
                </div>
            </Hide>

            <Hide below="mobileMedium" above="mobileLandscape">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 200 0, 200 80" />
                    </svg>
                </div>
            </Hide>

            <Hide below="mobileLandscape" above="phablet">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 300 0, 300 80" />
                    </svg>
                </div>
            </Hide>

            <Hide below="phablet" above="tablet">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 475 80" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 475 0, 475 80" />
                    </svg>
                </div>
            </Hide>

            <Hide below="tablet" above="desktop">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 100 0, 100 200" />
                    </svg>
                </div>

                <div css={styles.desktopShadowBottom}>
                    <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 100, 1000 100, 0 35" />
                    </svg>
                </div>
            </Hide>

            <Hide below="desktop" above="leftCol">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 300 0, 300 400" />
                    </svg>
                </div>

                <div css={styles.desktopShadowBottom}>
                    <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 100, 1000 100, 0 40" />
                    </svg>
                </div>
            </Hide>

            <Hide below="leftCol" above="wide">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 350 400" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 350 0, 350 400" />
                    </svg>
                </div>

                <div css={styles.desktopShadowBottom}>
                    <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 100, 1000 100, 0 45" />
                    </svg>
                </div>
            </Hide>

            <Hide below="wide">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 530 400" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 530 0, 530 400" />
                    </svg>
                </div>

                <div css={styles.desktopShadowBottom}>
                    <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 100, 1000 100, 0 55" />
                    </svg>
                </div>
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
