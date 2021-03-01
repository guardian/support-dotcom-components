import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, lifestyle } from '@guardian/src-foundations/palette';

type SquareColour = 'white' | 'grey' | 'pink' | 'purple';

type SquareSize = 'small' | 'large';

type SquareProps = {
    colour: SquareColour;
    children?: React.ReactNode;
    cssOverrides?: SerializedStyles | SerializedStyles[];
    size?: SquareSize;
};

const basicSquare = css`
    border: 2px solid ${neutral[0]};
    position: relative;
`;

const squareContents = css`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const squareSizes: { [key in SquareSize]: SerializedStyles } = {
    small: css`
        height: 100%;
        padding-left: 100%; /* 1:1 Aspect Ratio */
    `,
    large: css`
        width: 180px;
        height: 180px;
    `,
};

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

export const Square: React.FC<SquareProps> = (props: SquareProps) => {
    return (
        <div
            css={[
                basicSquare,
                squareSizes[props.size || 'small'],
                squareColours[props.colour],
                props.cssOverrides,
            ]}
        >
            {props.children && <div css={squareContents}>{props.children}</div>}
        </div>
    );
};
