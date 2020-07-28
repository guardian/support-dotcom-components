import { css } from 'emotion';
import { body, headline, textSans } from '@guardian/src-foundations/typography/cjs';
import { neutral, text, brandAlt } from '@guardian/src-foundations/palette';
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
    background-color: #3f464a;
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
    padding: ${space[3]}px ${space[3]}px 0 ${space[3]}px;
    button {
        margin-left: ${space[3]}px;
    }
    ${from.tablet} {
        padding: ${space[4]}px;
        width: 80%;
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
    ${headline.small({ fontWeight: 'bold' })};
    margin: 0;
    max-width: 100%;

    ${until.mobileLandscape} {
        max-width: 80%;
    }

    ${until.mobileMedium} {
        ${headline.xsmall({ fontWeight: 'bold' })};
    }
`;

export const paragraph = css`
    ${body.medium()};
    line-height: 135%;
    margin: ${space[2]}px 0 ${space[6]}px;
    max-width: 100%;

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

export const buttonTextMobileTablet = css`
    display: block;
    ${from.desktop} {
        display: none;
    }
`;

export const linkStyle = css`
    cursor: pointer;
    text-decoration: none;
    :visited {
        color: ${text.primary};
    }
`;

export const becomeASubscriberButton = css`
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
    max-height: 215px;
    overflow: hidden;
    margin-top: -25px;
    ${from.mobileMedium} {
        max-height: 280px;
        margin-top: -15px;
    }
    ${from.tablet} {
        display: flex;
        align-items: flex-end;
        margin-top: 0;
        max-width: 50%;
        max-height: 100%;
    }
    ${from.desktop} {
        align-items: center;
        max-width: 50%;
        margin-top: 0;
        max-height: 100%;
    }
    ${from.leftCol} {
        justify-content: space-between;
        padding-right: 0;
    }
    ${from.wide} {
        max-width: 47%;
        max-height: 290px;
    }
`;

export const packShot = css`
    max-width: 100%;
    ${from.tablet} {
        max-width: 100%;
        margin-bottom: -40px;
    }
    ${from.desktop} {
        max-width: 75%;
        margin-bottom: -55px;
    }
    ${from.leftCol} {
        margin-bottom: -80px;
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

export const signInLink = css`
     {
        cursor: pointer;
    }
`;
