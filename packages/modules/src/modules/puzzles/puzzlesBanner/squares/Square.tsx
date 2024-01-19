import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { neutral, lifestyle } from '@guardian/source-foundations';
import { squareBorder } from '../puzzlesStyleUtils';
import type { ReactComponent } from '../../../../types';

type SquareColour = 'white' | 'grey' | 'pink' | 'purple';

type BorderSide = 'top' | 'right' | 'left';

type SquareProps = {
    colour: SquareColour;
    children?: React.ReactNode;
    cssOverrides?: SerializedStyles | Array<SerializedStyles | undefined>;
    removeBorder?: BorderSide[];
};

const basicSquare = css`
    border: ${squareBorder};
    position: relative;
    width: 100%;
    /* Creates a 1:1 aspect ratio */
    padding-top: 100%;
`;

const squareContents = css`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: ${squareBorder};
`;

const squareColours: { [key in SquareColour]: SerializedStyles } = {
    white: css`
        background-color: ${neutral[97]};
    `,
    grey: css`
        background-color: ${neutral[20]};
    `,
    pink: css`
        background-color: ${lifestyle[600]};
    `,
    purple: css`
        background-color: ${lifestyle[300]};
    `,
};

const borderRemovals: { [key in BorderSide]: SerializedStyles } = {
    top: css`
        border-top: none;
    `,
    right: css`
        border-right: none;
    `,
    left: css`
        border-left: none;
    `,
};

function getBorderRemoval(borderSide: BorderSide) {
    return borderRemovals[borderSide];
}

export const Square: ReactComponent<SquareProps> = ({
    colour,
    children,
    cssOverrides,
    removeBorder = [],
}) => {
    return (
        <div
            css={[
                basicSquare,
                squareColours[colour],
                cssOverrides,
                removeBorder.map(getBorderRemoval),
            ]}
        >
            {children && <div css={squareContents}>{children}</div>}
        </div>
    );
};
