import { TickerCountType, TickerData, TickerSettings, Variant } from './variants';
import fetch from 'node-fetch';
import { Response } from 'node-fetch';

const tickerUrl = (countType: TickerCountType): string =>
    countType === TickerCountType.people
        ? 'https://support.theguardian.com/supporters-ticker.json'
        : 'https://support.theguardian.com/ticker.json';

const checkForErrors = (response: Response): Promise<Response> => {
    if (!response.ok) {
        return Promise.reject(
            response.statusText || `Ticker api call returned HTTP status ${response.status}`,
        );
    }
    return Promise.resolve(response);
};

const parse = (json: any): Promise<TickerData> => {
    const total = parseInt(json.total);
    const goal = parseInt(json.goal);

    if (!Number.isNaN(total) && !Number.isNaN(goal)) {
        return Promise.resolve({
            total,
            goal,
        });
    } else {
        return Promise.reject(`Failed to parse ticker data: ${json}`);
    }
};

export const fetchTickerData = (tickerSettings: TickerSettings): Promise<TickerData> =>
    fetch(tickerUrl(tickerSettings.countType))
        .then(response => checkForErrors(response))
        .then(response => response.json())
        .then(parse);

export const addTickerData = (tickerSettings: TickerSettings): Promise<TickerSettings> =>
    fetchTickerData(tickerSettings).then(tickerData => ({
        ...tickerSettings,
        tickerData: tickerData
    }));

export const addTickerDataToVariant = (variant: Variant): Promise<Variant> => {
    if (variant.tickerSettings) {
        const tickerSettings = variant.tickerSettings;

        return fetchTickerData(tickerSettings).then((tickerData: TickerData) => ({
            ...variant,
            tickerSettings: {
                ...tickerSettings,
                tickerData,
            },
        }));
    } else {
        return Promise.resolve(variant);
    }
};
