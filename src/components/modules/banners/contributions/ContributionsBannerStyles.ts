import { css } from 'emotion';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';

export const styles = {
    banner: css`
        background-color: ${brandAlt[400]};
        ${body.medium()};
        color: ${neutral[7]};
        width: 100%;
        border-top: 1px solid ${neutral[7]};
    `,

    header: css`
        ${body.medium({ fontWeight: 'bold' })};
        margin-right: 0.25em;
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
    `,

    inlineCTA: css`
        background-color: ${neutral[100]};
        padding: 0 0.25rem;
        margin-left: 0.25em;
        ${body.medium({ fontWeight: 'bold' })};
        &::selection {
            background-color: ${brandAlt[400]};
            color: ${neutral[7]};
        }
    `,
};
