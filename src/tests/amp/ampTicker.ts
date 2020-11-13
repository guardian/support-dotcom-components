import { TickerSettings } from '../../lib/variants';
import { fetchTickerDataCached } from '../../lib/fetchTickerData';

export interface AMPTicker {
    percentage: string;
    goalReached: boolean;
    topLeft: string;
    bottomLeft: string;
    topRight: string;
    bottomRight: string;
}

export const ampTicker = (tickerSettings: TickerSettings): Promise<AMPTicker> =>
    fetchTickerDataCached(tickerSettings).then(data => {
        const percentage = (data.total / data.goal) * 100;
        const prefix = tickerSettings.countType === 'money' ? tickerSettings.currencySymbol : '';
        const goalReached = percentage >= 100;

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
            percentage: (percentage > 100 ? 100 : percentage).toString(),
            goalReached,
            topLeft,
            bottomLeft,
            topRight,
            bottomRight,
        };
    });
