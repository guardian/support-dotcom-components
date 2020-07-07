import { getCountryName, getLocalCurrencySymbol } from './geolocation';

export const replacePlaceholders = (
    content: string | undefined,
    numArticles: number,
    countryCode?: string,
): string => {
    if (!content) {
        return '';
    }

    content = content.replace(/%%CURRENCY_SYMBOL%%/g, getLocalCurrencySymbol(countryCode));
    content = content.replace(/%%ARTICLE_COUNT%%/g, numArticles.toString());

    const countryName = getCountryName(countryCode) ?? '';
    content = countryName ? content.replace(/%%COUNTRY_NAME%%/g, countryName) : content;

    return content;
};

export const containsPlaceholder = (text: string): boolean => text.includes('%%');
