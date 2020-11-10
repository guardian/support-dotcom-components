import fetch from 'node-fetch';

interface TickerData {
    total: number;
    goal: number;
}

type TickerCountType = 'money' | 'people';

export interface AMPTicker {
    percentage: string;
    goalAmountFigure: string;
    goalAmountCaption: string;
    currentAmountFigure: string;
    currentAmountCaption: string;
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

export const ampTicker = async (
    type: TickerCountType,
    goalCaption: string,
    totalCaption: string,
    currencySymbol?: string,
): Promise<AMPTicker> => {
    return await fetchTickerData(tickerDataUrl(type)).then(data => {
        const percentage = (data.total / data.goal) * 100;
        const prefix = type === 'money' && currencySymbol ? currencySymbol : '';

        return {
            percentage: (percentage > 100 ? 100 : percentage).toString(),
            goalAmountCaption: goalCaption,
            goalAmountFigure: `${prefix}${data.goal.toLocaleString()}`,
            currentAmountCaption: totalCaption,
            currentAmountFigure: `${prefix}${data.total.toLocaleString()}`,
        };
    });
};
