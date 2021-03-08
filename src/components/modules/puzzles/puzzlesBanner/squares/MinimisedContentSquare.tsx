import React from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
// import { from, until } from '@guardian/src-foundations/mq';
import { Square } from './Square';
import { SquareSide } from './SquareSide';

const squareContainer = css`
    width: 170px;
    height: 170px;
    transform: translateX(-2px);
`;

const heading = css`
    ${headline.small({ fontWeight: 'bold' })};
    margin: 0;
`;

const removeTopBorder = css`
    border-top: none;
`;

const content = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: ${space[2]}px;
    padding-bottom: ${space[3]}px;
`;

type MinimisedContentSquareProps = {
    collapseButton: React.ReactNode;
};

export const MinimisedContentSquare: React.FC<MinimisedContentSquareProps> = ({
    collapseButton,
}) => {
    return (
        <div css={squareContainer}>
            <Square colour="purple" cssOverrides={removeTopBorder}>
                <SquareSide />
                <div css={content}>
                    <h3 css={heading}>Master every challenge</h3>
                    {collapseButton}
                </div>
            </Square>
        </div>
    );
};
