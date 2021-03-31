import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { Square } from './Square';
import { minimiseButtonContainer } from '../puzzlesBannerStyles';

type MobileSquaresProps = {
    minimiseButton: React.ReactNode;
    cssOverrides?: SerializedStyles | string;
};

const mobileSquareGrid = css`
    ${from.tablet} {
        display: none;
    }
    margin-top: -${space[12]}px;
    width: 100%;
    max-width: 374px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;

const firstRow = css`
    grid-column: 3;
`;

const secondRow = css`
    grid-column: 2;
`;

const noLeftBorderOnSmallestScreens = css`
    ${until.mobileMedium} {
        border-left: none;
    }
`;

export const MobileSquares: React.FC<MobileSquaresProps> = ({ minimiseButton, cssOverrides }) => {
    return (
        <div css={[mobileSquareGrid, cssOverrides]}>
            <Square colour="purple" cssOverrides={firstRow} removeBorder={['right']} />
            <Square colour="pink" removeBorder={['right']} />
            <Square colour="pink" cssOverrides={secondRow} removeBorder={['right']} />
            <Square colour="purple" removeBorder={['right']} />
            <Square colour="grey" removeBorder={['right']} />
            <Square
                colour="purple"
                cssOverrides={noLeftBorderOnSmallestScreens}
                removeBorder={['right']}
            />
            <Square colour="grey" removeBorder={['right']} />
            <Square colour="pink" removeBorder={['right']} />
            <Square colour="purple" removeBorder={['right']} cssOverrides={minimiseButtonContainer}>
                {minimiseButton}
            </Square>
        </div>
    );
};
