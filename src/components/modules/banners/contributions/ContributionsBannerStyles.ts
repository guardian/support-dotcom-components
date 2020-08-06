import { css } from '@emotion/core';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import { until, from } from '@guardian/src-foundations/mq';

export const styles = {
    banner: css`
        padding: 0.5rem 1.25rem 1.125rem;
        background-color: ${brandAlt[400]};
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
        margin-right: 3rem;
        padding-bottom: 0;
        ${body.medium()};
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
        strong {
            ${body.medium({ fontWeight: 'bold' })};
        }
        ${until.tablet} {
            margin-right: 0;
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
        padding: 0.15rem 0.15rem;
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

    ctaButton: css`
        margin-bottom: 0.5rem;
        margin-right: 0.5rem;
    `,

    cta: css`
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        ${from.mobileMedium} {
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
            padding: 1rem 0 0 0;
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
        padding-left: 10rem;
        ${until.desktop} {
            padding-left: 0.2rem;
            flex-direction: column;
        }
    `,
};
