import { cacheAsync } from './lib/cache';
import { fetchSupportFrontendData } from './utils/supportFrontend';
import { Prices } from '@sdc/shared/types';

const getProductPrices = (): Promise<Prices> => fetchSupportFrontendData('prices').then(JSON.parse);

const cachedProductPrices = cacheAsync<Prices>(getProductPrices, {
    ttlSec: 60,
    warm: true,
});

export { cachedProductPrices };
