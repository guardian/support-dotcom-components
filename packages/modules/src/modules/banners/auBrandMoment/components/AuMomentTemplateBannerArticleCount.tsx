import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { AuMomentTemplateArticleCountOptOut } from './AuMomentTemplateBannerArticleCountOptOut';
import { BannerTemplateSettings } from '../settings';

// ---- Component ---- //

interface AuMomentTemplateBannerArticleCountProps {
    numArticles: number;
    settings: BannerTemplateSettings;
}

export function AuMomentTemplateBannerArticleCount({
    numArticles,
    settings,
}: AuMomentTemplateBannerArticleCountProps): JSX.Element {
    return (
        <p css={styles.container}>
            You&apos;ve read{' '}
            <AuMomentTemplateArticleCountOptOut
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
