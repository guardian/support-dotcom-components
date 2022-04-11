import { getCountryName, getLocalCurrencySymbol, countryCodeToCountryGroupId } from './geolocation';
import { Prices } from '../types/prices';

// TODO: determine if we want to carry default pricing in the code
// - if yes, then there may be a more obvious place to define this data structure
// - if no, then may be useful to keep this here as it will tell us that something has gone wrong with the prices retrieval code or cache
const defaultPrices = {
    GuardianWeekly: {
        Monthly: {
            price: 'GW_default-monthly-price',
        },
        Annual: {
            price: 'GW_default-annual-price',
        },
    },
    Digisub: {
        Monthly: {
            price: 'Digisub_default-monthly-price',
        },
        Annual: {
            price: 'Digisub_default-annual-price',
        },
    },
    Paper: {
        Monthly: {
            price: 'Paper_default-monthly-price',
        },
        Annual: {
            price: 'Paper_default-annual-price',
        },
    },
};

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

    // Pricing

    // TODO: is it better to get the pricing object passed here as part of the function args?
    // - Alternatively, can we retrieve the cached object as part of the code here?
    const countryGroupId = countryCodeToCountryGroupId(countryCode);
    const localPrices = prices && prices[countryGroupId] ? prices[countryGroupId] : defaultPrices;

    const { GuardianWeekly, Digisub, Paper } = localPrices;

    content = content.replace(
        /%%PRICE_DIGISUB_MONTHLY%%/g,
        `${localCurrencySymbol}${GuardianWeekly.Monthly.price ||
            defaultPrices.GuardianWeekly.Monthly.price}`,
    );
    content = content.replace(
        /%%PRICE_DIGISUB_ANNUAL%%/g,
        `${localCurrencySymbol}${GuardianWeekly.Annual.price ||
            defaultPrices.GuardianWeekly.Annual.price}`,
    );
    content = content.replace(
        /%%PRICE_GUARDIANWEEKLY_MONTHLY%%/g,
        `${localCurrencySymbol}${Digisub.Monthly.price || defaultPrices.Digisub.Monthly.price}`,
    );
    content = content.replace(
        /%%PRICE_GUARDIANWEEKLY_ANNUAL%%/g,
        `${localCurrencySymbol}${Digisub.Annual.price || defaultPrices.Digisub.Annual.price}`,
    );
    content = content.replace(
        /%%PRICE_PAPER_MONTHLY%%/g,
        `${localCurrencySymbol}${Paper.Monthly.price || defaultPrices.Paper.Monthly.price}`,
    );
    content = content.replace(
        /%%PRICE_PAPER_ANNUAL%%/g,
        `${localCurrencySymbol}${Paper.Annual.price || defaultPrices.Paper.Annual.price}`,
    );

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
