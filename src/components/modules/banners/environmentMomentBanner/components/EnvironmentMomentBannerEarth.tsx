import React from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import IconRedEarth from './IconRedEarth';
import IconBlueEarth from './IconBlueEarth';

const container = css`
    position: relative;
    img {
        width: 100%;
        display: block;
    }
`;

const redEarthContainer = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    img {
        opacity: 0.8;
    }
`;

const EnvironmentMomentBannerEarth: React.FC = () => (
    <div css={container}>
        <IconBlueEarth />
        <div css={redEarthContainer}>
            <IconRedEarth />
        </div>
    </div>
);

export default EnvironmentMomentBannerEarth;
