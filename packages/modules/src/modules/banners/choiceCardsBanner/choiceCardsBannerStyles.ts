import { css } from '@emotion/react';
import { body, headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, neutral, space } from '@guardian/src-foundations';
import { height } from '@guardian/src-foundations/size';

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
    width: 100%;
    background-color: ${brandAlt[400]};
    color: ${neutral[0]};
    position: relative;
    a,
    button {
        color: inherit;
    }
    a.link-button {
        color: black;
        background: white;
    }
    b,
    strong {
        font-weight: bold;
    }
`;

export const containerOverrides = css`
    position: relative;
`;

export const copyColumn = css`
    /* transform: translateY[6]}px); */
`;

export const imageColumn = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    ${from.tablet} {
        justify-content: center;
    }

    ${from.desktop} {
        justify-content: flex-end;
    }
`;

export const imageContainer = css`
    img {
        max-width: 100%;
        margin: 0 auto;
        display: block;
    }
    /* margin-bottom: -${space[1]}px; */
`;

export const heading = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
    margin: 0;
    color: ${neutral[0]};
    /* Headline should never overflow the close button (plus logo) */
    max-width: calc(100% - ${height.ctaSmall + space[1]}px);

    ${from.mobileMedium} {
        ${headline.small({ fontWeight: 'bold' })};
        max-width: calc(100% - ${height.ctaSmall * 2 + space[2]}px);
    }

    ${from.tablet} {
        max-width: 100%;
    }

    ${from.desktop} {
        ${headline.large({ fontWeight: 'bold' })};
        line-height: 100%;
    }

    ${from.leftCol} {
        max-width: 80%;
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

export const highlightedText = css`
    background: ${neutral[100]};
    font-weight: bold;
`;

export const iconAndClosePosition = css`
    /* display: flex;
    justify-content: flex-end;
    padding-top: ${space[2]}px; */
    /* min-width: ${height.ctaMedium * 2}px; */
    position: absolute;
    right: 0;
    width: max-content;
`;

export const closeButtonStyles = css`
    z-index: 999;
    border: 1px solid black;
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
