import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { MomentTemplateArticleCountOptOut } from './MomentTemplateBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';

// ---- Component ---- //

interface MomentTemplateBannerArticleCountProps {
    numArticles: number;
    settings: BannerTemplateSettings;
    textColour?: string;
}

export function MomentTemplateBannerArticleCount({
    numArticles,
    settings,
    textColour = neutral[0],
}: MomentTemplateBannerArticleCountProps): JSX.Element {
    return (
        <div css={styles.container(textColour)}>
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
    container: (textColor: string) => css`
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
