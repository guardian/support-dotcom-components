import React from 'react';
import { css } from '@emotion/react';
import { textSans, space } from '@guardian/source-foundations';
import { TickerSettings } from '@sdc/shared/types';
import { TickerStylingSettings } from '../settings';
import { templateSpacing } from '../styles/templateStyles';

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

    tickerProgressBarFill: (colour: string) => css`
        background-color: ${colour};
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateX(-100%);
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
    function progressBarTranslation(total: number, goal: number) {
        const percentage = (total / goal) * 100 - 100;
        return percentage > 0 ? 0 : percentage;
    }
    const progressBarTransform = `translate3d(${progressBarTranslation(
        props.tickerSettings.tickerData.total,
        props.tickerSettings.tickerData.goal,
    )}%, 0, 0)`;

    const currencySymbol =
        props.tickerSettings.countType === 'money' ? props.tickerSettings.currencySymbol : '';

    return (
        <div>
            {props.tickerSettings.tickerData.total >= props.tickerSettings.tickerData.goal ? (
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
                        )}
                        style={{
                            transform: progressBarTransform,
                        }}
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
