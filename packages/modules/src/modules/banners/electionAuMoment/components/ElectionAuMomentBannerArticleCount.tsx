import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { ArticleCountOptOutPopup } from '../../../shared/ArticleCountOptOutPopup';
import { Hide } from '@guardian/src-layout';

const styles = {
    container: css`
        ${headline.xxxsmall({ fontWeight: 'bold' })}
        font-size: 15px;
        color: ${neutral[0]};
        margin: ${space[2]}px 0;

        ${from.tablet} {
            margin: ${space[2]}px 0;
            font-size: 17px;
        }

        ${from.desktop} {
            font-size: 20px;
        }
    `,
};

interface ElectionAuMomentBannerArticleCountProps {
    numArticles: number;
}

export function ElectionAuMomentBannerArticleCount({
    numArticles,
}: ElectionAuMomentBannerArticleCountProps): JSX.Element {
    return (
        <p css={styles.container}>
            You&apos;ve read{' '}
            <Hide above="tablet">
                <ArticleCountOptOutPopup
                    numArticles={numArticles}
                    nextWord=" articles"
                    type="election-au-moment-banner"
                />
            </Hide>
            <Hide below="tablet">
                <ArticleCountOptOutPopup
                    numArticles={numArticles}
                    nextWord=" articles"
                    type="election-au-moment-banner"
                />
            </Hide>{' '}
            in the last year
        </p>
    );
}
