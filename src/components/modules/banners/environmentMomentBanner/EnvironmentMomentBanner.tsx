import React, { useState } from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { BannerProps } from '../../../../types/BannerTypes';
import EnvironmentMomentBannerEarth from './components/EnvironmentMomentBannerEarth';
import EnvironmentMomentBannerHeader from './components/EnvironmentMomentBannerHeader';
import EnvironmentMomentBannerBody from './components/EnvironmentMomentBannerBody';
import EnvironmentMomentBannerCtas from './components/EnvironmentMomentBannerCtas';
import EnvironmentMomentBannerCloseButton from './components/EnvironmentMomentBannerCloseButton';
import EnvironmentMomentBannerRoundel from './components/EnvironmentMomentBannerRoundel';
import { setContributionsBannerClosedTimestamp } from '../localStorage';

const container = css`
    position: relative;
    overflow: hidden;
    background: white;
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
        top: ${space[12]}px;
        right: ${space[24]}px;
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
        width: 55%;
        top: -700px;
    }
`;

const earthContainer = css`
    width: 200%;
    margin-top: -150%;
    margin-left: -50%;
    margin-bottom: ${space[4]}px;

    ${from.tablet} {
        width: 160%;
        margin-top: -50%;
        margin-left: 0;
    }

    ${from.wide} {
        width: 1280px;
        margin: 0;
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
    margin-top: ${space[1]}px;
    padding: 0 ${space[3]}px ${space[5]}px ${space[3]}px;

    & > * + * {
        margin-top: ${space[3]}px;
    }

    ${from.tablet} {
        padding: 0 48px ${space[9]}px ${space[9]}px;
        & > * + * {
            margin-top: ${space[6]}px;
        }
    }

    ${from.desktop} {
        margin-top: ${space[4]}px;
        padding-left: 130px;
        padding-right: 68px;
        & > * + * {
            margin-top: ${space[9]}px;
        }
    }

    ${from.wide} {
        width: 70%;
    }
`;

export const EnvironmentMomentBanner: React.FC<BannerProps> = ({}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);

    const closeBanner = (): void => {
        setContributionsBannerClosedTimestamp();
        setShowBanner(false);
    };

    return (
        <>
            {showBanner ? (
                <div css={container}>
                    <div css={closeButtonAndRoundelContainer}>
                        <EnvironmentMomentBannerRoundel />
                        <EnvironmentMomentBannerCloseButton onClick={closeBanner} />
                    </div>
                    <div css={contentContainer}>
                        <div css={earthContainerContainer}>
                            <div css={earthContainer}>
                                <EnvironmentMomentBannerEarth />
                            </div>
                        </div>
                        <div css={textContainer}>
                            <EnvironmentMomentBannerHeader />
                            <div css={bodyAndCtasContainer}>
                                <EnvironmentMomentBannerBody />
                                <EnvironmentMomentBannerCtas />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};
