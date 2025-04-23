import type { TickerData, TickerSettings } from '../../../shared/types';

export interface AMPTicker {
    percentage: string;
    goalExceededMarkerPercentage?: string;
    topLeft: string;
    bottomLeft: string;
    topRight: string;
    bottomRight: string;
}

export const ampTicker = (tickerSettings: TickerSettings, tickerData: TickerData): AMPTicker => {
    const prefix = tickerSettings.currencySymbol;
    const goalReached = tickerData.total >= tickerData.goal;
    const totalPlusFifteen = tickerData.total + tickerData.total * 0.15;
    const percentage =
        (tickerData.total / (goalReached ? totalPlusFifteen : tickerData.goal)) * 100;
    const goalExceededMarkerPercentage = goalReached
        ? ((tickerData.goal / totalPlusFifteen) * 100).toString()
        : undefined;

    const topLeft = goalReached
        ? tickerSettings.copy.goalReachedPrimary || `${prefix}${tickerData.total.toLocaleString()}`
        : `${prefix}${tickerData.total.toLocaleString()}`;

    const bottomLeft = goalReached
        ? tickerSettings.copy.goalReachedSecondary || tickerSettings.copy.countLabel
        : tickerSettings.copy.countLabel;

    const topRight = goalReached
        ? `${prefix}${tickerData.total.toLocaleString()}`
        : `${prefix}${tickerData.goal.toLocaleString()}`;

    const bottomRight = goalReached ? tickerSettings.copy.countLabel : 'our goal';

    return {
        percentage: percentage.toString(),
        goalExceededMarkerPercentage,
        topLeft,
        bottomLeft,
        topRight,
        bottomRight,
    };
};
