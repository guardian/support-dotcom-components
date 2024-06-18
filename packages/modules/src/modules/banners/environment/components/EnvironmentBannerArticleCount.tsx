import React from 'react';
import { css } from '@emotion/react';
import { from, headline, palette } from '@guardian/source/foundations';
import { ArticleCountOptOutPopup } from '../../../shared/ArticleCountOptOutPopup';
import { GREEN_HEX } from '../utils/constants';
import {
    containsArticleCountTemplate,
    CustomArticleCountCopy,
} from '../../worldPressFreedomDay/components/ArticleCount';

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
const optOutContainer = css`
    color: ${palette.opinion[400]};
`;

interface EnvironmentBannerArticleCountProps {
    numArticles: number;
    copy?: string;
}

export function EnvironmentBannerArticleCount({
    numArticles,
    copy,
}: EnvironmentBannerArticleCountProps): JSX.Element {
    if (copy && containsArticleCountTemplate(copy)) {
        // Custom article count message
        return <CustomArticleCountCopy numArticles={numArticles} copy={copy} />;
    } else if (numArticles >= 50) {
        return (
            <div css={styles.container}>
                Congratulations on being one of our top readers globally – you&apos;ve read{' '}
                <span css={optOutContainer}>{numArticles} articles</span> in the last year
            </div>
        );
    } else {
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
}
