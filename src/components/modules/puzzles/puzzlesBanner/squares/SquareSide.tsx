import React from 'react';
import { css } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';

const boxShadow = '0px 6px 0px rgba(0, 0, 0, 0.25);';
const border = `2px solid ${neutral[0]}`;

const squareSide = css`
    position: relative;
    background-color: ${neutral[20]};
    border: ${border};
    border-top: none;
    border-right: none;
    border-radius: 2px 0 0 0;
    transform: translate(-10px, 2px);
    height: 100%;
    box-shadow: ${boxShadow};

    ::before {
        content: ' ';
        display: block;
        width: 6px;
        background-color: ${neutral[20]};
        border-top: ${border};
        height: 100%;
        transform: translateY(-2px) skewY(-30deg);
    }
`;

export const SquareSide: React.FC = () => {
    return <div css={squareSide}></div>;
};
