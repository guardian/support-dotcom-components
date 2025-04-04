import type { CountryGroupId } from '../lib';

export type RatePlan = 'Monthly' | 'Annual';
type ProductPriceData = Record<
    RatePlan,
    {
        price: string;
    }
>;
export type GuardianProduct = 'GuardianWeekly' | 'Digisub';
type CountryGroupPriceData = Record<GuardianProduct, ProductPriceData>;
export type Prices = Record<CountryGroupId, CountryGroupPriceData>;
