import type { Prices } from '../shared/types';
import { logError } from './utils/logging';
import { fetchSupportFrontendData } from './utils/supportFrontend';
import type { ValueReloader } from './utils/valueReloader';
import { buildReloader } from './utils/valueReloader';

const getProductPrices = (): Promise<Prices | undefined> =>
    fetchSupportFrontendData('prices')
        .then(JSON.parse)
        .catch((error) => {
            if (error instanceof Error) {
                logError(`Failed to fetch prices data: ${error.message}`);
            } else {
                logError(`Failed to fetch prices data: ${String(error)}`);
            }
            return undefined;
        });

const buildProductPricesReloader = (): Promise<ValueReloader<Prices | undefined>> =>
    buildReloader(getProductPrices, 60);

export { buildProductPricesReloader };
