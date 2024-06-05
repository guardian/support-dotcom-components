import React from 'react';
import { css } from '@emotion/react';
import { from, space, neutral } from '@guardian/source/foundations';
import { EnvironmentBannerEarth } from './components/EnvironmentBannerEarth';
import { EnvironmentBannerHeader } from './components/EnvironmentBannerHeader';
import { EnvironmentBannerArticleCount } from './components/EnvironmentBannerArticleCount';
import { EnvironmentBannerBody } from './components/EnvironmentBannerBody';
import { EnvironmentBannerCtas } from './components/EnvironmentBannerCtas';
import { EnvironmentBannerCloseButton } from './components/EnvironmentBannerCloseButton';
import { EnvironmentBannerRoundel } from './components/EnvironmentBannerRoundel';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { GREEN_HEX } from './utils/constants';
import type { ReactComponent } from '../../../types';

const container = css`
    position: relative;
    border-top: 1px solid ${GREEN_HEX};
    overflow: hidden;
    background: ${neutral[97]};
`;

const banner = css`
    position: relative;
    margin: 0 auto;
    max-width: 1300px;
`;

const contentContainer = css`
    display: flex;
    flex-direction: column;

    ${from.tablet} {
        display: block;
    }
`;

const closeButtonAndRoundelContainer = css`
    position: absolute;
    z-index: 200;
    top: ${space[3]}px;
    right: ${space[3]}px;
    overflow: hidden;
    display: flex;
    flex-direction: row;

    & > * + * {
        margin-left: ${space[2]}px;
    }

    ${from.tablet} {
        top: ${space[5]}px;
        right: ${space[5]}px;
    }

    ${from.wide} {
        right: ${space[9]}px;
    }
`;

const earthContainerContainer = css`
    position: relative;
    z-index: 100;

    ${from.tablet} {
        position: absolute;
        top: 0;
        right: 0;
        width: 45%;
    }

    ${from.desktop} {
        width: 40%;
    }

    ${from.wide} {
        width: 50%;
    }
`;

const earthContainer = css`
    width: 200%;
    margin-top: -150%;
    margin-left: -50%;

    ${from.tablet} {
        width: 205%;
        margin-top: -55%;
        margin-left: 0;
    }

    ${from.desktop} {
        width: 800px;
    }

    ${from.wide} {
        width: 880px;
        margin-top: -360px;
    }
`;

const textContainer = css`
    ${from.tablet} {
        width: 60%;
        margin-right: -${space[9]}px;
    }

    ${from.desktop} {
        width: 65%;
    }

    ${from.wide} {
        width: 55%;
    }
`;

const bodyAndCtasContainer = css`
    box-sizing: border-box;
    margin-top: ${space[1]}px;
    padding: 0 ${space[3]}px ${space[5]}px ${space[3]}px;

    ${from.tablet} {
        margin-top: ${space[3]}px;
        padding: 0 48px ${space[5]}px ${space[9]}px;
    }

    ${from.desktop} {
        padding-left: 82px;
        padding-right: 68px;
    }

    ${from.leftCol} {
        padding-left: 90px;
    }

    ${from.wide} {
        margin-top: ${space[4]}px;
        padding-right: 15%;
    }
`;

const bodyContainer = css`
    margin-top: ${space[1]}px;

    ${from.tablet} {
        margin-top: ${space[3]}px;
    }
`;

const ctasContainer = css`
    margin-top: ${space[3]}px;

    ${from.tablet} {
        margin-top: ${space[4]}px;
    }
`;

const lineContainer = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 141px;
    box-sizing: border-box;
    border-bottom: 1px solid ${GREEN_HEX};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    display: none;

    ${from.wide} {
        display: flex;
    }
`;

const line = css`
    width: 100%;
    border-top: 1px solid ${GREEN_HEX};
`;

const EnvironmentBanner: ReactComponent<BannerRenderProps> = ({
    content,
    onCloseClick,
    onCtaClick,
    onSecondaryCtaClick,
    articleCounts,
    countType,
    isSupporter,
    separateArticleCount,
}: BannerRenderProps) => {
    const numArticles = articleCounts[countType ?? 'for52Weeks'];
    const showArticleCount =
        separateArticleCount && !isSupporter && numArticles !== undefined && numArticles > 5;

    return (
        <div css={container}>
            <div css={lineContainer}>
                <div css={line} />
            </div>
            <div css={banner}>
                <div css={closeButtonAndRoundelContainer}>
                    <EnvironmentBannerRoundel />
                    <EnvironmentBannerCloseButton onClick={onCloseClick} />
                </div>
                <div css={contentContainer}>
                    <div css={earthContainerContainer}>
                        <div css={earthContainer}>
                            <EnvironmentBannerEarth />
                        </div>
                    </div>
                    <div css={textContainer}>
                        <EnvironmentBannerHeader />

                        <div css={bodyAndCtasContainer}>
                            {showArticleCount && (
                                <div>
                                    <EnvironmentBannerArticleCount numArticles={numArticles} />
                                </div>
                            )}

                            <div css={bodyContainer}>
                                <EnvironmentBannerBody
                                    messageText={content.mainContent.paragraphs}
                                    mobileMessageText={content.mobileContent?.paragraphs ?? null}
                                />
                            </div>

                            <div css={ctasContainer}>
                                <EnvironmentBannerCtas
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const unvalidated = bannerWrapper(EnvironmentBanner, 'environment-banner');
const validated = validatedBannerWrapper(EnvironmentBanner, 'environment-banner');

export { validated as EnvironmentBanner, unvalidated as EnvironmentBannerUnvalidated };
