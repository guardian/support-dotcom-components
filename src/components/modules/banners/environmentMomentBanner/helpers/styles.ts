import { css } from '@emotion/core';
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

export default { hideAfterTablet, hideBeforeTablet };
