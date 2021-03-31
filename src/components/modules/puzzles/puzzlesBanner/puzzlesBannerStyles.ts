import { css } from '@emotion/core';
import { between, from, until } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography/cjs';
import { neutral, lifestyle } from '@guardian/src-foundations/palette';
import { breakpoints, space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

export const squareBorder = `2px solid ${neutral[0]}`;

export const squareBoxShadow = '0px 6px 0px rgba(0, 0, 0, 0.25)';

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
    background-color: ${lifestyle[300]};
    color: ${neutral[100]};
    border: ${squareBorder};

    ${until.tablet} {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
`;

export const bannerContents = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${from.tablet} {
        flex-direction: row;
        height: 260px;
    }

    ${from.desktop} {
        height: 344px;
    }
`;

export const squaresContainer = css`
    position: relative;
    display: flex;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
    max-width: 690px;

    ${until.tablet} {
        position: absolute;
        bottom: 50px;
        right: 0;
    }

    ${from.desktop} {
        padding-right: 44px;
    }
`;

export const headingSection = css`
    max-width: 500px;
    margin-right: ${space[6]}px;
`;

export const heading = css`
    ${headline.large({ fontWeight: 'bold' })};
    margin: 0 0 ${space[6]}px;

    ${between.tablet.and.desktop} {
        ${headline.small({ fontWeight: 'bold' })}
    }

    ${from.leftCol} {
        font-size: 66px;
    }
`;

export const appStoreButtonContainer = css`
    display: flex;
    flex-direction: column;

    a {
        margin-bottom: ${space[2]}px;
    }

    ${from.leftCol} {
        flex-direction: row;

        a:not(:last-of-type) {
            margin-right: ${space[4]}px;
        }
    }
`;

export const minimiseButtonContainer = css`
    & > * {
        padding: ${space[2]}px;
        justify-content: flex-end;

        ${between.tablet.and.desktop} {
            padding-bottom: ${space[3]}px;
        }
    }
`;

export const minimiseButton = css`
    border: none;
    background-color: ${neutral[97]};
    color: ${neutral[7]};
    align-self: flex-end;

    &:hover {
        background-color: ${neutral[7]};
        color: ${neutral[97]};
    }
`;

export const imageContainer = css`
    pointer-events: none;
    display: none;
    z-index: 3;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;

    ${from.tablet} {
        display: flex;
        padding-right: 12%;
    }

    ${from.desktop} {
        padding-right: 20%;
    }

    picture {
        pointer-events: all;
        display: flex;
        align-items: flex-end;
    }
`;

export const hide = css`
    display: none;
`;

export const minimiseHint = css`
    ${textSans.small()}
    margin: ${space[1]}px 0;
    display: flex;
    align-items: center;

    svg {
        margin-right: ${space[1]}px;
        fill: currentColor;
        height: 1.25em;
    }
`;

function paddingOffsetFor(breakpointWidth: number) {
    return `calc((100vw - ${breakpointWidth - space[5]}px) / 2)`;
}

export const minimisedBanner = css`
    border-radius: 2px 0 0 0;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 136px;
    width: auto;
    border-right: none;
    transition: width 1s;

    ${from.mobileLandscape} {
        height: 176px;
    }

    /* Maintain a right-hand offset that matches the edge of the main container */
    ${from.tablet} {
        border-right: ${squareBorder};
        padding-right: ${paddingOffsetFor(breakpoints.tablet)};
    }

    ${from.desktop} {
        padding-right: ${paddingOffsetFor(breakpoints.desktop)};
    }

    ${from.leftCol} {
        padding-right: ${paddingOffsetFor(breakpoints.leftCol)};
    }

    ${from.wide} {
        padding-right: ${paddingOffsetFor(breakpoints.wide)};
    }
`;

const minimisedContainerSize = {
    mobile: 132,
    tablet: 172,
};

export const minimisedContentContainer = css`
    position: relative;
    width: ${minimisedContainerSize.mobile}px;
    height: ${minimisedContainerSize.mobile}px;

    ${from.mobileLandscape} {
        width: ${minimisedContainerSize.tablet}px;
        height: ${minimisedContainerSize.tablet}px;
    }
`;
