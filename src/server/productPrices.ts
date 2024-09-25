import { fetchSupportFrontendData } from './utils/supportFrontend';
import { logError } from './utils/logging';
import { buildReloader, ValueReloader } from './utils/valueReloader';
import {Prices} from "../shared/types";

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
