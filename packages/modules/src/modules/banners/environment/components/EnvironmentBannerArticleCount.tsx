import React from 'react';
import { css } from '@emotion/react';
import { from, headline } from '@guardian/source/foundations';
import { ArticleCountOptOutPopup } from '../../../shared/ArticleCountOptOutPopup';
import { GREEN_HEX } from '../utils/constants';

const styles = {
    container: css`
        ${headline.xxxsmall({ fontWeight: 'bold' })}
        font-size: 15px;
        margin: 0;
        color: ${GREEN_HEX};

        ${from.tablet} {
            font-size: 17px;
        }
    `,
};

interface EnvironmentBannerArticleCountProps {
    numArticles: number;
    numOfArticles: number;
}

export function EnvironmentBannerArticleCount({
    numArticles,
    numOfArticles,
}: EnvironmentBannerArticleCountProps): JSX.Element {
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
