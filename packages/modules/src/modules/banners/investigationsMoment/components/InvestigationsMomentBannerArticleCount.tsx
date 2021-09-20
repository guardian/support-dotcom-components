import React from 'react';
import { css } from '@emotion/react';
import { brandAlt, news } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { ArticleCountOptOutPopup } from '../../../shared/ArticleCountOptOutPopup';

const styles = {
    container: css`
        ${headline.xxxsmall({ fontWeight: 'bold' })}
        font-size: 15px;
        color: ${brandAlt[400]};
        margin: 0;

        ${from.tablet} {
            font-size: 17px;
            color: ${news[400]};
        }
    `,
};

interface InvestigationsMomentBannerArticleCountProps {
    numArticles: number;
}

export function InvestigationsMomentBannerArticleCount({
    numArticles,
}: InvestigationsMomentBannerArticleCountProps): JSX.Element {
    return (
        <p css={styles.container}>
            You have read{' '}
            <ArticleCountOptOutPopup numArticles={numArticles} nextWord=" articles" type="banner" />{' '}
            in the past year
        </p>
    );
}
