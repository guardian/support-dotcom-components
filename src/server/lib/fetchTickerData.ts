import type { Stage, TickerData, TickerName, TickerSettings } from '../../shared/types';
import { logError } from '../utils/logging';
import type { ValueProvider } from '../utils/valueReloader';
import { buildReloader } from '../utils/valueReloader';

const tickerUrl = (stage: Stage, name: TickerName): string => {
    switch (stage) {
        case 'PROD':
            return `https://support.theguardian.com/ticker/${name}.json`;
        case 'CODE':
        case 'DEV':
            return `https://support.code.dev-theguardian.com/ticker/${name}.json`;
    }
};

const checkForErrors = (response: Response): Promise<Response> => {
    if (!response.ok) {
        const error = new Error(
            response.statusText || `Ticker api call returned HTTP status ${response.status}`,
        );
        return Promise.reject(error);
    }
    return Promise.resolve(response);
};

const parse = (json: { total: string; goal: string }): Promise<TickerData> => {
    const total = parseInt(json.total);
    const goal = parseInt(json.goal);

    if (!Number.isNaN(total) && !Number.isNaN(goal)) {
        return Promise.resolve({
            total,
            goal,
        });
    } else {
        const error = new Error(`Failed to parse ticker data: ${JSON.stringify(json)}`);
        return Promise.reject(error);
    }
};

const getTickerDataForTickerTypeFetcher =
    (stage: Stage, name: TickerName) => (): Promise<TickerData> => {
        return fetch(tickerUrl(stage, name))
            .then((response) => checkForErrors(response))
            .then((response) => response.json())
            .then(parse)
            .catch((error) => {
                const errorObj = error instanceof Error ? error : new Error(String(error));
                logError(`Error fetching ${name} ticker data: ${errorObj.message}`);
                return Promise.reject(errorObj);
            });
    };

// Maps each ticker campaign name to a ValueProvider
type TickerDataProviders = Record<TickerName, ValueProvider<TickerData>>;

export class TickerDataProvider {
    providers: TickerDataProviders;

    constructor(providers: TickerDataProviders) {
        this.providers = providers;
    }

    getTickerData(name: TickerName): TickerData | undefined {
        const provider = this.providers[name];
        if ('get' in provider) {
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

export const buildTickerDataReloader = async (stage: Stage): Promise<TickerDataProvider> => {
    const reloaders: TickerDataProviders = await Promise.all([
        buildReloader(getTickerDataForTickerTypeFetcher(stage, 'US'), 60),
        buildReloader(getTickerDataForTickerTypeFetcher(stage, 'AU'), 60),
        buildReloader(getTickerDataForTickerTypeFetcher(stage, 'global'), 60),
    ]).then(([US, AU, global]) => ({
        US,
        AU,
        global,
    }));
    return new TickerDataProvider(reloaders);
};
