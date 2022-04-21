import { getCountryName, getLocalCurrencySymbol, countryCodeToCountryGroupId } from './geolocation';
import { Prices } from '../types/prices';

// we have to treat %%ARTICLE_COUNT%% placeholders specially as they are replaced
// with react components, not a simple text substitution
export const replaceNonArticleCountPlaceholders = (
    content: string | undefined,
    countryCode?: string,
    prices?: Prices,
): string => {
    if (!content) {
        return '';
    }

    const localCurrencySymbol = getLocalCurrencySymbol(countryCode);

    content = content.replace(/%%CURRENCY_SYMBOL%%/g, localCurrencySymbol);

    const countryName = getCountryName(countryCode) ?? '';
    content = countryName ? content.replace(/%%COUNTRY_NAME%%/g, countryName) : content;

    // Pricing templates
    const countryGroupId = countryCodeToCountryGroupId(countryCode);
    const localPrices = prices && prices[countryGroupId] ? prices[countryGroupId] : null;

    if (localPrices != null) {
        const { GuardianWeekly, Digisub } = localPrices;

        content = content.replace(
            /%%PRICE_DIGISUB_MONTHLY%%/g,
            `${localCurrencySymbol}${Digisub.Monthly.price}`,
        );
        content = content.replace(
            /%%PRICE_DIGISUB_ANNUAL%%/g,
            `${localCurrencySymbol}${Digisub.Annual.price}`,
        );
        content = content.replace(
            /%%PRICE_GUARDIANWEEKLY_MONTHLY%%/g,
            `${localCurrencySymbol}${GuardianWeekly.Monthly.price}`,
        );
        content = content.replace(
            /%%PRICE_GUARDIANWEEKLY_ANNUAL%%/g,
            `${localCurrencySymbol}${GuardianWeekly.Annual.price}`,
        );
    }
    return content;
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
