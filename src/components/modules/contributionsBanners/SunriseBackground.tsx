import React from 'react';
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

const innerCircle = css`
    color: ${brandAlt[400]};
`;

const innerCircleGoalNotReachedAnimation = (
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
        animation-name: grow-${nameSuffix};
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;
    `;
};

const innnerCircleMobile = (percentage: number): string => {
    return css`
        ${innerCircle}

        ${innerCircleGoalNotReachedAnimation(
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

const innnerCircleTablet = (percentage: number): string => {
    return css`
        ${innerCircle}

        ${innerCircleGoalNotReachedAnimation(
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

const innnerCircleDesktop = (percentage: number): string => {
    return css`
        ${innerCircle}

        ${innerCircleGoalNotReachedAnimation(
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

const innnerCircleWide = (percentage: number): string => {
    return css`
        ${innerCircle}

        ${innerCircleGoalNotReachedAnimation(
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
        <div className={svgContainer}>
            <svg className={svg} viewBox="0 0 1300 230">
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
