import React from 'react';
import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { css } from '@emotion/core';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';

const containerStyle = css`
    margin: 12px 0 10px 0;
`;

const contentStyle = css`
    ${textSans.medium()};
    background-color: ${palette.neutral[100]};
    padding: 4px;
`;

const message = 'You’ve read %%ARTICLE_COUNT%% articles this year';

interface Props {
    numArticles: number;
}

export const ContributionsEpicArticleCountAbove: React.FC<Props> = ({ numArticles }: Props) => {
    if (numArticles >= 5) {
        return (
            <div css={containerStyle}>
                <span css={contentStyle}>{replaceArticleCount(message, numArticles, 'epic')}</span>
            </div>
        );
    }
    return null;
};
