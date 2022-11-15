import { TickerData, TickerSettings } from '@sdc/shared/types';
import { Response } from 'node-fetch';
import fetch from 'node-fetch';
import { buildReloader, ValueProvider } from '../utils/valueReloader';

const tickerUrl = 'https://support.theguardian.com/ticker.json';

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

const getTickerDataForTickerTypeFetcher = () => {
    return fetch(tickerUrl, {
        timeout: 1000 * 20,
    })
        .then(response => checkForErrors(response))
        .then(response => response.json())
        .then(parse);
};

export class TickerDataProvider {
    provider: ValueProvider<TickerData>;

    constructor(providers: ValueProvider<TickerData>) {
        this.provider = providers;
    }

    getTickerData(): TickerData {
        return this.provider.get();
    }

    addTickerDataToSettings(tickerSettings: TickerSettings): TickerSettings {
        return {
            ...tickerSettings,
            tickerData: this.getTickerData(),
        };
    }
}

export const buildTickerDataReloader = async (): Promise<TickerDataProvider> => {
    const reloader = await buildReloader(getTickerDataForTickerTypeFetcher, 60);
    return new TickerDataProvider(reloader);
};
