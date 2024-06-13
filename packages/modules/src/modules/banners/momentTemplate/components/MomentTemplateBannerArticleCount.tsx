import React from 'react';
import { css } from '@emotion/react';
import { from, headline, palette } from '@guardian/source/foundations';
import { MomentTemplateArticleCountOptOut } from './MomentTemplateBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';
import {
    containsArticleCountTemplate,
    CustomArticleCountCopy,
} from '../../worldPressFreedomDay/components/ArticleCount';

// ---- Component ---- //

interface MomentTemplateBannerArticleCountProps {
    numArticles: number;
    settings: BannerTemplateSettings;
    copy?: string;
}

export function MomentTemplateBannerArticleCount({
    numArticles,
    settings,
    copy,
}: MomentTemplateBannerArticleCountProps): JSX.Element {
    if (copy && containsArticleCountTemplate(copy)) {
        // Custom article count message
        return <CustomArticleCountCopy numArticles={numArticles} copy={copy} />;
    } else if (numArticles >= 50) {
        return (
            <div css={styles.container(settings.articleCountTextColour)}>
                Congratulations on being one of our top readers globally – you&apos;ve read{' '}
                <span css={optOutContainer}>{numArticles} articles</span> in the last year
            </div>
        );
    } else {
        return (
            <div css={styles.container(settings.articleCountTextColour)}>
                You&apos;ve read{' '}
                <MomentTemplateArticleCountOptOut
                    numArticles={numArticles}
                    nextWord=" articles"
                    settings={settings}
                />{' '}
                in the last year
            </div>
        );
    }
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

const optOutContainer = css`
    color: ${palette.opinion[400]};
`;
