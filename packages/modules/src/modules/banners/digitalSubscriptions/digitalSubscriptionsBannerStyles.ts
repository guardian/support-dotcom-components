import { css } from '@emotion/react';
import { body, headline, textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const mainBannerBackground = '#005689';
const closeButtonWidthHeight = 40;

// Phablet and lower
const mobilePackShotWidth = 400;
const mobilePackShotHeight = 240;
// Tablet and higher
const packShotWidth = 500;
const packShotHeight = 407;

export const banner = css`
    html {
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    strong {
        font-weight: bold;
    }
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${mainBannerBackground};
    color: ${neutral[100]};
`;

export const columns = css`
    position: relative;
`;

export const topLeftComponent = css`
    flex-grow: 1;
    padding: ${space[4]}px 0;
    ${until.tablet} {
        padding-bottom: 0;
    }
    ${from.tablet} {
        max-width: 60%;
    }
`;

export const bottomRightComponent = css`
    margin-bottom: 0;
`;

export const heading = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
    margin: 0;
    max-width: 100%;
    padding-right: ${closeButtonWidthHeight}px;

    @media (min-width: 740px) {
        max-width: 90%;
    }
    ${from.mobileLandscape} {
        ${headline.small({ fontWeight: 'bold' })};
    }

    ${from.tablet} {
        max-width: 100%;
    }
`;

export const headLineBreak = css`
    display: block;
    ${from.phablet} {
        display: none;
    }
`;

export const messageText = css`
    ${body.small()};
    line-height: 135%;
    margin: ${space[2]}px 0 ${space[6]}px;
    max-width: 100%;

    ${from.tablet} {
        ${body.medium()}
        max-width: 80%;
    }

    ${from.tablet} {
        max-width: 100%;
    }

    ${from.desktop} {
        font-size: 20px;
        margin: ${space[3]}px 0 ${space[9]}px;
    }
`;

export const siteMessage = css`
    margin: ${space[3]}px 0 ${space[2]}px;
    ${textSans.small()};
    color: ${neutral[100]};
    a,
    :visited {
        color: ${neutral[100]};
        font-weight: bold;
    }
`;

export const packShotContainer = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    max-width: ${mobilePackShotWidth}px;
    height: 100%;

    ${from.tablet} {
        max-width: ${packShotWidth}px;
    }
`;

const imageWidthPercentage = 100;
const mobileImageWidthPercentage = 80;

export const packShot = css`
    position: relative;
    padding-bottom: ${(mobilePackShotHeight / mobilePackShotWidth) * mobileImageWidthPercentage}%;
    width: ${mobileImageWidthPercentage}%;
    margin: 0 auto;
    height: 100%;

    ${from.tablet} {
        padding-bottom: ${(packShotHeight / packShotWidth) * imageWidthPercentage}%;
        width: ${imageWidthPercentage}%;
        margin: 0;
    }

    img {
        position: absolute;
        bottom: 0;
        max-width: 100%;
        max-height: 100%;
    }

    ${from.leftCol} {
        padding-bottom: 0;
        height: 100%;
    }
`;

export const iconPanel = css`
    ${from.desktop} {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        height: 100%;
        padding: ${space[4]}px 0;
        margin-left: ${space[4]}px;
    }
`;

export const logoContainer = css`
    display: none;

    ${from.desktop} {
        display: block;
        width: 100%;
        fill: ${neutral[100]};
        width: 70px;
    }

    ${from.leftCol} {
        width: 90px;
    }
`;

export const closeButton = css`
    ${until.desktop} {
        position: absolute;
        top: ${space[4]}px;
        right: 0;
    }
`;

export const closeButtonContainer = css`
    ${until.desktop} {
        width: 0;
        margin: 0;
    }
`;
