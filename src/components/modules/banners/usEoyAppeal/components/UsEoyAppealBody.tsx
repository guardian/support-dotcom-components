import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateBody from '../../contributionsTemplate/ContributionsTemplateBody';
import { ArticleCountOptOut } from '../../../shared/ArticleCountOptOut';

interface UsEoyAppealBodyProps {
    isSupporter: boolean;
    numArticles: number;
    hasOptedOutOfArticleCount: boolean;
}

const MIN_NUM_ARTICLES_TO_SHOW_ARTICLE_COUNT = 5;

const UsEoyAppealBody: React.FC<UsEoyAppealBodyProps> = ({
    isSupporter,
    hasOptedOutOfArticleCount,
    numArticles,
}: UsEoyAppealBodyProps) => {
    const shouldShowArticleCount =
        !hasOptedOutOfArticleCount && numArticles > MIN_NUM_ARTICLES_TO_SHOW_ARTICLE_COUNT;

    return (
        <ContributionsTemplateBody
            copy={
                <Hide below="tablet">
                    {isSupporter ? (
                        shouldShowArticleCount ? (
                            // supporter + article count
                            <>
                                Decency, civility and truth can help heal divisions. Fact-based
                                journalism grounded in evidence can help unite the US. You&apos;ve
                                read{' '}
                                <ArticleCountOptOut
                                    numArticles={numArticles}
                                    nextWord=" articles"
                                    type="us-eoy-banner"
                                />{' '}
                                in the last year. We value your support and hope you’ll consider a
                                year-end gift.
                            </>
                        ) : (
                            // supporter + no article count
                            <>
                                Decency, civility and truth can help heal divisions. Fact-based
                                journalism grounded in evidence can help unite the US. We value your
                                support and hope you’ll consider a year-end gift.
                            </>
                        )
                    ) : shouldShowArticleCount ? (
                        // non-supporter + article count
                        <>
                            Decency, civility and truth can help heal divisions. Fact-based
                            journalism grounded in evidence can help unite the US. You&apos;ve read{' '}
                            <ArticleCountOptOut
                                numArticles={numArticles}
                                nextWord=" articles"
                                type="us-eoy-banner"
                            />{' '}
                            in the last year. We hope you’ll consider a year-end gift to support the
                            Guardian.
                        </>
                    ) : (
                        // non-supporter + no article count
                        <>
                            Decency, civility and truth can help heal divisions. Fact-based
                            journalism grounded in evidence can help unite the US. We hope you’ll
                            consider a year-end gift to support the Guardian.
                        </>
                    )}
                </Hide>
            }
        />
    );
};

export default UsEoyAppealBody;
