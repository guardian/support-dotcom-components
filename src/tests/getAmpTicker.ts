import fetch from 'node-fetch';
import { TickerSettings } from '../lib/variants';

interface TickerData {
    total: number;
    goal: number;
}

type TickerCountType = 'money' | 'people';

export interface AMPTicker {
    percentage: string;
    goalReached: boolean;
    topLeft: string;
    bottomLeft: string;
    topRight: string;
    bottomRight: string;
}

const parse = (json: any): Promise<TickerData> => {
    const total = parseInt(json.total, 10);
    const goal = parseInt(json.goal, 10);

    if (!Number.isNaN(total) && !Number.isNaN(goal)) {
        return Promise.resolve({
            total,
            goal,
        });
    }
    return Promise.reject(Error(`Failed to parse ticker data: ${json}`));
};

const tickerDataUrl = (countType: TickerCountType): string => {
    return countType === 'people'
        ? 'https://support.theguardian.com/supporters-ticker.json'
        : 'https://support.theguardian.com/ticker.json';
};

const fetchTickerData = async (url: string): Promise<TickerData> => {
    return await fetch(url)
        .then(response => response.json())
        .then(parse);
};

export const getAmpTicker = (tickerSettings: TickerSettings): Promise<AMPTicker> =>
    fetchTickerData(tickerDataUrl(tickerSettings.countType)).then(data => {
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
