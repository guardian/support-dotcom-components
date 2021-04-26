// --- Imports --- //

import React from 'react';
import { body, textSans } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { css } from '@emotion/core';
import { Button } from '@guardian/src-button';

// --- Styles --- //

const containerStyles = css`
    ${body.medium({ fontWeight: 'bold' })};
    font-style: italic;
`;

const optOutContainer = css`
    color: ${palette.opinion[400]};
`;

const headerContainerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const articleCountTextStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })};
`;

const articleCountWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

// --- Types --- //

interface Props {
    numArticles: number;
}

export interface ContributionsEpicArticleCountOptOutProps {
    numArticles: number;
}

// -- Components -- //

export const ContributionsEpicArticleCountAbove: React.FC<Props> = ({ numArticles }: Props) => {
    return (
        <div css={containerStyles}>
            You&apos;ve read <span css={optOutContainer}>{numArticles} articles</span> in the last
            year
        </div>
    );
};

export const ContributionsEpicArticleCountOptOut: React.FC<ContributionsEpicArticleCountOptOutProps> = ({
    numArticles,
}: ContributionsEpicArticleCountOptOutProps) => {
    return (
        <>
            <div css={headerContainerStyles}>
                <div>
                    <ContributionsEpicArticleCountAbove numArticles={numArticles} />
                </div>
                <div css={articleCountWrapperStyles}>
                    <div css={articleCountTextStyles}>Article count</div>
                    <Button priority="tertiary" size="small">
                        On
                    </Button>
                </div>
            </div>
        </>
    );
};
