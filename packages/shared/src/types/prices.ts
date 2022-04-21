import { CountryGroupId } from '../lib';

interface ProductPriceData {
    Monthly: {
        price: string;
    };
    Annual: {
        price: string;
    };
}
interface CountryGroupPriceData {
    GuardianWeekly: ProductPriceData;
    Digisub: ProductPriceData;
}
export type Prices = {
    [country in CountryGroupId]: CountryGroupPriceData;
};
