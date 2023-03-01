import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Container } from '@guardian/src-layout';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { InvestigationsMomentBannerHeader } from './components/InvestigationsMomentBannerHeader';
import { InvestigationsMomentBannerArticleCount } from './components/InvestigationsMomentBannerArticleCount';
import { InvestigationsMomentBannerBody } from './components/InvestigationsMomentBannerBody';
import { InvestigationsMomentBannerCtas } from './components/InvestigationsMomentBannerCtas';
import { InvestigationsMomentBannerCloseButton } from './components/InvestigationsMomentBannerCloseButton';
import InvestigationsMomentBannerPolygons from './InvestigationsMomentBannerPolygon';

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
    desktopShadowRight: css``,
    desktopShadowBottom: css`
        display: none;

        ${from.tablet} {
            display: block;
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
            margin-right: -85px;
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
    topright: css`
        ${from.mobileMedium} {
            display: none;
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
    const viewBoxsTopRight: string[] = [
        '0 0 150 80',
        '0 0 200 80',
        '0 0 300 80',
        '0 0 475 80',
        '0 0 100 200',
        '0 0 300 400',
        '0 0 350 400',
        '0 0 530 400',
    ];
    const polygonPointsTopRight: string[] = [
        '0 0, 150 0, 150 80',
        '0 0, 200 0, 200 80',
        '0 0, 300 0, 300 80',
        '0 0, 475 0, 475 80',
        '0 0, 100 0, 100 200',
        '0 0, 300 0, 300 400',
        '0 0, 350 0, 350 400',
        '0 0, 530 0, 530 400',
    ];
    const viewBoxsBottomLeft: string[] = [
        '0 0 1000 100',
        '0 0 1000 100',
        '0 0 1000 100',
        '0 0 1000 100',
    ];
    const polygonPointsBottomLeft: string[] = [
        '0 100, 1000 100, 0 0',
        '0 100, 1000 100, 0 0',
        '0 100, 1000 100, 0 0',
        '0 100, 1000 100, 0 0',
    ];

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
            <InvestigationsMomentBannerPolygons
                viewBoxsTopRight={viewBoxsTopRight}
                polygonPointsTopRight={polygonPointsTopRight}
                viewBoxsBottomLeft={viewBoxsBottomLeft}
                polygonPointsBottomLeft={polygonPointsBottomLeft}
                cssOverridesTopRight={styles.desktopShadowRight}
                cssOverridesBottomLeft={styles.desktopShadowRight}
            />

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
