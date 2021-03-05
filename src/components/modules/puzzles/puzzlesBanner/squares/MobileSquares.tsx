import React from 'react';
import { css } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { Square } from './Square';
import { collapseButtonContainer } from '../puzzlesBannerStyles';

type MobileSquaresProps = {
    collapseButton: React.ReactNode;
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

export const MobileSquares: React.FC<MobileSquaresProps> = ({ collapseButton }) => {
    return (
        <div css={mobileSquareGrid}>
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
            <Square colour="purple" removeBorder={['right']} cssOverrides={collapseButtonContainer}>
                {collapseButton}
            </Square>
        </div>
    );
};
