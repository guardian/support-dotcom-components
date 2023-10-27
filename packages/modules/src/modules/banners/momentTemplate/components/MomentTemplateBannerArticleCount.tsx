import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { MomentTemplateArticleCountOptOut } from './MomentTemplateBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';

// ---- Component ---- //

interface MomentTemplateBannerArticleCountProps {
    numArticles: number;
    settings: BannerTemplateSettings;
}

export function MomentTemplateBannerArticleCount({
    numArticles,
    settings,
}: MomentTemplateBannerArticleCountProps): JSX.Element {
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

// ---- Styles ---- //

const styles = {
    container: (textColor: string = 'inherit') => css`
        margin: 0;
        color: ${textColor};
        ${headline.xxxsmall({ fontWeight: 'bold' })};
        font-size: 94%; /* headline reduced to 15px whilst allowing browser to font resize */
        ${from.desktop} {
            font-size: ${(100 / 94) * 100}%; /* headline scaled back to 17px/xxxsmall */
        }
    `,
};
