import React, { useState, useEffect } from 'react';
import { useHasBeenSeen, HasBeenSeen } from '../../../../../hooks/useHasBeenSeen';
import { TickerSettings } from '../../../../../types/shared';
import { headline, body } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { css, SerializedStyles } from '@emotion/core';

import useTicker from '../../../../../hooks/useTicker';

const rootStyles = css`
    position: relative;
    height: 65px;
    line-height: 18px;
    margin-bottom: ${space[3]}px;
`;

const totalCountStyles = (colour: string): SerializedStyles => css`
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    color: ${colour};
`;

const soFarCountStyles = (colour: string): SerializedStyles => css`
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    color: ${colour};
`;

const countLabelStyles = css`
    ${body.small()};
    color: ${neutral[100]};
    font-style: italic;
`;

const progressBarHeight = 12;

const progressBarContainerStyles = css`
    width: 100%;
    height: ${progressBarHeight}px;
    background-color: #04ffff;
    position: absolute;
    bottom: 0;
    margin-top: 40px;
`;

const progressBarStyles = css`
    overflow: hidden;
    width: 100%;
    background: white;
    height: ${progressBarHeight}px;
    position: absolute;
`;

const soFarContainerStyles = css`
    position: absolute;
    left: 0;
    bottom: ${progressBarHeight + 5}px;
`;

const progressBarTransform = (end: number, runningTotal: number, total: number): string => {
    const haveStartedAnimating = runningTotal > 0;

    if (!haveStartedAnimating) {
        return 'translateX(-100%)';
    }

    const percentage = (total / end) * 100 - 100;

    return `translate3d(${percentage >= 0 ? 0 : percentage}%, 0, 0)`;
};

const filledProgressStyles = (
    end: number,
    runningTotal: number,
    total: number,
    colour: string,
): SerializedStyles =>
    css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: ${progressBarTransform(end, runningTotal, total)};
        transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
        background-color: ${colour};
    `;

const goalContainerStyles = css`
    position: absolute;
    right: 0;
    bottom: ${progressBarHeight + 5}px;
    text-align: right;
`;

const goalMarkerStyles = (transform: string): SerializedStyles => css`
    border-right: 2px solid ${palette.neutral[7]};
    content: ' ';
    display: block;
    height: 12px;
    margin-top: -2px;
    transform: ${transform};
`;

type MarkerProps = {
    goal: number;
    end: number;
};

const Marker: React.FC<MarkerProps> = ({ goal, end }: MarkerProps) => {
    if (end > goal) {
        const markerTranslate = (goal / end) * 100 - 100;
        const markerTransform = `translate3d(${markerTranslate}%, 0, 0)`;

        return <div css={goalMarkerStyles(markerTransform)} />;
    } else {
        return null;
    }
};

type AusBannerTickerProps = {
    settings: TickerSettings;
    accentColour: string;
};

const AusBannerTicker: React.FC<AusBannerTickerProps> = ({
    settings,
    accentColour,
}: AusBannerTickerProps) => {
    const [readyToAnimate, setReadyToAnimate] = useState(false);

    const debounce = true;
    const [hasBeenSeen, setNode] = useHasBeenSeen(
        {
            rootMargin: '-18px',
            threshold: 0,
        },
        debounce,
    ) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen) {
            setTimeout(() => setReadyToAnimate(true), 500);
        }
    }, [hasBeenSeen]);

    const total = settings.tickerData?.total || 1;
    const goal = settings.tickerData?.goal || 1;
    const isGoalReached = total >= goal;
    const runningTotal = useTicker(total, readyToAnimate);

    // If we've exceeded the goal then extend the bar 15% beyond the total
    const end = isGoalReached ? total + total * 0.15 : goal;

    return (
        <div ref={setNode} css={rootStyles}>
            <div>
                <div css={soFarContainerStyles}>
                    <div css={soFarCountStyles('white')}>
                        {!isGoalReached}
                        {isGoalReached
                            ? settings.copy.goalReachedPrimary
                            : runningTotal.toLocaleString()}
                    </div>
                    <div css={countLabelStyles}>
                        {isGoalReached
                            ? settings.copy.goalReachedSecondary
                            : settings.copy.countLabel}
                    </div>
                </div>

                <div css={goalContainerStyles}>
                    <div css={totalCountStyles('white')}>
                        {isGoalReached ? runningTotal.toLocaleString() : goal.toLocaleString()}
                    </div>
                    <div css={countLabelStyles}>
                        {isGoalReached ? settings.copy.countLabel : 'our goal'}
                    </div>
                </div>
            </div>

            <div css={progressBarContainerStyles}>
                <div css={progressBarStyles}>
                    <div css={filledProgressStyles(end, runningTotal, total, accentColour)}></div>
                </div>
                <Marker goal={goal} end={end} />
            </div>
        </div>
    );
};

export default AusBannerTicker;
