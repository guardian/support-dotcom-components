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
}

interface CustomArticleCountProps {
    copy: string;
    numArticles: number;
}

const ARTICLE_COUNT_TEMPLATE = '%%ARTICLE_COUNT%%';
export const containsArticleCountTemplate = (copy: string): boolean =>
    copy.includes(ARTICLE_COUNT_TEMPLATE);

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

export function CustomArticleCountCopy({
    copy,
    numArticles,
}: CustomArticleCountProps): JSX.Element {
    const [copyHead, copyTail] = copy.split(ARTICLE_COUNT_TEMPLATE);

    return (
        <p css={styles.container}>
            {copyHead}
            <span>{numArticles}&nbsp;articles</span>
            {copyTail?.substring(1, 9) === 'articles' ? copyTail.substring(9) : copyTail}
        </p>
    );
}
