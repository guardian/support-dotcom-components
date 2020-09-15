import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';

const hideAfterTablet = css`
    display: block;

    ${from.tablet} {
        display: none;
    }
`;

const hideBeforeTablet = css`
    display: none;

    ${from.tablet} {
        display: block;
    }
`;

export default { hideAfterTablet, hideBeforeTablet };
