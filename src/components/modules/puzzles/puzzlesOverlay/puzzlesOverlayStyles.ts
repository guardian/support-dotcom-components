import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography/cjs';

export const container = css`
    position: relative;
    height: 100vh;
    width: 100%;
`;

export const backgroundCanvas = css`
    position: absolute;
    top: 0;
    left: 0;
`;

export const contentContainer = css`
    pointer-events: none;
    position: relative;
    width: 500px;
    margin: 0 auto;
    padding-top: 100px;
`;

export const appStoreBadges = css`
    display: flex;
    align-items: center;
`;

export const heading = css`
    ${headline.xlarge({ fontWeight: 'bold' })}
    margin: 0;
`;
