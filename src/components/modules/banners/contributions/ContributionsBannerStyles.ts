import { css } from '@emotion/core';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import { until, from, breakpoints } from '@guardian/src-foundations/mq';

export const styles = {
    // We need bannerContainer/banner/bannerFlexBox in order to track DCR's article grid.
    // In future we should be able to do this using src-grid, but this doesn't currently work with DCR's preact.
    bannerContainer: css`
        overflow: hidden;
        width: 100%;
        background-color: ${brandAlt[400]};
        border-top: 1px solid ${neutral[7]};
    `,
    banner: css`
        padding: 0.5rem 0.625rem 0 0.625rem;
        margin: auto;
        box-sizing: border-box;
        color: ${neutral[7]};
        width: 100%;
        display: flex;
        flex-direction: row;

        ${from.mobileLandscape} {
            padding: 0.5rem 20px 1.125rem 20px;
        }

        ${from.tablet} {
            max-width: ${breakpoints.tablet}px;
        }

        ${from.desktop} {
            padding-right: 29px;
            max-width: ${breakpoints.desktop}px;
        }
        ${from.leftCol} {
            padding-right: 27px;
            max-width: ${breakpoints.leftCol - 2}px;
        }
        ${from.wide} {
            padding-right: 40px;
            max-width: ${breakpoints.wide - 2}px;
        }
    `,
    copy: css`
        max-width: 40rem;
        display: block;
        padding-bottom: 0;
        ${body.medium()};
        ${until.tablet} {
            font-size: 0.875rem;
            line-height: 1.125rem;

            strong {
                font-weight: 800;
            }
        }
        ${from.tablet} {
            strong {
                ${body.medium({ fontWeight: 'bold' })};
            }
        }
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
        ${until.tablet} {
            margin-right: 0;
        }
        ${from.desktop} {
            width: 620px;
        }
    `,

    heading: css`
        font-weight: bold;
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
    `,

    messageText: css`
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
    `,

    highlightedText: css`
        background-color: ${neutral[100]};
        padding: 0.15rem 0.15rem;
        ${body.medium({ fontWeight: 'bold' })};
        ${until.tablet} {
            font-size: 0.875rem;
            font-weight: 800;
        }
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
    `,

    roundelContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        fill: ${neutral[7]};
    `,

    paymentMethods: css`
        display: block;
        max-height: 1.25rem;
    `,

    ctaButton: css`
        margin-bottom: 0.5rem;
        margin-right: 0.5rem;
        ${from.desktop} {
            margin-right: 0;
        }
    `,

    cta: css`
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        ${from.mobileLandscape} {
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
        ${from.tablet} {
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
        }
    `,

    ctaContainer: css`
        display: flex;
        align-items: flex-end;
        justify-content: start;
        ${until.desktop} {
            padding: 0.5rem 0 0 0;
        }
        ${from.desktop} {
            margin-left: 10px;
        }
        ${from.wide} {
            width: 264px;
            margin-left: auto;
        }
    `,

    closeButtonContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        display: block;
    `,

    leftRoundel: css`
        display: none;
        ${from.leftCol} {
            display: block;
            width: 161px;
        }
        ${from.wide} {
            width: 240px;
        }
    `,

    rightRoundel: css`
        display: none;
        ${from.tablet} {
            display: block;
        }
        ${from.leftCol} {
            display: none;
        }
    `,

    rightButtons: css`
        margin-left: auto;
        display: flex;
        flex-direction: row;
        white-space: nowrap;
    `,

    copyAndCta: css`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        ${from.desktop} {
            flex-direction: row;
        }
    `,
};
