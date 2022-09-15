import { css, keyframes } from '@emotion/react';
import { news } from '@guardian/src-foundations';
import React from 'react';

export function ThermometerMercury(): JSX.Element {
    return <path css={mercuryStyles} fill={news[300]} />;
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
    animation: ${rise} 5s ease-in;
    animation-fill-mode: forwards;

    @media (prefers-reduced-motion) {
        animation: none;
        d: path('M83,64 h22 v110 H83 v-110 Z');
    }
`;
