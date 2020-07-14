import React from 'react';
import { css } from 'emotion';
import { TickerSettings } from '../../lib/variants';
import { BannerTracking } from '../BannerTypes';

const bannerStyles = css`
    background-color: rgb(5, 41, 98);
    color: rgb(255, 255, 255);
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: -1px;
    right: 0px;
    z-index: 9999;
    border-top: 1px solid;
`;

export type BannerProps = {
    tracking: BannerTracking;
    isSupporter?: boolean;
    tickerSettings?: TickerSettings | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Banner: React.FC<BannerProps> = (props: BannerProps) => {
    return (
        <div className={bannerStyles}>
            <p>This is a banner</p>
        </div>
    );
};
