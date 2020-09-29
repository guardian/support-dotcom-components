import { css } from '@emotion/core';
import { body, headline, textSans } from '@guardian/src-foundations/typography/cjs';
import { neutral, brandAlt, text } from '@guardian/src-foundations/palette';
import { from, until, between } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const closeButtonWidthHeight = '35px';

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
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 980px;

    ${from.tablet} {
        flex-direction: row;
    }
    ${from.leftCol} {
        max-width: 1140px;
    }
    ${from.wide} {
        max-width: 1300px;
    }
`;

export const topLeftComponent = css`
    width: 100%;
    padding: ${space[4]}px;
    button {
        margin-left: ${space[3]}px;
    }
    ${from.tablet} {
        width: 60%;
        padding-right: 0;
    }
    ${from.desktop} {
        width: 50%;
    }
    ${from.leftCol} {
        padding-left: 0;
    }
    ${from.wide} {
        width: 53%;
    }
`;

export const heading = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
    margin: 0;
    max-width: 100%;
    padding-right: ${closeButtonWidthHeight};

    @media (min-width: 740px) {
        max-width: 90%;
    }
    ${from.mobileLandscape} {
        ${headline.small({ fontWeight: 'bold' })};
    }

    ${from.tablet} {
        max-width: 100%;
    }
`;

export const headLineBreak = css`
    display: block;
    ${from.phablet} {
        display: none;
    }
`;

export const paragraph = css`
    ${body.medium()}
    line-height: 135%;
    margin: ${space[2]}px 0 ${space[6]}px;
    max-width: 100%;

    ${from.phablet} {
        max-width: 80%;
    }

    ${from.tablet} {
        max-width: 100%;
    }

    ${from.desktop} {
        font-size: 20px;
        margin: ${space[3]}px 0 ${space[9]}px;
        max-width: 37rem;
    }

    ${from.leftCol} {
        max-width: 30rem;
    }

    ${from.wide} {
        max-width: 37rem;
    }
`;

export const linkStyle = css`
    text-decoration: none;
    :visited {
        color: ${text.primary};
    }
`;

export const becomeASubscriberButton = css`
    cursor: pointer;
    display: inline-block;
    border-radius: 1.875rem;
    background-color: ${brandAlt[400]};
    padding: ${space[2]}px ${space[6]}px;
    color: ${text.primary};
    ${textSans.medium()};
    font-weight: bold;
`;

export const notNowButton = css`
    ${textSans.medium()};
    font-weight: bold;
    color: ${text.ctaPrimary};
    border: 0;
    border-radius: 0.25rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: inherit;
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
        max-width: 45%;
        margin-top: -220px;
        padding-right: ${space[4]}px;
    }

    ${from.desktop} {
        height: 100%;
        max-width: 50%;
        justify-content: flex-end;
        margin-top: 0;
    }

    ${from.leftCol} {
        padding-right: 0;
        justify-content: space-between;
    }

    ${from.wide} {
        max-width: 47%;
    }
`;

export const packShotContainer = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0 ${space[4]}px;

    ${between.phablet.and.tablet} {
        max-width: 75%;
    }

    ${from.wide} {
        margin-top: ${space[4]}px;
    }
`;

const packShotWidth = 500;
const packShotHeight = 297;

export const packShot = css`
    width: 100%;
    position: relative;
    padding-bottom: ${(packShotHeight / packShotWidth) * 100}%;

    img {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
`;

export const iconPanel = css`
    ${from.desktop} {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        height: 100%;
        padding: ${space[4]}px 0;
        margin-left: ${space[4]}px;
    }
`;

export const logoContainer = css`
    display: none;

    ${from.desktop} {
        display: block;
        width: 100%;
        fill: ${neutral[100]};
        width: 70px;
    }

    ${from.leftCol} {
        width: 90px;
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
    width: ${closeButtonWidthHeight};
    height: ${closeButtonWidthHeight};
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

export const signInLink = css`
    cursor: pointer;
`;
