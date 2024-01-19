import { css } from '@emotion/react';
import { body, headline } from '@guardian/source-foundations';
import { from } from '@guardian/source-foundations';
import { brand, brandAlt, neutral, space } from '@guardian/source-foundations';
import { height } from '@guardian/source-foundations';

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
    background-color: #f1f8fc;
    color: ${neutral[0]};
    position: relative;
    b,
    strong {
        font-weight: bold;
    }
`;

export const containerOverrides = css`
    width: initial;

    max-width: 100%;
    overflow: hidden;

    // TO-DO: Strip out unnecessary styles
    border-top: 1px solid ${brand[400]};

    > div:first-of-type {
        // for the close button
        position: relative;
    }
`;

export const copyColumn = css`
    padding-top: ${space[4]}px;
`;

export const choiceCardsColumn = css`
    align-items: center;
    ${from.tablet} {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

export const columnMarginOverrides = css`
    margin-right: 0 !important;
`;

export const heading = css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    font-size: 22px;
    margin: 0 0 ${space[3]}px;
    color: ${brand[400]};

    ${from.mobileMedium} {
        font-size: 24px;
        max-width: calc(100% - ${height.ctaSmall * 2 + space[2]}px);
    }

    ${from.tablet} {
        font-size: 34px;
        max-width: 100%;
    }

    ${from.desktop} {
        font-size: 42px;
        line-height: 100%;
    }
`;

export const paragraph = css`
    ${body.small()};
    line-height: 135%;
    margin: 0 0 ${space[1]}px;
    max-width: 100%;

    ${from.tablet} {
        font-size: 17px;
    }
`;

export const highlightedTextBlueBanner = css`
    background-color: ${brandAlt[400]};
    font-weight: bold;
`;

export const iconAndClosePosition = css`
    padding-top: ${space[3]}px;
    position: absolute;
    right: 0;
    width: max-content;
`;

export const closeButtonStyles = css`
    z-index: 999;
    border: 1px solid ${brand[400]};
`;

export const logoContainer = css`
    display: none;
    ${from.tablet} {
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
