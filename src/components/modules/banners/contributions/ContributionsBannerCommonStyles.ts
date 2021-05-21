import { css } from '@emotion/react';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import { until, from } from '@guardian/src-foundations/mq';

export const commonStyles = {
    copy: css`
        max-width: 40rem;
        display: block;
        padding-bottom: 0;
        ${body.medium({ lineHeight: 'loose' })};
        ${until.tablet} {
            strong {
                font-weight: 800;
            }
        }
        ${from.tablet} {
            strong {
                ${body.medium({ fontWeight: 'bold', lineHeight: 'loose' })};
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
        ${body.medium({ fontWeight: 'bold', lineHeight: 'loose' })};
        ${until.tablet} {
            font-weight: 800;
        }
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
    `,
};
