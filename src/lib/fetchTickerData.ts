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
    const total = json.total;
    const goal = json.goal;

    if (!Number.isNaN(parseInt(total)) && !Number.isNaN(parseInt(goal))) {
        return Promise.resolve({
            total,
            goal,
        });
    } else {
        return Promise.reject(`Failed to parse ticker data: ${json}`);
    }
};

const fetchTickerData = (tickerSettings: TickerSettings): Promise<TickerData> =>
    fetch(tickerUrl(tickerSettings.countType))
        .then(response => checkForErrors(response))
        .then(response => response.json())
        .then(parse);

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
