import React from 'react';
import { css } from '@emotion/core';
import { Square } from './Square';
import { SquareSide } from './SquareSide';
import { squareBorder, squareBoxShadow } from '../puzzlesBannerStyles';
import { from } from '@guardian/src-foundations/mq';

const smallSquareSizes = {
    mobile: 32,
    tablet: 42,
};

const container = css`
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
`;

const squareContainer = css`
    position: absolute;
    width: ${smallSquareSizes.mobile}px;
    height: ${smallSquareSizes.mobile}px;

    ${from.mobileLandscape} {
        width: ${smallSquareSizes.tablet}px;
        height: ${smallSquareSizes.tablet}px;
    }
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
    transform: translateY(-70%);
`;

const topRight = css`
    top: 0;
    right: 10px;
    transform: translateY(-90%);
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
