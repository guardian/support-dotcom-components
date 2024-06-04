import React from 'react';
import { css } from '@emotion/react';
import { from, headline } from '@guardian/source/foundations';
import { DesignableBannerArticleCountOptOut } from './DesignableBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';
import { ArticleCounts } from "@sdc/shared/dist/types";

// ---- Component ---- //

interface DesignableBannerArticleCountProps {
    articleCount: ArticleCounts;
    numArticles: number;
    settings: BannerTemplateSettings;
}

export function DesignableBannerArticleCount({
    articleCount,
    numArticles,
    settings,
}: DesignableBannerArticleCountProps): JSX.Element {
    return (
        <div css={styles.container(settings.articleCountTextColour)}>
            You&apos;ve read{' '}
            <DesignableBannerArticleCountOptOut
                articleCount={articleCount}
                numArticles={numArticles}
                nextWord=" articles"
                settings={settings}
            />{' '}
            in the last year
        </div>
    );
}

// ---- Styles ---- //

const styles = {
    container: (textColor: string = 'inherit') => css`
        margin: 0;
        color: ${textColor};
        ${headline.xxxsmall({ fontWeight: 'bold' })};
        font-size: ${15 / 16}rem; /* root element 16px, headline 15px, allows browser font resize */
        ${from.desktop} {
            font-size: ${17 / 16}rem; /* root element 16px, headline.xxxsmall 17px */
        }
    `,
};
