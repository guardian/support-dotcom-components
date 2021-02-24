import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography/cjs';

export const container = css`
    position: relative;
    height: 100%;
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
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const appStoreBadges = css`
    display: flex;
    align-items: center;
    margin-bottom: 66px;
`;

export const packshot = css`
    display: flex;
    align-items: flex-end;
    min-height: 300px;
`;

export const heading = css`
    ${headline.xlarge({ fontWeight: 'bold' })}
    font-size: 66px;
    margin: 0;
`;
