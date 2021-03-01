import React from 'react';
import { css } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { Square } from './Square';
import { collapseButtonContainer } from './puzzlesBannerStyles';

type MobileSquaresProps = {
    collapseButton: React.ReactNode;
};

const mobileSquareGrid = css`
    ${from.tablet} {
        display: none;
    }

    margin-top: -${space[12]}px;
    width: 100%;
    max-width: 384px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;

const firstRow = css`
    grid-column-start: 3;
`;

const secondRow = css`
    grid-column-start: 2;
`;

const selectivelyRemoveBorder = css`
    ${until.mobileLandscape} {
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
                cssOverrides={selectivelyRemoveBorder}
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
