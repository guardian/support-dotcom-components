import { css } from 'emotion';
import { body, headline, textSans } from '@guardian/src-foundations/typography/cjs';
import { neutral } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
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
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #006d67;
    color: ${neutral[100]};
`;

export const contentContainer = css`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    ${from.tablet} {
        display: flex;
        flex-direction: row;
    }
    ${from.wide} {
        max-width: 1250px;
    }
`;

export const topLeftComponent = css`
    width: 100%;
    padding: ${space[4]}px;
    button {
        margin-left: ${space[3]}px;
    }
    ${from.tablet} {
        width: 65%;
    }

    ${from.desktop} {
        width: 50%;
    }

    ${from.wide} {
        width: 53%;
    }
`;

export const heading = css`
    ${headline.small({ fontWeight: 'bold' })};
    margin: 0;
    max-width: 100%;

    @media (max-width: 740px) {
        max-width: 90%;
    }

    ${until.mobileLandscape} {
        ${headline.xsmall({ fontWeight: 'bold' })};
    }
`;

export const headLineBreak = css`
    display: none;
    @media (min-width: 1040px) {
        display: block;
    }
`;

export const paragraph = css`
    ${body.medium()}
    line-height: 135%;
    margin: ${space[2]}px 0 ${space[6]}px;
    max-width: 100%;
    ${from.tablet} {
        max-width: 100%;
    }
    ${from.desktop} {
        font-size: 20px;
        margin: ${space[3]}px 0 ${space[9]}px;
    }
`;

export const buttonTextDesktop = css`
    display: none;
    ${from.desktop} {
        display: block;
    }
`;

export const buttonTextTablet = css`
    display: none;
    ${from.tablet} {
        display: block;
    }
    ${from.desktop} {
        display: none;
    }
`;

export const buttonTextMobile = css`
    display: block;
    ${from.tablet} {
        display: none;
    }
`;

export const siteMessage = css`
    margin: ${space[3]}px 0 ${space[4]}px;
    ${textSans.small()};
    color: ${neutral[100]};
    a,
    :visited {
        color: ${neutral[100]};
        font-weight: bold;
    }
`;

export const bottomRightComponent = css`
    display: flex;
    justify-content: center;
    width: 100%;

    ${from.tablet} {
        align-self: flex-end;
        max-width: 35%;
        margin-top: -200px;
    }

    ${from.desktop} {
        height: 100%;
        max-width: 50%;
        justify-content: flex-end;
        margin-top: 0;
    }

    ${from.leftCol} {
        justify-content: space-between;
    }

    ${from.wide} {
        max-width: 47%;
    }
`;

export const packShot = css`
    max-width: 85%;

    ${from.phablet} {
        max-width: 100%;
    }

    ${from.desktop} {
        align-self: flex-end;
        max-width: 80%;
    }

    ${from.leftCol} {
        max-width: 80%;
    }

    ${from.wide} {
        max-width: 100%;
        width: 75%;
    }
`;

export const iconPanel = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;
    padding: ${space[4]}px 0;
    margin: 0 ${space[4]}px;
`;

export const logoContainer = css`
    display: none;

    ${from.desktop} {
        display: block;
        width: 100%;
        fill: ${neutral[100]};
        min-width: 60px;
    }

    ${from.leftCol} {
        min-width: 80px;
    }
`;

export const closeButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid ${neutral[100]};
    border-radius: 50%;
    outline: none;
    background: transparent;
    cursor: pointer;
    width: 35px;
    height: 35px;

    svg {
        width: 25px;
        height: 25px;
        fill: ${neutral[100]};
        transition: background-color 0.5s ease;
        border-radius: 50%;
    }

    :hover {
        cursor: pointer;
        background-color: rgba(237, 237, 237, 0.5);
    }

    ${until.desktop} {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;
