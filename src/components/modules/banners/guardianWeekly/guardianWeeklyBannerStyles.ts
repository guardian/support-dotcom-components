import { css } from '@emotion/core';
import { body, headline, textSans } from '@guardian/src-foundations/typography/cjs';
import { neutral, text } from '@guardian/src-foundations/palette';
import { between, from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { height } from '@guardian/src-foundations/size';

const mainBannerBackground = '#66c2e9';

export const banner = css`
    html {
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${mainBannerBackground};
    color: ${neutral[7]};
    position: relative;

    a,
    button {
        color: inherit;
    }
`;

export const columns = css`
    position: relative;

    ${between.tablet.and.desktop} {
        position: static;
    }
`;

export const topLeftComponent = css`
    padding-top: ${space[2]}px;

    ${between.tablet.and.desktop} {
        /* TODO: When we upgrade Source we can ditch this in favour of the responsive column width prop */
        width: calc((100% + 20px) * 0.4 - 20px);
    }
`;

export const heading = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
    margin: 0;
    max-width: 80%;

    ${from.mobileLandscape} {
        max-width: 70%;
    }

    ${from.phablet} {
        max-width: 100%;
    }

    ${from.mobileMedium} {
        ${headline.small({ fontWeight: 'bold' })};
    }

    ${from.desktop} {
        ${headline.large({ fontWeight: 'bold' })};
        line-height: 100%;
    }

    ${from.leftCol} {
        max-width: 90%;
    }
`;

export const paragraph = css`
    ${body.medium()};
    line-height: 135%;
    margin: ${space[2]}px 0 ${space[6]}px;
    max-width: 100%;

    ${from.desktop} {
        font-size: 20px;
    }
`;

export const siteMessage = css`
    margin: ${space[2]}px 0 ${space[4]}px;
    ${textSans.small()};
    color: ${text.primary};
    a,
    :visited {
        color: ${text.primary};
        font-weight: bold;
    }
`;

export const bottomRightComponent = css`
    margin-bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const packShotContainer = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin: 0;
    padding-top: ${space[2]}px;
    min-height: 170px;
    height: 100%;
    width: 100%;

    ${between.tablet.and.desktop} {
        position: static;
    }

    ${from.desktop} {
        flex-direction: row;
        align-self: flex-end;
        padding-top: ${height.ctaSmall + space[1]}px;
    }

    ${from.wide} {
        padding-top: ${space[4]}px;
    }

    picture {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: flex-end;
        align-items: flex-end;
        ${between.tablet.and.desktop} {
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }

    img {
        max-width: 100%;
        height: 100%;
    }
`;

export const iconAndClosePosition = css`
    display: flex;
    justify-content: flex-end;
    padding-top: ${space[2]}px;
    min-width: ${height.ctaMedium * 2}px;

    ${until.leftCol} {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
    }

    ${between.tablet.and.desktop} {
        padding-right: ${space[2]}px;
    }
`;

export const logoContainer = css`
    display: none;
    ${from.mobileMedium} {
        display: block;
        width: ${height.ctaSmall}px;
        height: ${height.ctaSmall}px;
        svg {
            width: 100%;
        }
    }
    ${from.leftCol} {
        margin-left: ${space[3]}px;
    }
`;
