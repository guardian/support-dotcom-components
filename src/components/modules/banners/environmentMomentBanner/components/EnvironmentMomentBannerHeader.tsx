import React from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import IconPen from './IconPen';

const container = css`
    position: relative;
    display: flex;
    flex-direction: row;
    border-top: 1px solid ${neutral[86]};
    border-bottom: 1px solid ${neutral[86]};
`;

const iconAndTextContainer = css`
    display: flex;
    position: relative;
    z-index: 100;
    margin-left: ${space[4]}px;
`;

const iconContainer = css`
    height: 55px;
    img {
        height: 100%;
        display: block;
    }
`;

const textContainer = css`
    display: flex;
    flex-direction: column;
    margin-left: ${space[2]}px;
    ${headline.xsmall({ fontWeight: 'bold' })}
    white-space: nowrap;
`;

const lineContainer = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
`;
const line = css`
    width: 100%;
    border-top: 1px solid ${neutral[86]};
`;

const EnvironmentMomentBannerHeader: React.FC = () => (
    <header css={container}>
        <div css={iconAndTextContainer}>
            <div css={iconContainer}>
                <IconPen />
            </div>
            <div css={textContainer}>
                <span>Our climate promise</span>
                <span>to you</span>
            </div>
        </div>
        <div css={lineContainer}>
            <div css={line} />
        </div>
    </header>
);

export default EnvironmentMomentBannerHeader;
