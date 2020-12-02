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
                                Trump’s presidency is ending, but America’s systemic challenges
                                remain. From broken healthcare to corrosive racial inequality, from
                                rapacious corporations to a climate crisis, the need for fact-based
                                reporting that highlights injustice and offers solutions is as great
                                as ever. You&apos;ve read{' '}
                                <ArticleCountOptOut
                                    numArticles={numArticles}
                                    nextWord=" articles"
                                    type="us-eoy-banner"
                                />{' '}
                                in the past year. We value your support and hope you’ll consider a
                                year-end gift.
                            </>
                        ) : (
                            // supporter + no article count
                            <>
                                Trump’s presidency is ending, but America’s systemic challenges
                                remain. From broken healthcare to corrosive racial inequality, from
                                rapacious corporations to a climate crisis, the need for fact-based
                                reporting that highlights injustice and offers solutions is as great
                                as ever. We value your support and hope you’ll consider a year-end
                                gift.
                            </>
                        )
                    ) : shouldShowArticleCount ? (
                        // non-supporter + article count
                        <>
                            Trump’s presidency is ending, but America’s systemic challenges remain.
                            From a broken healthcare system to corrosive racial inequality, from
                            rapacious corporations to a climate crisis, the need for robust,
                            fact-based reporting that highlights injustice and offers solutions is
                            as great as ever. You&apos;ve read{' '}
                            <ArticleCountOptOut
                                numArticles={numArticles}
                                nextWord=" articles"
                                type="us-eoy-banner"
                            />{' '}
                            in the past year. We hope you’ll consider a year-end gift.
                        </>
                    ) : (
                        // non-supporter + no article count
                        <>
                            Trump’s presidency is ending, but America’s systemic challenges remain.
                            From a broken healthcare system to corrosive racial inequality, from
                            rapacious corporations to a climate crisis, the need for robust,
                            fact-based reporting that highlights injustice and offers solutions is
                            as great as ever. We hope you’ll consider a year-end gift.
                        </>
                    )}
                </Hide>
            }
        />
    );
};

export default UsEoyAppealBody;
