import React from 'react';
import { css } from '@emotion/react';
import { textSans, space } from '@guardian/source-foundations';
import { TickerCountType, TickerSettings } from '@sdc/shared/types';
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

type TickerLabelProps = {
    total: number;
    goal: number;
    countType: TickerCountType;
    currencySymbol: string;
};

export function DesignableBannerTicker(props: DesignableBannerTickerProps): React.JSX.Element {
    function progressBarTranslation(total: number, end: number) {
        const percentage = (total / end) * 100 - 100;
        return percentage > 0 ? 0 : percentage;
    }

    function TickerLabel(props: TickerLabelProps, style: TickerStylingSettings) {
        if (props.countType === TickerCountType.people) {
            return (
                <div css={styles.tickerLabelContainer}>
                    <p css={styles.tickerLabel}>
                        <span css={styles.tickerLabelTotal(style.textColour)}>
                            {props.total.toLocaleString()} supporters
                        </span>{' '}
                        of {props.goal.toLocaleString()} goal
                    </p>
                </div>
            );
        }

        const currencySymbol = props.countType === 'money' ? props.currencySymbol : '';
        return (
            <div css={styles.tickerLabelContainer}>
                <p css={styles.tickerLabel}>
                    <span css={styles.tickerLabelTotal(style.textColour)}>
                        {currencySymbol}
                        {props.total.toLocaleString()}
                    </span>{' '}
                    of {currencySymbol}
                    {props.goal.toLocaleString()} goal
                </p>
            </div>
        );
    }
    const progressBarTransform = `translate3d(${progressBarTranslation(
        props.tickerSettings.tickerData.total,
        props.tickerSettings.tickerData.goal,
    )}%, 0, 0)`;

    return (
        <div>
            {props.tickerSettings.tickerData.total >= props.tickerSettings.tickerData.goal ? (
                <h2 css={styles.tickerHeadline}>
                    We&rsquo;ve met our goal but you can still contribute
                </h2>
            ) : (
                <h2 css={styles.tickerHeadline}>{props.tickerSettings.tickerData.total}</h2>
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
            <TickerLabel
                countType={props.tickerSettings.countType}
                total={props.tickerSettings.tickerData.total}
                goal={props.tickerSettings.tickerData.goal}
                currencySymbol={props.tickerSettings.currencySymbol}
            />
        </div>
    );
}
