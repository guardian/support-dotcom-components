import { fetchSupportFrontendData } from './utils/supportFrontend';
import { Prices } from '@sdc/shared/types';
import { logError } from './utils/logging';
import { buildReloader, ValueReloader } from './utils/valueReloader';

const getProductPrices = (): Promise<Prices | undefined> =>
    fetchSupportFrontendData('prices')
        .then(JSON.parse)
        .catch((error) => {
            logError(`Failed to fetch prices data: ${error.message}`);
            return undefined;
        });

const buildProductPricesReloader = (): Promise<ValueReloader<Prices | undefined>> =>
    buildReloader(getProductPrices, 60);

export { buildProductPricesReloader };
