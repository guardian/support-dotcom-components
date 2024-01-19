import React from 'react';
import { css } from '@emotion/react';
import { Square } from './Square';
import { SquareSide } from './SquareSide';
import { squareBorder, squareBoxShadow } from '../puzzlesStyleUtils';
import { from, space } from '@guardian/source-foundations';
import type { ReactComponent } from '../../../../types';

const smallSquareSizes = {
    mobile: 33,
    tablet: 43,
};

const buttonContainerSize = 24;

const container = css`
    position: absolute;
    width: 98%;
    height: 98%;
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

const minimiseButtonContainer = css`
    align-self: center;
    width: ${buttonContainerSize}px;
    height: ${buttonContainerSize}px;
    position: absolute;
    right: 2px;

    ${from.mobileLandscape} {
        right: ${space[2]}px;
    }
`;

type MinimisedBorderSquaresProps = {
    minimiseButton: React.ReactNode;
};

export const MinimisedBorderSquares: ReactComponent<MinimisedBorderSquaresProps> = ({
    minimiseButton,
}) => {
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
                    <div css={minimiseButtonContainer}>{minimiseButton}</div>
                </Square>
            </div>
        </div>
    );
};
