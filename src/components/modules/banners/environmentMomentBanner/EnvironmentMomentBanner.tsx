import React, { useState } from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { BannerProps } from '../../../../types/BannerTypes';
import EnvironmentMomentBannerEarth from './components/EnvironmentMomentBannerEarth';
import EnvironmentMomentBannerHeader from './components/EnvironmentMomentBannerHeader';
import EnvironmentMomentBannerBody from './components/EnvironmentMomentBannerBody';
import EnvironmentMomentBannerCtas from './components/EnvironmentMomentBannerCtas';

const container = css`
    overflow: hidden;
`;

const earthContainer = css`
    width: 200%;
    margin-top: -150%;
    margin-left: -50%;
    margin-bottom: ${space[4]}px;
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
    const [showBanner, ,] = useState(true);

    return (
        <>
            {showBanner ? (
                <div css={container}>
                    <div css={earthContainer}>
                        <EnvironmentMomentBannerEarth />
                    </div>
                    <EnvironmentMomentBannerHeader />
                    <div css={bodyAndCtasContainer}>
                        <EnvironmentMomentBannerBody />
                        <EnvironmentMomentBannerCtas />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default EnvironmentMomentBanner;
