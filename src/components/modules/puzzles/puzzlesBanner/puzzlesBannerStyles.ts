import { css } from '@emotion/core';
import { between, from, until } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography/cjs';
import { neutral, lifestyle } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';

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
    border: 2px solid ${neutral[0]};

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

export const buttonContainer = css`
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

export const collapseButton = css`
    border: none;
    background-color: ${neutral[97]};
    color: ${neutral[7]};
    align-self: flex-end;

    &:hover {
        background-color: ${neutral[7]};
        color: ${neutral[97]};
    }
`;

export const collapseButtonContainer = css`
    & > * {
        padding: ${space[2]}px;
        justify-content: flex-end;
    }
`;

export const imageContainer = css`
    display: none;
    z-index: 3;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;

    picture {
        display: flex;
        align-items: flex-end;
    }

    ${from.tablet} {
        display: flex;
        padding-right: 12%;
    }

    ${from.desktop} {
        padding-right: 20%;
    }
`;
