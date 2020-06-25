import React, { useState } from 'react';
import { css } from 'emotion';
import { brandAlt, opinion } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

const svgContainer = css`
    position: absolute;
    width: 100%;
`;

const svg = css`
    width: 100%;
    height: 420px;
    background-color: ${opinion[500]};
`;

function getInnerCircleFill(start: number, stop: number, percentage: number): number {
    return start * (1 - percentage) + stop * percentage;
}

const INNER_CIRCLE_MOBILE_START_FILL = 30;
const INNER_CIRCLE_TABLET_START_FILL = 20;
const INNER_CIRCLE_DESKTOP_START_FILL = 18;
const INNER_CIRCLE_WIDE_START_FILL = 18;
const INNER_CIRCLE_FINAL_FILL = 50;
const INNER_CIRCLE_PULSE_FILL_DIFF = 2;
const INNER_CIRCLE_ANIMATION_DURATION_IN_MS = 2000;

const innerCircle = css`
    color: ${brandAlt[400]};
`;
const innerCircleAnimation = (
    startFill: number,
    finalFill: number,
    percentage: number,
    nameSuffix: string,
): string => {
    const fill = getInnerCircleFill(startFill, finalFill, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-${nameSuffix} {
            0% {
                clip-path: circle(${startFill}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        @keyframes pulse-${nameSuffix} {
            0% {
                clip-path: circle(${fill}%);
            }
            100% {
                clip-path: circle(${fill - INNER_CIRCLE_PULSE_FILL_DIFF}%);
            }
        }

        animation-name: grow-${nameSuffix}, pulse-${nameSuffix};
        animation-duration: 2s, 2s;
        animation-delay: 0s, 2.2s;
        animation-timing-function: ease, ease-in-out;
        animation-iteration-count: 1, infinite;
        animation-direction: normal, alternate;
    `;
};

const innerCircleMobile = (percentage: number): string => {
    return css`
    ${innerCircle}

    ${innerCircleAnimation(
        INNER_CIRCLE_MOBILE_START_FILL,
        INNER_CIRCLE_FINAL_FILL,
        percentage,
        'mobile',
    )}

    ${from.tablet} {
        display: none;
    }
`;
};

const innerCircleTablet = (percentage: number): string => {
    return css`
        ${innerCircle}

        ${innerCircleAnimation(
            INNER_CIRCLE_TABLET_START_FILL,
            INNER_CIRCLE_FINAL_FILL,
            percentage,
            'tablet',
        )}
    display: none;

        ${from.tablet} {
            display: block;
        }

        ${from.desktop} {
            display: none;
        }
    `;
};

const innerCircleDesktop = (percentage: number): string => {
    return css`
        ${innerCircle}

        ${innerCircleAnimation(
            INNER_CIRCLE_DESKTOP_START_FILL,
            INNER_CIRCLE_FINAL_FILL,
            percentage,
            'desktop',
        )}
        
    display: none;

        ${from.desktop} {
            display: block;
        }

        ${from.wide} {
            display: none;
        }
    `;
};

const innerCircleWide = (percentage: number): string => {
    return css`
        ${innerCircle}

        ${innerCircleAnimation(
            INNER_CIRCLE_WIDE_START_FILL,
            INNER_CIRCLE_FINAL_FILL,
            percentage,
            'wide',
        )}

        display: none;

        ${from.desktop} {
            display: block;
        }
    `;
};

const outerCircle = css`
    color: ${brandAlt[200]};
`;

const outerCircleMobile = css`
    ${outerCircle}

    ${from.tablet} {
        display: none;
    }
`;

const outerCircleTablet = css`
    ${outerCircle}

    display: none;

    ${from.tablet} {
        display: block;
    }

    ${from.desktop} {
        display: none;
    }
`;

const outerCircleDesktop = css`
    ${outerCircle}

    display: none;

    ${from.desktop} {
        display: block;
    }

    ${from.wide} {
        display: none;
    }
`;

const outerCircleWide = css`
    ${outerCircle}

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
    const isGoalReached = percentage >= 1.0;

    const [showOuterCircle, setShowOuterCircle] = useState(true);

    if (isGoalReached) {
        setTimeout(() => {
            setShowOuterCircle(false);
        }, INNER_CIRCLE_ANIMATION_DURATION_IN_MS);
    }
    return (
        <div className={svgContainer}>
            <svg className={svg} viewBox="0 0 1300 230">
                {showOuterCircle && (
                    <g>
                        <circle
                            className={outerCircleWide}
                            cx="50%"
                            cy="90%"
                            r="45%"
                            fill="currentColor"
                        />
                        <circle
                            className={outerCircleDesktop}
                            cx="50%"
                            cy="90%"
                            r="55%"
                            fill="currentColor"
                        />
                        <circle
                            className={outerCircleTablet}
                            cx="50%"
                            cy="90%"
                            r="55%"
                            fill="currentColor"
                        />
                        <circle
                            className={outerCircleMobile}
                            cx="50%"
                            cy="75%"
                            r="66%"
                            fill="currentColor"
                        />
                    </g>
                )}
                <g>
                    <circle
                        className={innerCircleWide(percentage)}
                        cx="50%"
                        cy="90%"
                        r="45%"
                        fill="currentColor"
                    />
                    <circle
                        className={innerCircleDesktop(percentage)}
                        cx="50%"
                        cy="90%"
                        r="55%"
                        fill="currentColor"
                    />
                    <circle
                        className={innerCircleTablet(percentage)}
                        cx="50%"
                        cy="90%"
                        r="55%"
                        fill="currentColor"
                    />
                    <circle
                        className={innerCircleMobile(percentage)}
                        cx="50%"
                        cy="75%"
                        r="66%"
                        fill="currentColor"
                    />
                </g>
            </svg>
        </div>
    );
};

export default SunriseBackground;
