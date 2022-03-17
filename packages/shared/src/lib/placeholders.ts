import { getCountryName, getLocalCurrencySymbol } from './geolocation';

// we have to treat %%ARTICLE_COUNT%% placeholders specially as they are replaced
// with react components, not a simple text substitution
export const replaceNonArticleCountPlaceholders = (
    content: string | undefined,
    countryCode?: string,
    digisubPrice?: string,
): string => {
    if (!content) {
        return '';
    }

    const localCurrencySymbol = getLocalCurrencySymbol(countryCode);

    content = content.replace(/%%CURRENCY_SYMBOL%%/g, localCurrencySymbol);

    const countryName = getCountryName(countryCode) ?? '';
    content = countryName ? content.replace(/%%COUNTRY_NAME%%/g, countryName) : content;

    content = content.replace(/%%DIGI_SUB_PRICE%%/g, `${localCurrencySymbol}${digisubPrice}`);

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
