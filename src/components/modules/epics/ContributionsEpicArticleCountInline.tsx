import React from 'react';
import { body, headline } from '@guardian/src-foundations/typography';
import { css } from '@emotion/react';
import { palette } from '@guardian/src-foundations';
import { ArticleCountOptOut } from '../shared/ArticleCountOptOut2';
import { OphanTracking } from '../shared/ArticleCountOptOut';

const containerStyles = css`
    width: max-content;
    box-sizing: border-box;
    height: 139px;
    padding: 4px 8px;
    border: 1px solid black;
    border-left: none;

    ${body.medium({ fontWeight: 'bold' })};
`;

const articleCountStyles = css`
    ${headline.xlarge({ fontWeight: 'bold' })};
    margin-top: -7px;
    font-size: 58px;
    line-height: 1;
    color: ${palette.opinion[500]};
`;

export interface Props {
    numArticles: number;
    tracking?: OphanTracking;
}

export const ContributionsEpicArticleCountInline: React.FC<Props> = ({
    numArticles,
    tracking,
}: Props) => {
    if (numArticles >= 5) {
        return (
            <div css={containerStyles}>
                <div>You&apos;ve read</div>
                <div css={articleCountStyles}>{numArticles}</div>
                <div>
                    <ArticleCountOptOut text="articles" type="epic" tracking={tracking} /> in
                </div>
                <div>the last year</div>
            </div>
        );
    }
    return null;
};
