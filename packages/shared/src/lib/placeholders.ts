import { getCountryName, getLocalCurrencySymbol, countryCodeToCountryGroupId } from './geolocation';
import { GuardianProduct, Prices, RatePlan } from '../types/prices';

interface PlaceholderRule {
    placeholder: string; // e.g. 'COUNTRY_NAME'
    substitute: () => string | undefined; // defines how to substitute the placeholder, if possible
}
const buildRule = (placeholder: string, substitute: () => string | undefined): PlaceholderRule => ({
    placeholder,
    substitute,
});

const buildRules = (countryCode?: string, prices?: Prices): PlaceholderRule[] => {
    const localCurrencySymbol = getLocalCurrencySymbol(countryCode);
    const countryGroupId = countryCodeToCountryGroupId(countryCode);
    const localPrices = prices && prices[countryGroupId] ? prices[countryGroupId] : null;

    const priceSubstitution = (product: GuardianProduct, ratePlan: RatePlan) => {
        if (localPrices) {
            return `${localCurrencySymbol}${localPrices[product][ratePlan].price}`;
        }
        return undefined;
    };

    return [
        buildRule('CURRENCY_SYMBOL', () => localCurrencySymbol),
        buildRule('COUNTRY_NAME', () => getCountryName(countryCode)),
        buildRule('PRICE_DIGISUB_MONTHLY', () => priceSubstitution('Digisub', 'Monthly')),
        buildRule('PRICE_DIGISUB_ANNUAL', () => priceSubstitution('Digisub', 'Annual')),
        buildRule('PRICE_GUARDIANWEEKLY_MONTHLY', () =>
            priceSubstitution('GuardianWeekly', 'Monthly'),
        ),
        buildRule('PRICE_GUARDIANWEEKLY_ANNUAL', () =>
            priceSubstitution('GuardianWeekly', 'Annual'),
        ),
    ];
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
        const rule = rules.find(rule => `%%${rule.placeholder}%%` === placeholder);
        if (rule) {
            const result: string | undefined = rule.substitute();
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
