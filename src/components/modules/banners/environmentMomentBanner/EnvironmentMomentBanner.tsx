import React, { useState } from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { BannerProps } from '../../../../types/BannerTypes';
import { setContributionsBannerClosedTimestamp } from '../localStorage';
import EnvironmentMomentBannerHeader from './components/EnvironmentMomentBannerHeader';

const container = css`
    padding: ${space[3]}px 0;
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
                    <EnvironmentMomentBannerHeader />
                </div>
            ) : null}
        </>
    );
};

export default EnvironmentMomentBanner;
