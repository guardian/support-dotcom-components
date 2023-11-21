import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { ArticleCountOptOutPopup } from '../../../shared/ArticleCountOptOutPopup';
import { space } from '@guardian/src-foundations';

const styles = {
    container: css`
        ${headline.xxxsmall({ fontWeight: 'bold' })}
        font-size: 15px;
        margin: 0 0 ${space[1]}px;

        ${from.tablet} {
            font-size: 17px;
        }
    `,
};

interface ArticleCountProps {
    numArticles: number;
}

export function ArticleCount({ numArticles }: ArticleCountProps): JSX.Element {
    return (
        <p css={styles.container}>
            You&apos;ve read{' '}
            <ArticleCountOptOutPopup
                numArticles={numArticles}
                nextWord=" articles"
                type="global-new-year-moment-banner"
            />{' '}
            in the last year
        </p>
    );
}
