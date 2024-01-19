import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';
import { space } from '@guardian/source-foundations';
import { Square } from './Square';
import type { ReactComponent } from '../../../../types';

type MobileSquaresProps = {
    cssOverrides?: SerializedStyles | string;
};

const mobileSquareGrid = css`
    ${from.tablet} {
        display: none;
    }

    margin-top: -72px;
    width: 100%;
    max-width: 374px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    ${from.mobileMedium} {
        margin-top: -${space[12]}px;
    }
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

export const MobileSquares: ReactComponent<MobileSquaresProps> = ({ cssOverrides }) => {
    return (
        <div css={[mobileSquareGrid, cssOverrides]}>
            <Square colour="purple" cssOverrides={firstRow} removeBorder={['right']} />
            <Square colour="pink" removeBorder={['right']} />
            <Square colour="pink" cssOverrides={secondRow} removeBorder={['right']} />
            <Square colour="pink" removeBorder={['right']} />
            <Square colour="grey" removeBorder={['right']} />
            <Square
                colour="purple"
                cssOverrides={noLeftBorderOnSmallestScreens}
                removeBorder={['right']}
            />
            <Square colour="grey" removeBorder={['right']} />
            <Square colour="purple" removeBorder={['right']} />
            <Square colour="purple" removeBorder={['right']} />
        </div>
    );
};
