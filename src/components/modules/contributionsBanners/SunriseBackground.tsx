import React from 'react';
import { css } from 'emotion';
import { brandAlt, opinion } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

const sunSVGContainer = css`
    position: absolute;
    width: 100%;
`;

const sunSVG = css`
    width: 100%;
    height: 420px;
    background-color: ${opinion[500]};
`;

function getInnerCircleFill(start: number, stop: number, percentage: number): number {
    return start * (1 - percentage) + stop * percentage;
}

const innnerCircleMobile = (percentage: number): string => {
    const start = 30;
    const stop = 50;
    const fill = getInnerCircleFill(start, stop, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-mobile {
            0% {
                clip-path: circle(${start}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        color: ${brandAlt[400]};
        animation-name: grow-mobile;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;

        ${from.tablet} {
            display: none;
        }
    `;
};

const innnerCircleTablet = (percentage: number): string => {
    const start = 20;
    const stop = 50;
    const fill = getInnerCircleFill(start, stop, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-tablet {
            0% {
                clip-path: circle(${start}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        color: ${brandAlt[400]};
        animation-name: grow-tablet;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;

        display: none;

        ${from.tablet} {
            display: block;
        }

        ${from.desktop} {
            display: none;
        }
    `;
};

const innnerCircleDesktop = (percentage: number): string => {
    const start = 18;
    const stop = 50;
    const fill = getInnerCircleFill(start, stop, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-desktop {
            0% {
                clip-path: circle(${start}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        color: ${brandAlt[400]};
        animation-name: grow-desktop;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;

        display: none;

        ${from.desktop} {
            display: block;
        }

        ${from.wide} {
            display: none;
        }
    `;
};

const innnerCircleWide = (percentage: number): string => {
    const start = 18;
    const stop = 50;
    const fill = getInnerCircleFill(start, stop, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-wide {
            0% {
                clip-path: circle(${start}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        color: ${brandAlt[400]};
        animation-name: grow-wide;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;

        display: none;

        ${from.desktop} {
            display: block;
        }
    `;
};

const outerCircleMobile = css`
    color: ${brandAlt[200]};

    ${from.tablet} {
        display: none;
    }
`;

const outerCircleTablet = css`
    color: ${brandAlt[200]};
    display: none;

    ${from.tablet} {
        display: block;
    }

    ${from.desktop} {
        display: none;
    }
`;

const outerCircleDesktop = css`
    color: ${brandAlt[200]};
    display: none;

    ${from.desktop} {
        display: block;
    }

    ${from.wide} {
        display: none;
    }
`;

const outerCircleWide = css`
    color: ${brandAlt[200]};
    display: none;

    ${from.wide} {
        display: block;
    }
`;

export interface SunriseBackgroundProps {
    percentage: number;
}

const SunriseBackground: React.FC<SunriseBackgroundProps> = ({
    percentage,
}: SunriseBackgroundProps) => {
    return (
        <div className={sunSVGContainer}>
            <svg className={sunSVG} viewBox="0 0 1300 230">
                {/* wide */}
                <circle className={outerCircleWide} cx="50%" cy="90%" r="45%" fill="currentColor" />
                <circle
                    className={innnerCircleWide(percentage)}
                    cx="50%"
                    cy="90%"
                    r="45%"
                    fill="currentColor"
                />
                {/* desktop */}
                <circle
                    className={outerCircleDesktop}
                    cx="50%"
                    cy="90%"
                    r="55%"
                    fill="currentColor"
                />
                <circle
                    className={innnerCircleDesktop(percentage)}
                    cx="50%"
                    cy="90%"
                    r="55%"
                    fill="currentColor"
                />
                {/* tablet */}
                <circle
                    className={outerCircleTablet}
                    cx="50%"
                    cy="90%"
                    r="55%"
                    fill="currentColor"
                />
                <circle
                    className={innnerCircleTablet(percentage)}
                    cx="50%"
                    cy="90%"
                    r="55%"
                    fill="currentColor"
                />
                {/* mobile */}
                <circle
                    className={outerCircleMobile}
                    cx="50%"
                    cy="75%"
                    r="66%"
                    fill="currentColor"
                />
                <circle
                    className={innnerCircleMobile(percentage)}
                    cx="50%"
                    cy="75%"
                    r="66%"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};

export default SunriseBackground;
