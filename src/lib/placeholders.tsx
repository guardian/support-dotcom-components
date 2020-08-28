import { getCountryName, getLocalCurrencySymbol } from './geolocation';
import { ArticleCountOptOut } from '../components/modules/epics/ArticleCountOptOut';
import React from 'react';

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

// Nb. don't attempt to use lookbehind (?<!) here, as IE 11 will break alas
const PLACEHOLDER_RE = /%%.*?%%/;
export const containsNonArticleCountPlaceholder = (text: string): boolean => {
    const matches = text.match(PLACEHOLDER_RE)?.filter(str => str !== '%%ARTICLE_COUNT%%');
    return !!matches && matches.length > 0;
};

export const replaceArticleCount = (text: string, numArticles: number): Array<JSX.Element> => {
    const nextWords: Array<string | null> = [];
    const subbedText = text.replace(/%%ARTICLE_COUNT%%( \w+)?/g, (_, nextWord) => {
        nextWords.push(nextWord);
        return '%%ARTICLE_COUNT_AND_NEXT_WORD%%';
    });

    const parts = subbedText.split(/%%ARTICLE_COUNT_AND_NEXT_WORD%%/);
    const elements = [];
    for (let i = 0; i < parts.length - 1; i += 1) {
        elements.push(<span dangerouslySetInnerHTML={{ __html: parts[i] }} />);
        elements.push(<ArticleCountOptOut numArticles={numArticles} nextWord={nextWords[i]} />);
    }
    elements.push(<span dangerouslySetInnerHTML={{ __html: parts[parts.length - 1] }} />);

    return elements;
};
