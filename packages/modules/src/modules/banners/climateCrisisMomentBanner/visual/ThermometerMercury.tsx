import { css, keyframes } from '@emotion/react';
import React from 'react';

export function ThermometerMercury(): JSX.Element {
    return <path css={mercuryStyles} fill="#AB0613" />;
}

const rise = keyframes`
    0% {
        d: path("M83,145 h22 v110 H83 v-110 Z");
    }
    100% {
        d: path("M83, 0 h22 v200 H83 v-110 Z");
    }
`;

const mercuryStyles = css`
    animation: ${rise} 8s ease-in;
    animation-fill-mode: forwards;
`;
