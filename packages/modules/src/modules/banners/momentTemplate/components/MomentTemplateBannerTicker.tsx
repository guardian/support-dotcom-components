import React, { useState, useEffect } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { news, palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { TickerSettings } from '@sdc/shared/types';
import { HasBeenSeen, useHasBeenSeen } from '../../../../hooks/useHasBeenSeen';
import useTicker from '../../../../hooks/useTicker';
import { from } from '@guardian/src-foundations/mq';

const containerStyles = css`
    position: relative;
    // fixed height must be set
    height: 65px;
    line-height: 18px;
`;

const countLabelStyles = css`
    ${textSans.xsmall({ fontWeight: 'bold' })};
    font-size: 13px;
    color: ${news[400]};
    line-height: 1.3;

    ${from.desktop} {
        font-size: 17px;
    }
`;

const progressBarHeight = 12;

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
    background: #fff;
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

    const percentage = (total / end) * 100 - 110;

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
    border-right: 2px solid ${palette.news[400]};
    content: ' ';
    display: block;
    height: calc(100% + 6px);
    margin-top: -3px;
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
        return <div css={goalMarkerStyles('translate3d(-10%, 0, 0)')} />;
    }
};

type MomentTemplateBannerTickerProps = {
    tickerSettings: TickerSettings;
    accentColour: string;
};

const MomentTemplateBannerTicker: React.FC<MomentTemplateBannerTickerProps> = ({
    tickerSettings,
    accentColour,
}: MomentTemplateBannerTickerProps) => {
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

    const total = tickerSettings.tickerData?.total || 1;
    const goal = tickerSettings.tickerData?.goal || 1;
    const isGoalReached = total >= goal;
    const runningTotal = useTicker(total, readyToAnimate);
    const currencySymbol =
        tickerSettings.countType === 'money' ? tickerSettings.currencySymbol : '';

    // If we've exceeded the goal then extend the bar 15% beyond the total
    const end = isGoalReached ? total + total * 0.15 : goal;

    return (
        <div ref={setNode} css={containerStyles}>
            <div>
                <div css={soFarContainerStyles}>
                    <div css={countLabelStyles}>
                        {!isGoalReached && currencySymbol}
                        {isGoalReached
                            ? tickerSettings.copy.goalReachedPrimary
                            : runningTotal.toLocaleString()}{' '}
                        <span>
                            {isGoalReached
                                ? tickerSettings.copy.goalReachedSecondary
                                : tickerSettings.copy.countLabel}
                        </span>
                    </div>
                </div>

                <div css={goalContainerStyles}>
                    <div css={countLabelStyles}>
                        {currencySymbol}
                        {isGoalReached ? runningTotal.toLocaleString() : goal.toLocaleString()}{' '}
                        <span>{isGoalReached ? tickerSettings.copy.countLabel : 'goal'}</span>
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

export default MomentTemplateBannerTicker;
