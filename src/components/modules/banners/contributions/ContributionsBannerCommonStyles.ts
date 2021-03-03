import { css } from '@emotion/core';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import { until, from } from '@guardian/src-foundations/mq';

export const commonStyles = {
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
};
