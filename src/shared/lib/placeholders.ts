import type { GuardianProduct, Prices, RatePlan } from '../types/prices';
import { countryCodeToCountryGroupId, getCountryName, getLocalCurrencySymbol } from './geolocation';

// Map each placeholder to a rule defining how to substitute it, if possible
type PlaceholderRule = (params: { countryCode?: string; prices?: Prices }) => string | undefined;
type PlaceholderRules = Record<string, PlaceholderRule | undefined>;

const priceSubstitution = (
    product: GuardianProduct,
    ratePlan: RatePlan,
    countryCode?: string,
    prices?: Prices,
): string | undefined => {
    if (prices) {
        const countryGroupId = countryCodeToCountryGroupId(countryCode);
        const localPrices = prices[countryGroupId];
        const localCurrencySymbol = getLocalCurrencySymbol(countryCode);
        return `${localCurrencySymbol}${localPrices[product][ratePlan].price}`;
    }
    return undefined;
};

export const getDayOfWeek = (date: Date = new Date()): string =>
    date.toLocaleString('en-GB', { weekday: 'long' });
export const getDate = (date: Date = new Date()): string =>
    date.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const placeholderRules: PlaceholderRules = {
    CURRENCY_SYMBOL: ({ countryCode }) => getLocalCurrencySymbol(countryCode),
    COUNTRY_NAME: ({ countryCode }) => getCountryName(countryCode),
    PRICE_DIGISUB_MONTHLY: ({ countryCode, prices }) =>
        priceSubstitution('Digisub', 'Monthly', countryCode, prices),
    PRICE_DIGISUB_ANNUAL: ({ countryCode, prices }) =>
        priceSubstitution('Digisub', 'Annual', countryCode, prices),
    PRICE_GUARDIANWEEKLY_MONTHLY: ({ countryCode, prices }) =>
        priceSubstitution('GuardianWeekly', 'Monthly', countryCode, prices),
    PRICE_GUARDIANWEEKLY_ANNUAL: ({ countryCode, prices }) =>
        priceSubstitution('GuardianWeekly', 'Annual', countryCode, prices),
    DAY_OF_THE_WEEK: () => getDayOfWeek(),
    DATE: () => getDate(),
};

/**
 * We have to treat %%ARTICLE_COUNT%% placeholders specially as they are replaced with react components, not a simple text substitution.
 *
 * This function does not guarantee all placeholders will be replaced. Calling code must handle this possibility.
 */
export const replaceNonArticleCountPlaceholders = (
    content: string | undefined,
    countryCode?: string,
    prices?: Prices,
): string => {
    if (!content) {
        return '';
    }

    return content.replace(PLACEHOLDER_RE, (placeholder) => {
        const trimmed = placeholder.substring(2, placeholder.length - 2); // remove %%
        const rule = placeholderRules[trimmed];
        if (rule) {
            const result: string | undefined = rule({ countryCode, prices });
            if (result) {
                return result;
            }
        }
        return placeholder; // if unable to substitute then leave it unchanged - the calling code must handle this
    });
};

// Nb. don't attempt to use lookbehind (?<!) here, as IE 11 will break alas
const PLACEHOLDER_RE = /%%.*?%%/g;
export const containsNonArticleCountPlaceholder = (text: string): boolean => {
    const matches = text.match(PLACEHOLDER_RE)?.filter((str) => str !== '%%ARTICLE_COUNT%%');
    return !!matches && matches.length > 0;
};

export const containsArticleCountPlaceholder = (text: string): boolean => {
    const matches = text.match(/%%ARTICLE_COUNT%%/g);
    return !!matches && matches.length > 0;
};
