import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { Square } from './Square';

const mobileSquareGrid = css`
    ${from.tablet} {
        display: none;
    }

    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, minmax(96px, 33%));
`;

const firstRow = css`
    grid-column-start: 3;
`;

const secondRow = css`
    grid-column-start: 2;
`;

export const MobileSquares: React.FC = () => {
    return (
        <div css={mobileSquareGrid}>
            <Square colour="purple" cssOverrides={firstRow} />
            <Square colour="pink" />
            <Square colour="pink" cssOverrides={secondRow} />
            <Square colour="purple" />
            <Square colour="grey" />
            <Square colour="purple" />
            <Square colour="grey" />
            <Square colour="pink" />
            <Square colour="purple" />
        </div>
    );
};
