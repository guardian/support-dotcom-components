import React, { useState } from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { BannerProps } from '../../../../types/BannerTypes';
import { setContributionsBannerClosedTimestamp } from '../localStorage';
import EnvironmentMomentBannerEarth from './components/EnvironmentMomentBannerEarth';
import EnvironmentMomentBannerHeader from './components/EnvironmentMomentBannerHeader';
import EnvironmentMomentBannerBody from './components/EnvironmentMomentBannerBody';

const container = css`
    overflow: hidden;
`;

const earthContainer = css`
    width: 200%;
    margin-top: -150%;
    margin-left: -50%;
    margin-bottom: ${space[4]}px;
`;

const bodyContainer = css`
    margin-top: ${space[1]}px;
    padding: 0 ${space[3]}px;
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
                    <div css={earthContainer}>
                        <EnvironmentMomentBannerEarth />
                    </div>
                    <EnvironmentMomentBannerHeader />
                    <div css={bodyContainer}>
                        <EnvironmentMomentBannerBody />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default EnvironmentMomentBanner;
