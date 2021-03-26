import React from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { Square } from './Square';
import { SquareSide } from './SquareSide';
import { from } from '@guardian/src-foundations/mq';

const squareContainer = css`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
`;

const heading = css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    margin: 0;

    ${from.mobileLandscape} {
        ${headline.small({ fontWeight: 'bold' })}
    }
`;

const removeTopBorder = css`
    border-top: none;
`;

const content = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding-right: ${space[2]}px;
    padding-bottom: ${space[2]}px;

    ${from.mobileLandscape} {
        padding-bottom: ${space[3]}px;
    }
`;

type MinimisedContentSquareProps = {
    minimiseButton: React.ReactNode;
};

export const MinimisedContentSquare: React.FC<MinimisedContentSquareProps> = ({
    minimiseButton,
}) => {
    return (
        <div css={squareContainer}>
            <Square colour="purple" cssOverrides={removeTopBorder}>
                <SquareSide />
                <div css={content}>
                    <h3 css={heading}>Master every challenge</h3>
                    {minimiseButton}
                </div>
            </Square>
        </div>
    );
};
