import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { InvestigationsMomentBannerHeader } from './components/InvestigationsMomentBannerHeader';
import { InvestigationsMomentBannerArticleCount } from './components/InvestigationsMomentBannerArticleCount';
import { InvestigationsMomentBannerBody } from './components/InvestigationsMomentBannerBody';
import { InvestigationsMomentBannerCtas } from './components/InvestigationsMomentBannerCtas';
import { Container, Hide } from '@guardian/src-layout';

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
        display: flex;
        justify-content: flex-end;
        top: 0;
        right: 0;
        bottom: 0;

        svg {
            display: block;
            height: 90%;
        }

        ${from.desktop} {
            svg {
                height: 95%;
            }
        }
    `,
    desktopShadowBottom: css`
        position: absolute;
        bottom: 0;
        left: 0;
        right: 20px;

        svg {
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
            margin-right: -65px;
        }
    `,
};

function InvestigationsMomentBanner({ content, onCloseClick, numArticles }: BannerRenderProps) {
    return (
        <Container cssOverrides={styles.container}>
            <div css={styles.headerContainer}>
                <InvestigationsMomentBannerHeader
                    heading={content.mainContent.heading}
                    mobileHeading={content.mobileContent?.heading ?? null}
                    onCloseClick={onCloseClick}
                />
            </div>

            <div css={styles.bottomContainer}>
                {numArticles && (
                    <section>
                        <InvestigationsMomentBannerArticleCount numArticles={numArticles} />
                    </section>
                )}

                <section css={styles.bodyContainer}>
                    <InvestigationsMomentBannerBody
                        messageText={content.mainContent.messageText}
                        mobileMessageText={content.mobileContent?.messageText ?? null}
                    />
                </section>

                <section css={styles.ctasContainer}>
                    <InvestigationsMomentBannerCtas
                        primaryCta={content.mainContent.primaryCta}
                        secondaryCta={content.mainContent.secondaryCta}
                        mobilePrimaryCta={content.mobileContent?.primaryCta ?? null}
                        mobileSecondaryCta={content.mobileContent?.secondaryCta ?? null}
                    />
                </section>
            </div>

            <Hide below="tablet" above="desktop">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 100 0, 100 200" />
                    </svg>
                </div>

                <div css={styles.desktopShadowBottom}>
                    <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 100, 1000 100, 0 0" />
                    </svg>
                </div>
            </Hide>

            <Hide below="desktop">
                <div css={styles.desktopShadowRight}>
                    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 300 0, 300 400" />
                    </svg>
                </div>

                <div css={styles.desktopShadowBottom}>
                    <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 100, 1000 100, 0 0" />
                    </svg>
                </div>
            </Hide>
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
