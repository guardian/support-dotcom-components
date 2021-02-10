import React from 'react';
import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { css } from '@emotion/react';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';

const contentStyle = css`
    float: left;
    width: 40%;
    ${textSans.medium()};
    background-color: ${palette.neutral[100]};
    padding: 8px;
    margin-right: 10px;
`;

const message = 'You’ve read %%ARTICLE_COUNT%% articles this year';

interface Props {
    numArticles: number;
    paragraphElement: JSX.Element;
}

export const ContributionsEpicArticleCountInline: React.FC<Props> = ({
    numArticles,
    paragraphElement,
}: Props) => {
    if (numArticles >= 5) {
        return (
            <div>
                <div css={contentStyle}>{replaceArticleCount(message, numArticles, 'epic')}</div>
                {paragraphElement}
            </div>
        );
    }
    return null;
};
