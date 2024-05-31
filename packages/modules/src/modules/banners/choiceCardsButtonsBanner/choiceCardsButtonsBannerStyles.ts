import { css, SerializedStyles } from '@emotion/react';
import {
    body,
    headline,
    from,
    brand,
    brandAlt,
    neutral,
    space,
    height,
} from '@guardian/source/foundations';

export const banner = (backgroundColor: string): SerializedStyles => css`
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
    background-color: ${backgroundColor};
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

    > div:first-of-type {
        // for the close button
        position: relative;
    }
`;

export const copyColumn = css`
    padding-top: 10px;

    ${from.desktop} {
        padding-top: ${space[3]}px;
    }
`;

export const choiceCardsColumn = css`
    align-items: center;
    ${from.tablet} {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
`;

export const columnMarginOverrides = css`
    margin-right: 0 !important;
    ${from.tablet} {
        margin-bottom: ${space[4]}px !important;
    }
`;

export const choiceCardVerticalAlignment = css`
    ${from.tablet} {
        justify-content: flex-start;
        margin-top: 6.6rem;
    }
    ${from.desktop} {
        margin-top: 7.6rem;
    }
`;

export const heading = (headingColor: string): SerializedStyles => css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    font-size: 22px;
    margin: 0 ${space[12]}px ${space[4]}px 0;
    color: ${headingColor};

    ${from.mobileMedium} {
        font-size: 24px;
        margin-right: 0px;
        max-width: calc(100% - ${height.ctaSmall * 2 + space[2]}px);
    }

    ${from.tablet} {
        font-size: 34px;
        max-width: 100%;
    }

    ${from.desktop} {
        font-size: 42px;
        line-height: 100%;
        margin-bottom: 22px;
    }
`;

export const paragraph = css`
    ${body.small()};
    line-height: 135%;
    margin: 0 0 ${space[4]}px;
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
