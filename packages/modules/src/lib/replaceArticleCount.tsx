import React from 'react';
import { ArticleCountOptOutPopup, OphanTracking } from '../modules/shared/ArticleCountOptOutPopup';
import { ArticleCountOptOutType } from '../modules/shared/ArticleCountOptOutPopup';
import { ARTICLE_COUNT_TEMPLATE } from '@sdc/shared/dist/lib';

export const replaceArticleCountWithLink = (
    text: string,
    numArticles: number,
    articleCountOptOutType: ArticleCountOptOutType,
    tracking?: OphanTracking,
): Array<JSX.Element> => {
    const nextWords: Array<string | null> = [];
    const subbedText = text.replace(
        RegExp(`${ARTICLE_COUNT_TEMPLATE}( \w+)?`, 'g'),
        (_, nextWord) => {
            nextWords.push(nextWord);
            return '%%ARTICLE_COUNT_AND_NEXT_WORD%%';
        },
    );

    const parts = subbedText.split(/%%ARTICLE_COUNT_AND_NEXT_WORD%%/);
    const elements = [];
    for (let i = 0; i < parts.length - 1; i += 1) {
        elements.push(<span dangerouslySetInnerHTML={{ __html: parts[i] as string }} />);
        elements.push(
            <ArticleCountOptOutPopup
                numArticles={numArticles}
                nextWord={nextWords[i] as string}
                type={articleCountOptOutType}
                tracking={tracking}
            />,
        );
    }
    elements.push(
        <span
            dangerouslySetInnerHTML={{
                __html: parts[parts.length - 1] as string,
            }}
        />,
    );

    return elements;
};

export const replaceArticleCount = (
    text: string,
    numArticles: number,
    articleCountOptOutType: ArticleCountOptOutType,
    tracking?: OphanTracking,
    optOutLink: boolean = true,
): Array<JSX.Element> | JSX.Element => {
    if (optOutLink) {
        return replaceArticleCountWithLink(text, numArticles, articleCountOptOutType, tracking);
    }
    return (
        <span
            dangerouslySetInnerHTML={{
                __html: text.replace(RegExp(ARTICLE_COUNT_TEMPLATE), `${numArticles}`),
            }}
        />
    );
};
