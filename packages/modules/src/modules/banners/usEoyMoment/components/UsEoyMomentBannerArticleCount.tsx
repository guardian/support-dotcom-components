import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { ArticleCountOptOutPopup } from '../../../shared/ArticleCountOptOutPopup';
import { Hide } from '@guardian/src-layout';

const styles = {
    container: css`
        ${headline.xxxsmall({ fontWeight: 'bold' })}
        font-size: 15px;
        color: ${neutral[46]}; // TODO get specific colour
        margin: 0;

        ${from.tablet} {
            font-size: 17px;
        }

        ${from.desktop} {
            font-size: 20px;
        }
    `,
};

interface UsEoyMomentBannerArticleCountProps {
    numArticles: number;
}

export function UsEoyMomentBannerArticleCount({
    numArticles,
}: UsEoyMomentBannerArticleCountProps): JSX.Element {
    return (
        <p css={styles.container}>
            You&apos;ve read{' '}
            <Hide above="tablet">
                <ArticleCountOptOutPopup
                    numArticles={numArticles}
                    nextWord=" articles"
                    type="us-eoy-moment-banner"
                />
            </Hide>
            <Hide below="tablet">
                <ArticleCountOptOutPopup
                    numArticles={numArticles}
                    nextWord=" articles"
                    type="us-eoy-moment-banner"
                />
            </Hide>{' '}
            in the last year
        </p>
    );
}
