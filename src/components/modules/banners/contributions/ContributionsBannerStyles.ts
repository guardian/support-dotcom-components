import { css } from '@emotion/core';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { body, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { until, from } from '@guardian/src-foundations/mq';

export const styles = {
    banner: css`
        padding: 0.5rem 1.25rem 1.125rem;
        background-color: pink;
        ${body.medium()};
        color: ${neutral[7]};
        width: 100%;
        border-top: 1px solid ${neutral[7]};
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    `,

    copy: css`
        max-width: 40rem;
        display: block;
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
        strong {
            ${body.medium({ fontWeight: 'bold' })};
        }
        ${until.desktop} {
        }
        ${from.desktop} {
        }
    `,

    header: css`
        ${body.medium({ fontWeight: 'bold' })};
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
        padding: 0 0.25rem;
        ${body.medium({ fontWeight: 'bold' })};
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

    closeButton: css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        border: 0.0625rem solid rgba(18, 18, 18, 0.3);
        border-radius: 50%;
        outline: none;
        background: transparent;
        cursor: pointer;
        width: 100%;
        height: 100%;
        svg {
            width: 25px;
            height: 25px;
            fill: ${neutral[7]};
            border-radius: 50%;
        }
    `,

    button: css`
        white-space: nowrap;
        cursor: pointer;
        display: inline-block;
        border-radius: 1.875rem;
        border: none;
        display: block;
        margin-bottom: 8px;
        background-color: ${neutral[7]};
        padding: ${space[2]}px ${space[6]}px;
        color: ${neutral[100]};
        ${textSans.medium()};
        font-weight: bold;
    `,

    ctaContainer: css`
        display: flex;
        align-items: flex-end;
        justify-content: start;
        ${until.desktop} {
            padding: 1rem 0 0 0;
        }
        ${from.desktop} {
            padding: 0 3.5rem 0 0;
        }
    `,

    closeButtonContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        display: block;
    `,

    leftRoundel: css`
        display: block;
        ${until.leftCol} {
            display: none;
        }
    `,

    rightRoundel: css`
        display: none;
        ${until.leftCol} {
            display: block;
        }
    `,

    rightButtons: css`
        display: flex;
        flex-direction: row;
        white-space: nowrap;
    `,

    copyAndCta: css`
        display: flex;
        ${until.desktop} {
            flex-direction: column;
        }
        ${from.desktop} {
            padding-left: 8rem;
        }
    `,
};
