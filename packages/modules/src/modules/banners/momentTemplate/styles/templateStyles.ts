import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';

// WIP - Any styling changes made to base moment template styling here should be reviewed by a designer!

const templateSpacing = {
    heading: css`
        ${until.mobileMedium} {
            padding-top: 10px;
            margin-bottom: ${space[4]}px;
        }
        ${from.mobileMedium} {
            padding-top: 8px;
            margin-bottom: ${space[4]}px;
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
    tickerContainer: css`
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

// const template

export {templateSpacing}