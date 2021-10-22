import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { EnvironmentMomentBannerEarth } from './components/EnvironmentMomentBannerEarth';
import { EnvironmentMomentBannerHeader } from './components/EnvironmentMomentBannerHeader';
import { EnvironmentMomentBannerArticleCount } from './components/EnvironmentMomentBannerArticleCount';
import { EnvironmentMomentBannerBody } from './components/EnvironmentMomentBannerBody';
import { EnvironmentMomentBannerCtas } from './components/EnvironmentMomentBannerCtas';
import { EnvironmentMomentBannerCloseButton } from './components/EnvironmentMomentBannerCloseButton';
import { EnvironmentMomentBannerRoundel } from './components/EnvironmentMomentBannerRoundel';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { GREEN_HEX } from './utils/constants';

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

const EnvironmentMomentBanner: React.FC<BannerRenderProps> = ({
    content,
    onCloseClick,
    onCtaClick,
    onSecondaryCtaClick,
    numArticles,
    isSupporter,
}: BannerRenderProps) => {
    return (
        <div css={container}>
            <div css={lineContainer}>
                <div css={line} />
            </div>
            <div css={banner}>
                <div css={closeButtonAndRoundelContainer}>
                    <EnvironmentMomentBannerRoundel />
                    <EnvironmentMomentBannerCloseButton onClick={onCloseClick} />
                </div>
                <div css={contentContainer}>
                    <div css={earthContainerContainer}>
                        <div css={earthContainer}>
                            <EnvironmentMomentBannerEarth />
                        </div>
                    </div>
                    <div css={textContainer}>
                        <EnvironmentMomentBannerHeader isSupporter={isSupporter ?? false} />

                        <div css={bodyAndCtasContainer}>
                            {!isSupporter && numArticles !== undefined && numArticles > 5 && (
                                <div>
                                    <EnvironmentMomentBannerArticleCount
                                        numArticles={numArticles}
                                    />
                                </div>
                            )}

                            <div css={bodyContainer}>
                                <EnvironmentMomentBannerBody
                                    messageText={content.mainContent.messageText}
                                    mobileMessageText={content.mobileContent?.messageText ?? null}
                                />
                            </div>

                            <div css={ctasContainer}>
                                <EnvironmentMomentBannerCtas
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

const unvalidated = bannerWrapper(EnvironmentMomentBanner, 'environment-moment-banner');
const validated = validatedBannerWrapper(EnvironmentMomentBanner, 'environment-moment-banner');

export { validated as EnvironmentMomentBanner, unvalidated as EnvironmentMomentBannerUnvalidated };
