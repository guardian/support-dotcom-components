import { cacheAsync } from './lib/cache';
import { fetchSupportFrontendData } from './utils/supportFrontend';
import { Prices } from '@sdc/shared/types';
import { logError } from './utils/logging';

const getProductPrices = (): Promise<Prices | undefined> =>
    fetchSupportFrontendData('prices')
        .then(JSON.parse)
        .catch(error => {
            logError(`Failed to fetch prices data: ${error.message}`);
            return undefined;
        });

const cachedProductPrices = cacheAsync<Prices | undefined>(getProductPrices, {
    ttlSec: 60,
    warm: true,
});

export { cachedProductPrices };
