import type { IsoCurrency } from '../shared/lib';
import { isProd } from './lib/env';
import { logError } from './utils/logging';
import type { ValueReloader } from './utils/valueReloader';
import { buildReloader } from './utils/valueReloader';

type RatePlan = 'Monthly' | 'Annual';

interface ProductRatePlan {
    pricing: Record<IsoCurrency, number>;
}

interface Product {
    ratePlans: Record<RatePlan, ProductRatePlan>;
}

type ProductName = 'Contribution' | 'SupporterPlus';

export type ProductCatalog = Record<ProductName, Product>;

const fetchProductCatalog = (): Promise<ProductCatalog> => {
    const domain = isProd ? 'https://product-catalog.guardianapis.com' : 'https://product-catalog.code.dev-guardianapis.com'
    return fetch(`${domain}/product-catalog.json`)
        .then(response => response.json())
        .then(data => data as ProductCatalog)
        .catch((error: Error) => {
            logError(`Failed to fetch product catalog: ${error.message}`);
            return Promise.reject(error);
        });
}

const buildProductCatalogReloader = (): Promise<ValueReloader<ProductCatalog>> =>
    buildReloader(fetchProductCatalog, 60);

export { buildProductCatalogReloader };
