import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import { squareBorder, squareBoxShadow } from '../puzzlesStyleUtils';
import type { ReactComponent } from '../../../../types';

const squareSide = css`
    position: relative;
    background-color: ${neutral[20]};
    border: ${squareBorder};
    border-top: none;
    border-right: none;
    border-radius: 2px 0 0 0;
    transform: translate(-10px, 2px);
    height: 100%;
    box-shadow: ${squareBoxShadow};

    ::before {
        content: ' ';
        display: block;
        width: 6px;
        background-color: ${neutral[20]};
        border-top: ${squareBorder};
        height: 100%;
        transform: translateY(-2px) skewY(-30deg);
    }
`;

const squareSideSmall = css`
    transform: translate(-7px, 2px);
    ::before {
        width: 3px;
    }
`;

type SquareSideProps = {
    small?: boolean;
};

export const SquareSide: ReactComponent<SquareSideProps> = ({ small }) => {
    return <div css={[squareSide, small ? squareSideSmall : '']}></div>;
};
