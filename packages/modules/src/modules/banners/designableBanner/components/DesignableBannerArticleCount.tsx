import React from 'react';
import { css } from '@emotion/react';
import { from, headline } from '@guardian/source/foundations';
import { DesignableBannerArticleCountOptOut } from './DesignableBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';

// ---- Component ---- //

interface DesignableBannerArticleCountProps {
    numArticles: number;
    settings: BannerTemplateSettings;
}

interface DesignableBannerCustomArticleCountProps {
    copy?: string;
    numArticles: number;
    settings: BannerTemplateSettings;
}

const ARTICLE_COUNT_TEMPLATE = '%%ARTICLE_COUNT%%';

export function DesignableBannerArticleCount({
    numArticles,
    settings,
}: DesignableBannerArticleCountProps): JSX.Element {
    return (
        <div css={styles.container(settings.articleCountTextColour)}>
            You&apos;ve read{' '}
            <DesignableBannerArticleCountOptOut
                numArticles={numArticles}
                nextWord=" articles"
                settings={settings}
            />{' '}
            in the last year
        </div>
    );
}

export function DesignableBannerCustomArticleCount({
    copy,
    numArticles,
    settings,
}: DesignableBannerCustomArticleCountProps): JSX.Element {
    let copyHead = '';
    let copyTail = '';
    if (copy) {
        [copyHead, copyTail] = copy.split(ARTICLE_COUNT_TEMPLATE);
    }

    return (
        <div css={styles.container(settings.articleCountTextColour)}>
            {copyHead}
            <span>{numArticles}&nbsp;articles</span>
            {copyTail?.substring(1, 9) === 'articles' ? copyTail.substring(9) : copyTail}
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
