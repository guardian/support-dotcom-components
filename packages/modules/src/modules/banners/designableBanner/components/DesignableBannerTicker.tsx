import React from 'react';
import { TickerCountType, TickerEndType } from '@sdc/shared/dist/types/props/shared';
import {
    tickerHeadline,
    tickerLabel,
    tickerLabelContainer,
    tickerLabelTotal,
    tickerProgressBar,
    tickerProgressBarBackground,
    tickerProgressBarFill,
} from './ticker/tickerStyles';

export type TickerProps = {
    total: number;
    goal: number;
    end: number;
    countType: TickerCountType;
    endType: TickerEndType;
    headline: string;
};

type TickerLabelProps = {
    total: number;
    goal: number;
    countType: TickerCountType;
};

function progressBarTranslation(total: number, end: number) {
    const percentage = (total / end) * 100 - 100;
    return percentage > 0 ? 0 : percentage;
}

function TickerLabel(props: TickerLabelProps) {
    if (props.countType === 'people') {
        return (
            <div css={tickerLabelContainer}>
                <p css={tickerLabel}>
                    <span css={tickerLabelTotal}> supporters</span> of goal
                </p>
            </div>
        );
    }

    return (
        <div css={tickerLabelContainer}>
            <p css={tickerLabel}>
                <span css={tickerLabelTotal}></span> of goal
            </p>
        </div>
    );
}

export function DesignableBannerTicker(props: TickerProps): JSX.Element {
    const progressBarTransform = `translate3d(${progressBarTranslation(
        props.total,
        props.end,
    )}%, 0, 0)`;

    return (
        <div>
            <h2 css={tickerHeadline}>{props.headline}</h2>
            <div css={tickerProgressBar}>
                <div css={tickerProgressBarBackground}>
                    <div
                        css={tickerProgressBarFill}
                        style={{
                            transform: progressBarTransform,
                        }}
                    />
                </div>
            </div>
            <TickerLabel countType={props.countType} total={props.total} goal={props.goal} />
        </div>
    );
}
