import { css } from '@emotion/react';
import { between, from, until } from '@guardian/src-foundations/mq';
import { neutral, lifestyle } from '@guardian/src-foundations/palette';
import { breakpoints, space } from '@guardian/source-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { squareBorder } from './puzzlesStyleUtils';

export const puzzlesBanner = css`
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

    @media print {
        &,
        & * {
            display: none;
        }
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

    ${until.mobileMedium} {
        bottom: 40px;
    }

    ${from.desktop} {
        padding-right: 44px;
    }
`;

export const headingSection = css`
    ${from.tablet} {
        margin-right: ${space[6]}px;
    }
`;

export const heading = css`
    ${headline.large({ fontWeight: 'bold' })};
    margin: 0 0 ${space[6]}px;

    ${until.mobileMedium} {
        display: inline-flex;
        width: 70%;
        ${headline.medium({ fontWeight: 'bold' })};
    }

    ${between.tablet.and.desktop} {
        ${headline.small({ fontWeight: 'bold' })};
    }

    ${from.leftCol} {
        font-size: 66px;
    }
`;

export const appStoreButtonContainer = css`
    display: flex;
    flex-direction: column;
    z-index: 3;
    position: relative;
    align-items: flex-start;

    a {
        margin-bottom: ${space[2]}px;
    }

    ${from.tablet} {
        flex-direction: row;

        a:not(:last-of-type) {
            margin-right: ${space[2]}px;
        }

        img {
            max-width: 90px;
        }
    }

    ${from.desktop} {
        img {
            max-width: 138px;
        }
    }

    ${from.leftCol} {
        img {
            max-width: 160px;
            width: 160px;
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
    align-self: flex-end;
    z-index: 20;
`;

export const minimiseButtonMin = css`
    background-color: ${neutral[97]};
    color: ${neutral[7]};

    &:hover {
        background-color: ${neutral[46]};
        color: ${neutral[97]};
    }
`;

export const minimiseButtonMax = css`
    background-color: ${neutral[97]};
    color: ${neutral[7]};

    ${from.tablet} {
        background-color: ${neutral[20]};
        color: ${neutral[100]};
    }

    &:hover {
        background-color: ${neutral[46]};
    }
`;

export const headerFlex = css`
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
`;

export const mobileMinimiseButton = css`
    display: inline-flex;
    align-self: flex-start;
    margin-top: ${space[3]}px;

    ${from.tablet} {
        display: none;
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
    ${until.desktop} {
        display: none;
    }

    ${textSans.small()}
    margin: ${space[1]}px 0;

    svg {
        position: relative;
        top: 0.25em;
        height: 1.25em;
        margin-right: ${space[1]}px;
        fill: currentColor;
    }
`;

function paddingOffsetFor(breakpointWidth: number) {
    return `calc((100vw - ${breakpointWidth - space[9]}px) / 2)`;
}

export const minimisedBanner = css`
    border-radius: 2px 0 0 0;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 62px;
    width: auto;
    border-right: none;
    transition: width 1s;

    ${from.mobileLandscape} {
        height: 65px;
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
    mobile: {
        width: 132,
        height: 62,
    },
    tablet: {
        width: 145,
        height: 64,
    },
};

export const minimisedContentContainer = css`
    position: relative;
    width: ${minimisedContainerSize.mobile.width}px;
    height: ${minimisedContainerSize.mobile.height}px;

    ${from.mobileLandscape} {
        width: ${minimisedContainerSize.tablet.width}px;
        height: ${minimisedContainerSize.tablet.height}px;
    }
`;

export const siteMessage = css`
    ${textSans.small()};
    position: absolute;
    bottom: 20px;

    ${until.tablet} {
        z-index: 30;
    }

    ${until.desktop} {
        ${textSans.xsmall()};
    }
`;

export const signInLink = css`
    font-weight: bold;
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    :hover {
        color: inherit;
    }
`;

export const showOnDesktop = css`
    display: none;
    ${between.tablet.and.leftCol} {
        display: block;
    }
`;
