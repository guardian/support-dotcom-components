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
    postiion: relative;
    overflow: hidden;
`;

const contentContainer = css`
    display: flex;
    flex-direction: column;

    ${from.tablet} {
        flex-direction: row-reverse;
    }
`;

const closeButtonContainer = css`
    position: absolute;
    z-index: 100;
    top: ${space[3]}px;
    right: ${space[3]}px;
    overflow: hidden;
`;

const earthContainer = css`
    z-index: 100;
    width: 200%;
    margin-top: -150%;
    margin-left: -50%;
    margin-bottom: ${space[4]}px;

    ${from.tablet} {
        width: 200%;
        margin-top: -50%;
        margin-left: -${space[9]}px;
        margin-right: -50%;
        margin-bottom: ${space[4]}px;
    }
`;

const bodyAndCtasContainer = css`
    margin-top: ${space[1]}px;
    padding: 0 ${space[3]}px ${space[5]}px ${space[3]}px;

    & > * + * {
        margin-top: ${space[3]}px;
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
                        <div css={earthContainer}>
                            <EnvironmentMomentBannerEarth />
                        </div>
                        <div>
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
