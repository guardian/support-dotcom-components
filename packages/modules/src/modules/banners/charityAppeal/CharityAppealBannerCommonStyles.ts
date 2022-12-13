import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import { until, from } from '@guardian/src-foundations/mq';

const dfltBackColor = '#313433';

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
            background-color: ${dfltBackColor};
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
        color: ${dfltBackColor};
        padding: 0.15rem 0.15rem;
        ${body.small({ fontWeight: 'bold', lineHeight: 'loose' })};
        ${until.tablet} {
            font-weight: 800;
        }
        ${from.tablet} {
            ${body.medium({ fontWeight: 'bold', lineHeight: 'loose' })};
        }
        &::selection {
            background-color: ${dfltBackColor};
            color: ${neutral[7]};
        }
    `,
};
