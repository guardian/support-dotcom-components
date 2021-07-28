import { fetchTickerDataCached } from '../../lib/fetchTickerData';
import { TickerSettings } from '@sdc/shared/types';

export interface AMPTicker {
    percentage: string;
    goalExceededMarkerPercentage?: string;
    topLeft: string;
    bottomLeft: string;
    topRight: string;
    bottomRight: string;
}

export const ampTicker = (tickerSettings: TickerSettings): Promise<AMPTicker> =>
    fetchTickerDataCached(tickerSettings).then(data => {
        const prefix = tickerSettings.countType === 'money' ? tickerSettings.currencySymbol : '';
        const goalReached = data.total >= data.goal;
        const totalPlusFifteen = data.total + data.total * 0.15;
        const percentage = (data.total / (goalReached ? totalPlusFifteen : data.goal)) * 100;
        const goalExceededMarkerPercentage = goalReached
            ? ((data.goal / totalPlusFifteen) * 100).toString()
            : undefined;

        const topLeft = goalReached
            ? tickerSettings.copy.goalReachedPrimary
            : `${prefix}${data.total.toLocaleString()}`;

        const bottomLeft = goalReached
            ? tickerSettings.copy.goalReachedSecondary
            : tickerSettings.copy.countLabel;

        const topRight = goalReached
            ? `${prefix}${data.total.toLocaleString()}`
            : `${prefix}${data.goal.toLocaleString()}`;

        const bottomRight = goalReached ? tickerSettings.copy.countLabel : 'our goal';

        return {
            percentage: percentage.toString(),
            goalExceededMarkerPercentage,
            topLeft,
            bottomLeft,
            topRight,
            bottomRight,
        };
    });
