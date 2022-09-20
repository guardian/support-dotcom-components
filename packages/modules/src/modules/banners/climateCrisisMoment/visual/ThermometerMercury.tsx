import { css, keyframes } from '@emotion/react';
import { news } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import React from 'react';

export function ThermometerMercury(): JSX.Element {
    return <path css={mercuryStyles} fill={news[300]} />;
}

const riseDesktop = keyframes`
    0% {
        d: path('M83,145 h22 v110 H83 v-110 Z');
    }
    100% {
        d: path('M83, 10 h22 v200 H83 v-110 Z');
    }
`;

const riseTablet = keyframes`
    0% {
        d: path('M68 145 h15 v65 H68 V59 Z');
    }
    100% {
        d: path('M68 10 h15 v165 H68 V59 Z');
    }
`;

const riseMobile = keyframes`
    0% {
        d: path('M41 0 V50 h8 v65 h-8 z');
    }
    100% {
        d: path('M41 0 V5 h8 v65 h-8 z');
    }
`;

const mercuryStyles = css`
    d: path('M41 0 V50 h8 v65 h-8 z');
    animation: ${riseMobile} 5s ease-in;
    animation-delay: 1s;
    animation-fill-mode: forwards;

    ${from.tablet} {
        d: path('M68 145 h15 v65 H68 V59 Z');
        animation-name: ${riseTablet};
    }

    ${from.desktop} {
        d: path('M83 145 h22 v110 H83 v-110 Z');
        animation-name: ${riseDesktop};
    }

    @media (prefers-reduced-motion) {
        animation: none !important;
        d: path('M41 0 V30 h8 v65 h-8 z');

        ${from.tablet} {
            d: path('M68 59 h15 v107 H68 V59 Z');
        }

        ${from.desktop} {
            d: path('M83 64 h22 v110 H83 v-110 Z');
        }
    }
`;
