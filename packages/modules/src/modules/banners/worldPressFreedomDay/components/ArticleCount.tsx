import React from 'react';
import { css } from '@emotion/react';
import { from, headline, space } from '@guardian/source/foundations';
import { ArticleCountOptOutPopup } from '../../../shared/ArticleCountOptOutPopup';

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
    numOfArticles: number;
}

export function ArticleCount({ numArticles, numOfArticles }: ArticleCountProps): JSX.Element {
    return (
        <p css={styles.container}>
            You&apos;ve read{' '}
            <ArticleCountOptOutPopup
                numArticles={numArticles}
                numOfArticles={numOfArticles}
                nextWord=" articles"
                type="global-new-year-moment-banner"
            />{' '}
            in the last year
        </p>
    );
}
