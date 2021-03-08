import React from 'react';
import { css } from '@emotion/core';
import { Square } from './Square';
import { SquareSide } from './SquareSide';
import { squareBorder, squareBoxShadow } from '../puzzlesBannerStyles';

const container = css`
    pointer-events: none;
    position: absolute;
    width: 170px;
    height: 170px;
    bottom: 0;
    left: 0;
`;

const squareContainer = css`
    position: absolute;
    width: 42px;
    height: 42px;
`;

const squareOverrides = css`
    border-bottom: ${squareBorder};
    box-shadow: ${squareBoxShadow};
`;

const bottomLeft = css`
    bottom: 2px;
    left: 0;
    transform: translateX(-100%);
`;

const topLeft = css`
    z-index: -1;
    top: 0;
    left: 20px;
    transform: translateY(-30px);
`;

const topRight = css`
    top: 0;
    right: 10px;
    transform: translateY(-37px);
`;

export const MinimisedBorderSquares: React.FC = () => {
    return (
        <div css={container}>
            <div css={[squareContainer, bottomLeft]}>
                <Square colour="white" cssOverrides={squareOverrides}>
                    <SquareSide small />
                </Square>
            </div>
            <div css={[squareContainer, topLeft]}>
                <Square colour="pink" cssOverrides={squareOverrides}>
                    <SquareSide small />
                </Square>
            </div>
            <div css={[squareContainer, topRight]}>
                <Square colour="grey" cssOverrides={squareOverrides}>
                    <SquareSide small />
                </Square>
            </div>
        </div>
    );
};
