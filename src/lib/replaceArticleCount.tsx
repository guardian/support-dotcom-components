import React from 'react';
import {
    ArticleCountOptOutPopup,
    OphanTracking,
} from '../components/modules/shared/ArticleCountOptOutPopup';
import { ArticleCountOptOutType } from '../components/modules/shared/ArticleCountOptOutPopup';

export const replaceArticleCount = (
    text: string,
    numArticles: number,
    articleCountOptOutType: ArticleCountOptOutType,
    tracking?: OphanTracking,
): Array<JSX.Element> => {
    const nextWords: Array<string | null> = [];
    const subbedText = text.replace(/%%ARTICLE_COUNT%%( \w+)?/g, (_, nextWord) => {
        nextWords.push(nextWord);
        return '%%ARTICLE_COUNT_AND_NEXT_WORD%%';
    });

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
    elements.push(<span dangerouslySetInnerHTML={{ __html: parts[parts.length - 1] as string }} />);

    return elements;
};
