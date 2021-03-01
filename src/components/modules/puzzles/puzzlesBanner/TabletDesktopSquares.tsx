import React from 'react';
import { css } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { Square } from './Square';
import { collapseButtonContainer } from './puzzlesBannerStyles';

type TabletDesktopSquaresProps = {
    collapseButton: React.ReactNode;
};

const backgroundSquares = css`
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
        grid-template-columns: repeat(3, minmax(1px, 170px));
        grid-template-rows: repeat(2, minmax(50%, 170px));
    }
`;

const buttonContainer = css`
    ${from.desktop} {
        transform: translateX(25%);
    }
`;

export const TabletDesktopSquares: React.FC<TabletDesktopSquaresProps> = ({ collapseButton }) => {
    return (
        <div css={backgroundSquares}>
            <Square colour="grey" removeBorder={['top', 'right']} />
            <Square colour="white" removeBorder={['top', 'right']} />
            <Square colour="pink" removeBorder={['top']} />
            <Square colour="pink" removeBorder={['right']} />
            <Square colour="pink" removeBorder={['right']} />
            <Square colour="purple" cssOverrides={[collapseButtonContainer, buttonContainer]}>
                {collapseButton}
            </Square>
        </div>
    );
};
