import { TickerData, TickerSettings } from '@sdc/shared/types';
import { Response } from 'node-fetch';
import fetch from 'node-fetch';
import { buildReloader, ValueProvider } from '../utils/valueReloader';
import { logError } from '../utils/logging';
import { TickerName } from '@sdc/shared/dist/types';

const tickerUrl = (name: TickerName): string =>
    `https://support.theguardian.com/ticker/${name}.json`;

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

const getTickerDataForTickerTypeFetcher = (name: TickerName) => (): Promise<TickerData> => {
    return fetch(tickerUrl(name), {
        timeout: 1000 * 20,
    })
        .then(response => checkForErrors(response))
        .then(response => response.json())
        .then(parse)
        .catch(error => {
            logError(`Error fetching ticker data: ${error}`);
            return Promise.reject(error);
        });
};

// Maps each ticker campaign name to a ValueProvider
type TickerDataProviders = {
    [name in TickerName]: ValueProvider<TickerData>;
};

export class TickerDataProvider {
    providers: TickerDataProviders;

    constructor(providers: TickerDataProviders) {
        this.providers = providers;
    }

    getTickerData(name: TickerName): TickerData | undefined {
        const provider = this.providers[name];
        if (provider) {
            return provider.get();
        }
    }

    addTickerDataToSettings(tickerSettings: TickerSettings): TickerSettings | undefined {
        const tickerData = this.getTickerData(tickerSettings.name);
        if (tickerData) {
            return {
                ...tickerSettings,
                tickerData,
            };
        }
    }
}

export const buildTickerDataReloader = async (): Promise<TickerDataProvider> => {
    const reloaders: TickerDataProviders = await Promise.all([
        buildReloader(getTickerDataForTickerTypeFetcher('US_2022'), 60),
        buildReloader(getTickerDataForTickerTypeFetcher('AU_2022'), 60),
    ]).then(([US_2022, AU_2022]) => ({
        US_2022,
        AU_2022,
    }));
    return new TickerDataProvider(reloaders);
};
