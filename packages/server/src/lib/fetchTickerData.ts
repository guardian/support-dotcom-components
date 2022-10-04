import { TickerData, TickerSettings } from '@sdc/shared/types';
import { TickerCountType } from '@sdc/shared/types';
import { Response } from 'node-fetch';
import fetch from 'node-fetch';
import { buildReloader, ValueReloader } from '../utils/valueReloader';

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

// Contains a ValueReloader for each TickerCountType
export class TickerDataReloader {
    reloaders: Record<TickerCountType, ValueReloader<TickerData>>;

    constructor(reloaders: Record<TickerCountType, ValueReloader<TickerData>>) {
        this.reloaders = reloaders;
    }

    getTickerData(type: TickerCountType): TickerData {
        return this.reloaders[type].get();
    }

    addTickerDataToSettings(tickerSettings: TickerSettings): TickerSettings {
        return {
            ...tickerSettings,
            ...this.getTickerData(tickerSettings.countType),
        };
    }
}

export const buildTickerDataReloader = async (): Promise<TickerDataReloader> => {
    const [people, money] = await Promise.all([
        buildReloader(getTickerDataForTickerTypeFetcher(TickerCountType.people), 60),
        buildReloader(getTickerDataForTickerTypeFetcher(TickerCountType.money), 60),
    ]);
    const reloaders = {
        [TickerCountType.people]: people,
        [TickerCountType.money]: money,
    };
    return new TickerDataReloader(reloaders);
};
