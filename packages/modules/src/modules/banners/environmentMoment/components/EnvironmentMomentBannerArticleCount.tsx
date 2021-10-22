import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
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

interface EnvironmentMomentBannerArticleCountProps {
    numArticles: number;
}

export function EnvironmentMomentBannerArticleCount({
    numArticles,
}: EnvironmentMomentBannerArticleCountProps): JSX.Element {
    return (
        <p css={styles.container}>
            You&apos;ve read{' '}
            <ArticleCountOptOutPopup
                numArticles={numArticles}
                nextWord=" articles"
                type="investigations-moment-banner"
            />{' '}
            in the last year
        </p>
    );
}
