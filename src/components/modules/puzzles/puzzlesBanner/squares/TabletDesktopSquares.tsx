import React from 'react';
import { css } from '@emotion/react';
import { from, until } from '@guardian/src-foundations/mq';
import { Square } from './Square';
import { minimiseButtonContainer } from '../puzzlesBannerStyles';

type TabletDesktopSquaresProps = {
    minimiseButton: React.ReactNode;
};

const backgroundSquaresGrid = css`
    ${until.tablet} {
        display: none;
    }
    height: 100%;
    display: grid;
    overflow: hidden;

    ${from.tablet} {
        grid-template-columns: 150px repeat(2, minmax(1px, 152px));
        grid-template-rows: 110px 150px;
    }

    ${from.desktop} {
        overflow: visible;
        grid-template-columns: repeat(3, minmax(1px, 172px));
        grid-template-rows: repeat(2, 170px);
    }
`;

const nudgeSquareRight = css`
    ${from.desktop} {
        transform: translateX(44px);
    }
`;

function gridPlacement(row: number, column: number) {
    return css`
        grid-row: ${row};
        grid-column: ${column};
    `;
}

export const TabletDesktopSquares: React.FC<TabletDesktopSquaresProps> = ({ minimiseButton }) => {
    return (
        <div css={backgroundSquaresGrid}>
            <Square
                colour="grey"
                removeBorder={['top', 'right']}
                cssOverrides={gridPlacement(1, 1)}
            />
            <Square
                colour="white"
                removeBorder={['top', 'right']}
                cssOverrides={gridPlacement(1, 2)}
            />
            <Square colour="pink" removeBorder={['top']} cssOverrides={gridPlacement(1, 3)} />
            <Square colour="pink" removeBorder={['right']} cssOverrides={gridPlacement(2, 1)} />
            <Square colour="pink" removeBorder={['right']} cssOverrides={gridPlacement(2, 2)} />
            <Square
                colour="purple"
                cssOverrides={[minimiseButtonContainer, nudgeSquareRight, gridPlacement(2, 3)]}
            >
                {minimiseButton}
            </Square>
        </div>
    );
};
