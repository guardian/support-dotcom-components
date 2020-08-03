import { css } from '@emotion/core';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { body, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

export const styles = {
    banner: css`
        padding: 8px 20px;
        background-color: ${brandAlt[400]};
        ${body.medium()};
        color: ${neutral[7]};
        width: 100%;
        border-top: 1px solid ${neutral[7]};
        display: flex;
        flex-direction: row;
    `,

    copy: css`
        padding: 5px;
        display: block;
        margin: 0 auto;
        max-width: 50%;
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
        strong {
            ${body.medium({ fontWeight: 'bold' })};
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

    cta: css`
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

    roundelContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        fill: ${neutral[7]};
        display: block;
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
        border: 0.0625rem solid rgba(18, 18, 18, 0.3);
        border-radius: 50%;
        outline: none;
        background: transparent;
        cursor: pointer;
        width: 35px;
        height: 35px;
        svg {
            width: 25px;
            height: 25px;
            fill: ${neutral[7]};
            border-radius: 50%;
        }
        :hover {
            cursor: pointer;
        }
        ${until.desktop} {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    `,

    closeButtonContainer: css`
        padding: 5px;
    `,
};
