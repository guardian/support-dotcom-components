import { getCountryName, getLocalCurrencySymbol } from './geolocation';

// we have to treat %%ARTICLE_COUNT%% placeholders specially as they are replaced
// with react components, not a simple text substitution
export const replaceNonArticleCountPlaceholders = (
    content: string | undefined,
    countryCode?: string,
): string => {
    if (!content) {
        return '';
    }

    content = content.replace(/%%CURRENCY_SYMBOL%%/g, getLocalCurrencySymbol(countryCode));

    const countryName = getCountryName(countryCode) ?? '';
    content = countryName ? content.replace(/%%COUNTRY_NAME%%/g, countryName) : content;

    return content;
};

// this regex matches %% that are neither preceeded by %%ARTICLE_COUNT or followed by
// ARTICLE_COUNT%%
const NON_ARTICLE_COUNT_PLACEHOLDER_REGEX = /(?<!%%ARTICLE_COUNT)%%(?!ARTICLE_COUNT%%)/;
export const containsNonArticleCountPlaceholder = (text: string): boolean =>
    NON_ARTICLE_COUNT_PLACEHOLDER_REGEX.test(text);
