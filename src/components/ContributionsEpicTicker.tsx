import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq/cjs';
import { headline } from '@guardian/src-foundations/typography/cjs';
import { useHasBeenSeen, HasBeenSeen } from '../hooks/useHasBeenSeen';
import {TickerSettings} from "../lib/variants";

// This ticker component provides an animated progress bar and counter for the
// epic. It mirrors the behaviour of the "unlimited" ticker type from frontend.
// The "hardstop" type is not supported. The differences between the two relate
// to behaviour once the goal has been reached.

const rootStyles = css`
    position: relative;
    height: 65px;
    margin-bottom: 15px;
    line-height: 18px;
`;

const totalCountStyles = css`
    ${headline.xxxsmall({ fontWeight: 'bold' })};
`;

const soFarCountStyles = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
`;

const countLabelStyles = css`
    ${headline.xxxsmall({ fontStyle: 'italic' })};
`;

const progressBarHeight = 10;

const progressBarContainerStyles = css`
    width: 100%;
    height: ${progressBarHeight}px;
    background-color: ${palette.neutral[86]};
    position: absolute;
    bottom: 0;
    margin-top: 40px;
`;

const progressBarStyles = css`
    overflow: hidden;
    width: 100%;
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

const filledProgressStyles = (end: number, runningTotal: number, total: number) =>
    css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: ${progressBarTransform(end, runningTotal, total)};
        transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
        background-color: ${palette.brandAlt.main};
    `;

const goalReachedGoalContainerStyles = css`
    display: none;
    ${from.tablet} {
        display: initial;
    }
`;

const goalContainerStyles = (goalReached: boolean) => css`
    position: absolute;
    right: 0;
    bottom: ${progressBarHeight + 5}px;
    text-align: right;
    ${goalReached && goalReachedGoalContainerStyles}
`;

const goalMarkerStyles = (transform: string) => css`
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

        return <div className={goalMarkerStyles(markerTransform)} />;
    } else {
        return null;
    }
};

type Props = {
    settings: TickerSettings;
    total: number;
    goal: number;
};

export const ContributionsEpicTicker: React.FC<Props> = ({ settings, total, goal }: Props) => {
    const [runningTotal, setRunningTotal] = useState<number>(0);
    const [readyToAnimate, setReadyToAnimate] = useState<boolean>(false);

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

    useEffect(() => {
        if (readyToAnimate && runningTotal < total) {
            window.requestAnimationFrame(() => {
                setRunningTotal(prevRunningTotal => {
                    const newRunningTotal = prevRunningTotal + Math.floor(total / 100);

                    if (newRunningTotal > total) {
                        return total;
                    }

                    return newRunningTotal;
                });
            });
        }
    }, [runningTotal, readyToAnimate, total]);

    const goalReached = total >= goal;
    const currencySymbol = settings.countType === 'money' ? settings.currencySymbol : '';

    // If we've exceeded the goal then extend the bar 15% beyond the total
    const end = total > goal ? total + total * 0.15 : goal;

    return (
        <div ref={setNode} className={rootStyles}>
            <div>
                <div className={soFarContainerStyles}>
                    <div className={soFarCountStyles}>
                        {goalReached
                            ? settings.copy.goalReachedPrimary
                            : `${currencySymbol}${runningTotal.toLocaleString()}`}
                    </div>
                    <div className={countLabelStyles}>
                        {goalReached ? settings.copy.goalReachedSecondary : settings.copy.countLabel}
                    </div>
                </div>

                <div className={goalContainerStyles(goalReached)}>
                    <div className={totalCountStyles}>
                        {goalReached
                            ? `${currencySymbol}${total.toLocaleString()}`
                            : `${currencySymbol}${goal.toLocaleString()}`}
                    </div>
                    <div className={countLabelStyles}>
                        {goalReached ? settings.copy.countLabel : 'our goal'}
                    </div>
                </div>
            </div>

            <div className={progressBarContainerStyles}>
                <div className={progressBarStyles}>
                    <div className={filledProgressStyles(end, runningTotal, total)}></div>
                </div>
                <Marker goal={goal} end={end} />
            </div>
        </div>
    );
};
