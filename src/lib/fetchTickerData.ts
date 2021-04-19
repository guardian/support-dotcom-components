import { TickerCountType, TickerData, TickerSettings, Variant } from './variants';
import fetch, { Response } from 'node-fetch';
import { cacheAsync } from './cache';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const fetchTickerDataCached = async (
    tickerSettings: TickerSettings,
): Promise<TickerData> => {
    const fetchForType = (): Promise<TickerData> => {
        return fetch(tickerUrl(tickerSettings.countType), { timeout: 1000 * 20 })
            .then(response => checkForErrors(response))
            .then(response => response.json())
            .then(parse);
    };

    const [, cachedRes] = cacheAsync(
        fetchForType,
        60,
        `fetchTickerData_${tickerSettings.countType}`,
    );

    return cachedRes();
};

export const addTickerDataToSettings = (tickerSettings: TickerSettings): Promise<TickerSettings> =>
    fetchTickerDataCached(tickerSettings).then(tickerData => ({
        ...tickerSettings,
        tickerData: tickerData,
    }));

export const getTickerSettings = (variant: Variant): Promise<TickerSettings | undefined> => {
    if (variant.tickerSettings) {
        const tickerSettings = variant.tickerSettings;

        return fetchTickerDataCached(tickerSettings).then((tickerData: TickerData) => ({
            ...tickerSettings,
            tickerData,
        }));
    } else {
        return Promise.resolve(undefined);
    }
};
