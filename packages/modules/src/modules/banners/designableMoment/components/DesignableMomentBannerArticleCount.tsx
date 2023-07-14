import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { MomentTemplateArticleCountOptOut } from './DesignableMomentBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';

// ---- Component ---- //

interface DesignableMomentBannerArticleCountProps {
    numArticles: number;
    settings: BannerTemplateSettings;
}

export function DesignableMomentBannerArticleCount({
    numArticles,
    settings,
}: DesignableMomentBannerArticleCountProps): JSX.Element {
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
        ${headline.xxxsmall({ fontWeight: 'bold' })}
        font-size: 15px;
        color: ${textColor};
        margin: 0;

        ${from.tablet} {
            font-size: 17px;
        }

        ${from.desktop} {
            font-size: 20px;
        }
    `,
};
