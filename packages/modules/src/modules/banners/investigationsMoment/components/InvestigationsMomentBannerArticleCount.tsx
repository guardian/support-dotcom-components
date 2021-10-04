import React from 'react';
import { css } from '@emotion/react';
import { brandAlt, news } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { ArticleCountOptOutPopup } from '../../../shared/ArticleCountOptOutPopup';
import { Hide } from '@guardian/src-layout';

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

        ${from.desktop} {
            font-size: 20px;
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
            You&apos;ve read{' '}
            <Hide above="tablet">
                <ArticleCountOptOutPopup
                    numArticles={numArticles}
                    nextWord=" articles"
                    type="banner"
                />
            </Hide>
            <Hide below="tablet">
                <ArticleCountOptOutPopup
                    numArticles={numArticles}
                    nextWord=" articles"
                    type="investigations-moment-banner"
                />
            </Hide>{' '}
            in the last year
        </p>
    );
}
