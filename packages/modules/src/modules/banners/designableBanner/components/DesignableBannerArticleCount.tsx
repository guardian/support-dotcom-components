import React from 'react';
import { css } from '@emotion/react';
import { from, headline } from '@guardian/source/foundations';
import { DesignableBannerArticleCountOptOut } from './DesignableBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';

// ---- Component ---- //

interface DesignableBannerArticleCountProps {
    numArticles: number;
    numOfArticles: number;
    settings: BannerTemplateSettings;
}

export function DesignableBannerArticleCount({
    numArticles,
    numOfArticles,
    settings,
}: DesignableBannerArticleCountProps): JSX.Element {
    return (
        <div css={styles.container(settings.articleCountTextColour)}>
            You&apos;ve read{' '}
            <DesignableBannerArticleCountOptOut
                numArticles={numArticles}
                numOfArticles={numOfArticles}
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
