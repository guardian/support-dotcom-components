import { css } from '@emotion/core';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import { until, from } from '@guardian/src-foundations/mq';

export const styles = {
    // We need bannerContainer/banner/bannerFlexBox in order to track DCR's article grid.
    // In future we should be able to do this using src-grid, but this doesn't currently work with DCR's preact.
    bannerContainer: css`
        width: 100%;
        background-color: ${brandAlt[400]};
        border-top: 1px solid ${neutral[7]};
    `,
    banner: css`
        padding: 0.5rem 0.625rem 0 0.625rem;
        margin: auto;

        ${from.tablet} {
            padding: 0.5rem 20px 1.125rem 20px;
            max-width: 740px;
        }

        ${from.desktop} {
            max-width: 980px;
        }
        ${from.leftCol} {
            max-width: 1140px;
        }
    `,
    bannerFlexBox: css`
        color: ${neutral[7]};
        width: 100%;
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
            padding: 0.5rem 0 0 0;
        }
    `,

    closeButtonContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        display: block;
    `,

    leftRoundel: css`
        display: none;
        width: 168px;
        ${from.leftCol} {
            display: block;
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
        display: flex;
        flex-direction: row;
        white-space: nowrap;
    `,

    copyAndCta: css`
        display: flex;
        flex-direction: column;
        ${from.desktop} {
            flex-direction: row;
        }
    `,
};
