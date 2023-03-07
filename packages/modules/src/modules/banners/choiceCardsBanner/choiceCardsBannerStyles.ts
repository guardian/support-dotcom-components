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
    max-width: 100%;
    overflow: hidden;
`;

export const copyColumn = css`
    padding-top: ${space[4]}px;
`;

export const choiceCardsColumn = css`
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

export const heading = css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    font-size: 22px;
    margin: 0;
    color: ${neutral[0]};

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

export const highlightedText = css`
    background: ${neutral[100]};
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
