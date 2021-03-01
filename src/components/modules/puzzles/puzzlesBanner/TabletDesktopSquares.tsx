import React from 'react';
import { css } from '@emotion/core';
import { until } from '@guardian/src-foundations/mq';
import { Square } from './Square';
import { collapseButtonContainer } from './puzzlesBannerStyles';

type TabletDesktopSquaresProps = {
    collapseButton: React.ReactNode;
};

const backgroundSquares = css`
    ${until.tablet} {
        display: none;
    }
    display: grid;
    grid-template-columns: repeat(3, minmax(150px, 1fr));
    grid-template-rows: repeat(2, 50%);
`;

export const TabletDesktopSquares: React.FC<TabletDesktopSquaresProps> = ({ collapseButton }) => {
    return (
        <div css={backgroundSquares}>
            <Square colour="grey" removeBorder={['top', 'right']} />
            <Square colour="white" removeBorder={['top', 'right']} />
            <Square colour="pink" removeBorder={['top']} />
            <Square colour="pink" removeBorder={['right']} />
            <Square colour="white" removeBorder={['right']} />
            <Square colour="purple" cssOverrides={collapseButtonContainer}>
                {collapseButton}
            </Square>
        </div>
    );
};
