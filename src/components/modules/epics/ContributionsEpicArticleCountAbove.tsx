import React from 'react';
import { body } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { css } from '@emotion/react';
import { ArticleCountOptOut, OphanTracking } from '../shared/ArticleCountOptOut';

const containerStyles = css`
    ${body.medium({ fontWeight: 'bold' })};
    font-style: italic;
`;

const optOutContainer = css`
    color: ${palette.opinion[400]};
`;

export interface Props {
    numArticles: number;
    tracking?: OphanTracking;
}

export const ContributionsEpicArticleCountAbove: React.FC<Props> = ({
    numArticles,
    tracking,
}: Props) => {
    if (numArticles >= 5) {
        return (
            <div css={containerStyles}>
                You&apos;ve read{' '}
                <span css={optOutContainer}>
                    <ArticleCountOptOut
                        numArticles={numArticles}
                        nextWord=" articles"
                        type="epic"
                        tracking={tracking}
                    />
                </span>{' '}
                in the last year
            </div>
        );
    }
    return null;
};
