import { css, SerializedStyles } from '@emotion/react';
import { body, headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, neutral, space } from '@guardian/src-foundations';
import { height } from '@guardian/src-foundations/size';

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

export const containerOverrides = (borderTopColor?: string): SerializedStyles => css`
    border-top: ${borderTopColor ? 1 : 0}px solid ${borderTopColor};
    width: initial;

    max-width: 100%;
    overflow: hidden;

    > div:first-of-type {
        // for the close button
        position: relative;
    }
`;

export const copyColumn = css`
    padding-top: ${space[4]}px;
`;

export const choiceCardsColumn = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;

export const columnMarginOverrides = css`
    margin-right: 0 !important;
`;

export const heading = (headingColor: string): SerializedStyles => css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    font-size: 22px;
    margin: 0;
    color: ${headingColor};

    ${from.mobileMedium} {
        font-size: 24px;
        max-width: calc(100% - ${height.ctaSmall * 2 + space[2]}px);
    }

    ${from.tablet} {
        font-size: 42px;
        max-width: 100%;
    }

    ${from.desktop} {
        line-height: 100%;
    }
`;

export const paragraph = css`
    ${body.small()};
    line-height: 135%;
    margin: ${space[4]}px 0 ${space[1]}px;
    max-width: 100%;

    ${from.tablet} {
        margin-bottom: ${space[5]}px;
        font-size: 17px;
    }
`;

export const highlightedTextBlueBanner = css`
    background-color: ${brandAlt[400]};
    font-weight: bold;
`;

export const highlightedTextYellowBanner = css`
    background-color: ${neutral[100]};
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
