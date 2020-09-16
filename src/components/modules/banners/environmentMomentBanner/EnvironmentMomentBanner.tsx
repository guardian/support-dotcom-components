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
import { setContributionsBannerClosedTimestamp } from '../localStorage';

const container = css`
    position: relative;
    overflow: hidden;
`;

const contentContainer = css`
    display: flex;
    flex-direction: column;

    ${from.tablet} {
        display: block;
    }
`;

const closeButtonContainer = css`
    position: absolute;
    z-index: 200;
    top: ${space[3]}px;
    right: ${space[3]}px;
    overflow: hidden;
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
`;

const earthContainer = css`
    width: 200%;
    margin-top: -150%;
    margin-left: -50%;
    margin-bottom: ${space[4]}px;
    transform: rotate(43deg);

    ${from.tablet} {
        width: 160%;
        margin-top: -50%;
        margin-left: 0;
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
`;

const EnvironmentMomentBanner: React.FC<BannerProps> = ({ tickerSettings }: BannerProps) => {
    if (!(tickerSettings && tickerSettings.tickerData)) {
        return null;
    }
    const [showBanner, setShowBanner] = useState(true);

    const closeBanner = (): void => {
        setContributionsBannerClosedTimestamp();
        setShowBanner(false);
    };

    return (
        <>
            {showBanner ? (
                <div css={container}>
                    <div css={closeButtonContainer}>
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

export default EnvironmentMomentBanner;
