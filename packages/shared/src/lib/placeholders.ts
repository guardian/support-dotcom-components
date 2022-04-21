import { getCountryName, getLocalCurrencySymbol, countryCodeToCountryGroupId } from './geolocation';
import { GuardianProduct, Prices, RatePlan } from '../types/prices';

// Maps each placeholder to a rule for how to substitute it, if possible
type PlaceholderRules = {
    [placeholder in string]: () => string | undefined;
};

const buildRules = (countryCode?: string, prices?: Prices): PlaceholderRules => {
    const localCurrencySymbol = getLocalCurrencySymbol(countryCode);
    const countryGroupId = countryCodeToCountryGroupId(countryCode);
    const localPrices = prices && prices[countryGroupId] ? prices[countryGroupId] : null;

    const priceSubstitution = (product: GuardianProduct, ratePlan: RatePlan) => {
        if (localPrices) {
            return `${localCurrencySymbol}${localPrices[product][ratePlan].price}`;
        }
        return undefined;
    };

    return {
        CURRENCY_SYMBOL: () => localCurrencySymbol,
        COUNTRY_NAME: () => getCountryName(countryCode),
        PRICE_DIGISUB_MONTHLY: () => priceSubstitution('Digisub', 'Monthly'),
        PRICE_DIGISUB_ANNUAL: () => priceSubstitution('Digisub', 'Annual'),
        PRICE_GUARDIANWEEKLY_MONTHLY: () => priceSubstitution('GuardianWeekly', 'Monthly'),
        PRICE_GUARDIANWEEKLY_ANNUAL: () => priceSubstitution('GuardianWeekly', 'Annual'),
    };
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

    const rules = buildRules(countryCode, prices);

    return content.replace(PLACEHOLDER_RE, placeholder => {
        const trimmed = placeholder.substring(2, placeholder.length - 2); // remove %%
        const rule = rules[trimmed];
        if (rule) {
            const result: string | undefined = rule();
            if (result) {
                return result;
            }
        }
        return placeholder; // leave it unchanged - the calling code must handle this
    });
};

// Nb. don't attempt to use lookbehind (?<!) here, as IE 11 will break alas
const PLACEHOLDER_RE = /%%.*?%%/g;
export const containsNonArticleCountPlaceholder = (text: string): boolean => {
    const matches = text.match(PLACEHOLDER_RE)?.filter(str => str !== '%%ARTICLE_COUNT%%');
    return !!matches && matches.length > 0;
};

export const containsArticleCountPlaceholder = (text: string): boolean => {
    const matches = text.match(/%%ARTICLE_COUNT%%/g);
    return !!matches && matches.length > 0;
};
