import { getCountryName, getLocalCurrencySymbol } from './geolocation';

const expectedPlaceholders = ['%%CURRENCY_SYMBOL%%', '%%ARTICLE_COUNT%%', '%%COUNTRY_NAME%%'];

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

export const containsUnexpectedPlaceholder = (
    text: string,
    placeholders: string[] = expectedPlaceholders,
): boolean => {
    const matches = text.match(/%%.*%%/);

    if (!matches) {
        return false;
    }

    return matches.some(match => !placeholders.includes(match));
};
