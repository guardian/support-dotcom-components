import { css } from '@emotion/react';
import { space, from, until } from '@guardian/source/foundations';

// WIP - Any styling changes made to base moment template styling here should be reviewed by a designer!
const templateSpacing = {
    bannerContainer: css`
        ${until.tablet} {
            margin-bottom: ${space[4]}px;
        }
        ${from.tablet} {
            margin-bottom: ${space[6]}px;
        }
    `,
    bannerHeader: css`
        padding-top: ${space[3]}px;
        margin-bottom: ${space[6]}px;
    `,
    bannerBodyCopy: css`
        ${until.tablet} {
            margin-bottom: ${space[4]}px;
        }
        ${from.tablet} {
            margin-bottom: ${space[6]}px;
        }
    `,
    bannerTicker: css`
        ${until.tablet} {
            margin-bottom: ${space[4]}px;
        }
        ${from.tablet} {
            margin-bottom: ${space[3]}px;
        }
    `,
    bannerCloseButton: css`
        top: ${space[3]}px;
        right: ${space[3]}px;
        margin-left: ${space[3]}px;
    `,
};

export { templateSpacing };
