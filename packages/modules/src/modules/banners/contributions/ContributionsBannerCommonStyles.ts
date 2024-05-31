import { css } from '@emotion/react';
import { brandAlt, neutral, body, until, from } from '@guardian/source/foundations';

export const commonStyles = {
    copy: css`
        max-width: 40rem;
        display: block;
        padding-bottom: 0;
        ${body.small({ lineHeight: 'loose' })};
        ${until.tablet} {
            strong {
                font-weight: 800;
            }
        }
        ${from.tablet} {
            ${body.medium({ lineHeight: 'loose' })};
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
        ${body.small({ fontWeight: 'bold', lineHeight: 'loose' })};
        ${until.tablet} {
            font-weight: 800;
        }
        ${from.tablet} {
            ${body.medium({ fontWeight: 'bold', lineHeight: 'loose' })};
        }
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
    `,
};
