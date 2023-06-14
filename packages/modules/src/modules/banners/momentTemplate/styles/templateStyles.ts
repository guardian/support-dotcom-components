import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';

// WIP - Any styling changes made to base moment template styling here should be reviewed by a designer!

export const bannerSpacing = {
    heading: css`
        ${until.mobileMedium} {
            padding-top: 12px;
            margin-bottom: ${space[6]}px;
        }
        ${from.mobileMedium} {
            padding-top: 12px;
            margin-bottom: ${space[6]}px;
        }
        ${from.tablet} {
            padding-top: ${space[3]}px;
        }
        ${from.desktop} {
            margin-bottom: ${space[6]}px;
        }
    `,
    bodyCopyAndArticleCount: css`
        ${until.tablet} {
            margin-bottom: ${space[3]}px;
        }
        ${from.tablet} {
            margin-bottom: ${space[4]}px;
        }
        ${from.desktop} {
            margin-bottom: ${space[6]}px;
        }
    `,
    // bannerVisual: {
    // },
    ticker: css`
        ${until.tablet} {
            margin-bottom: ${space[4]}px;
        }
        ${from.tablet} {
            margin-bottom: ${space[3]}px;
        }
    `,
    // bannerCtas: {
    // },
};
