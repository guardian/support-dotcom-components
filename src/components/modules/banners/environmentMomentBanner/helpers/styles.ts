import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';

const hideAfterTablet = css`
    display: initial;

    ${from.tablet} {
        display: none;
    }
`;

const hideBeforeTablet = css`
    display: none;

    ${from.tablet} {
        display: initial;
    }
`;

const hideAfterDesktop = css`
    display: initial;

    ${from.desktop} {
        display: none;
    }
`;

const hideBeforeDesktop = css`
    display: none;

    ${from.desktop} {
        display: initial;
    }
`;

const hideAfterLeftCol = css`
    display: initial;

    ${from.leftCol} {
        display: none;
    }
`;

const hideBeforeLeftCol = css`
    display: none;

    ${from.leftCol} {
        display: initial;
    }
`;

export default {
    hideAfterTablet,
    hideBeforeTablet,
    hideAfterDesktop,
    hideBeforeDesktop,
    hideAfterLeftCol,
    hideBeforeLeftCol,
};
