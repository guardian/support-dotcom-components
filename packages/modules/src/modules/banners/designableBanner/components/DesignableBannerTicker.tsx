import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { textSans, space } from '@guardian/source-foundations';
import { TickerSettings } from '@sdc/shared/types';
import { templateSpacing } from '../styles/templateStyles';
import useTicker from '../../../../hooks/useTicker';
import { HasBeenSeen, useHasBeenSeen } from '../../../../hooks/useHasBeenSeen';
import { TickerStylingSettings } from '../../../shared/settings';

const styles = {
    tickerProgressBar: css`
        position: relative;
        height: ${space[3]}px;
    `,

    tickerProgressBarBackground: (colour: string) => css`
        width: calc(100%);
        height: ${space[3]}px;
        overflow: hidden;
        background-color: ${colour};
        position: absolute;
        border-radius: ${space[2]}px;
    `,

    progressBarTransform: (goal: number, total: number, runningTotal: number): string => {
        const haveStartedAnimating = runningTotal > 0;
        if (!haveStartedAnimating) {
            return 'translateX(-100%)';
        }
        const percentage = (total / goal) * 100 - 100;
        return `translate3d(${percentage >= 0 ? 0 : percentage}%, 0, 0)`;
    },

    tickerProgressBarFill: (
        colour: string,
        goal: number,
        total: number,
        runningTotal: number,
    ) => css`
        background-color: ${colour};
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: ${styles.progressBarTransform(goal, total, runningTotal)};
        transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
        border-radius: ${space[2]}px;
    `,

    tickerHeadline: () => css`
        ${textSans.medium({ fontWeight: 'bold' })}
        margin-bottom: ${space[2]}px;
    `,

    tickerLabelContainer: () => css`
        position: relative;
        display: flex;
        margin-top: ${space[1]}px;
    `,

    tickerLabel: () => css`
        ${textSans.medium()}
    `,

    tickerLabelTotal: (colour: string) => css`
        font-weight: 700;
        color: ${colour};
    `,
    containerStyles: () => css`
        position: relative;
        ${templateSpacing.bannerTicker}
    `,
};

export type DesignableBannerTickerProps = {
    tickerSettings: TickerSettings;
    stylingSettings: TickerStylingSettings;
};

export function DesignableBannerTicker(props: DesignableBannerTickerProps): React.JSX.Element {
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

    const currencySymbol =
        props.tickerSettings.countType === 'money' ? props.tickerSettings.currencySymbol : '';
    const isGoalReached =
        props.tickerSettings.tickerData.total >= props.tickerSettings.tickerData.goal;
    const runningTotal = useTicker(props.tickerSettings.tickerData.total, readyToAnimate);

    return (
        <div ref={setNode}>
            {isGoalReached ? (
                <h2 css={styles.tickerHeadline}>{props.tickerSettings.copy.goalReachedPrimary}</h2>
            ) : (
                <h2 css={styles.tickerHeadline}>{props.tickerSettings.copy.countLabel}</h2>
            )}
            <div css={styles.tickerProgressBar}>
                <div
                    css={styles.tickerProgressBarBackground(
                        props.stylingSettings.progressBarBackgroundColour,
                    )}
                >
                    <div
                        css={styles.tickerProgressBarFill(
                            props.stylingSettings.filledProgressColour,
                            props.tickerSettings.tickerData.goal,
                            props.tickerSettings.tickerData.total,
                            runningTotal,
                        )}
                    />
                </div>
            </div>
            {props.tickerSettings.countType === 'people' ? (
                <div css={styles.tickerLabelContainer}>
                    <p css={styles.tickerLabel}>
                        <span css={styles.tickerLabelTotal(props.stylingSettings.textColour)}>
                            {props.tickerSettings.tickerData.total.toLocaleString()} supporters
                        </span>{' '}
                        of {props.tickerSettings.tickerData.goal.toLocaleString()} goal
                    </p>
                </div>
            ) : (
                <div css={styles.tickerLabelContainer}>
                    <p css={styles.tickerLabel}>
                        <span css={styles.tickerLabelTotal(props.stylingSettings.textColour)}>
                            {currencySymbol}
                            {props.tickerSettings.tickerData.total.toLocaleString()}
                        </span>{' '}
                        of {currencySymbol}
                        {props.tickerSettings.tickerData.goal.toLocaleString()} goal
                    </p>
                </div>
            )}
        </div>
    );
}
