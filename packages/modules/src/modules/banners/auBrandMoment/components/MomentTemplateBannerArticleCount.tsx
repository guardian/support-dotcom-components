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
}

export function MomentTemplateBannerArticleCount({
    numArticles,
    settings,
}: MomentTemplateBannerArticleCountProps): JSX.Element {
    return (
        <p css={styles.container}>
            You&apos;ve read{' '}
            <MomentTemplateArticleCountOptOut
                numArticles={numArticles}
                nextWord=" articles"
                settings={settings}
            />{' '}
            in the last year
        </p>
    );
}

// ---- Styles ---- //

const styles = {
    container: css`
        ${headline.xxxsmall({ fontWeight: 'bold' })}
        font-size: 15px;
        color: ${neutral[0]};
        margin: 0;

        ${from.tablet} {
            font-size: 17px;
        }

        ${from.desktop} {
            font-size: 20px;
        }
    `,
};
