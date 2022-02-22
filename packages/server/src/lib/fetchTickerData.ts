import { EpicVariant, TickerData, TickerSettings } from '@sdc/shared/types';
import { TickerCountType } from '@sdc/shared/types';
import { Response } from 'node-fetch';
import fetch from 'node-fetch';
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

const getTickerDataForTickerTypeFetcher = (type: TickerCountType) => () => {
    return fetch(tickerUrl(type), {
        timeout: 1000 * 20,
    })
        .then(response => checkForErrors(response))
        .then(response => response.json())
        .then(parse);
};

const cachedTickerFetchers = {
    [TickerCountType.people]: cacheAsync(
        getTickerDataForTickerTypeFetcher(TickerCountType.people),
        {
            ttlSec: 60,
        },
    ),
    [TickerCountType.money]: cacheAsync(getTickerDataForTickerTypeFetcher(TickerCountType.money), {
        ttlSec: 60,
    }),
};

export const fetchTickerDataCached = async (
    tickerSettings: TickerSettings,
): Promise<TickerData> => {
    return cachedTickerFetchers[tickerSettings.countType]();
};

export const addTickerDataToSettings = (tickerSettings: TickerSettings): Promise<TickerSettings> =>
    fetchTickerDataCached(tickerSettings).then(tickerData => ({
        ...tickerSettings,
        tickerData: tickerData,
    }));

export const getTickerSettings = (variant: EpicVariant): Promise<TickerSettings | undefined> => {
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
