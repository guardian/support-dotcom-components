import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateBody from '../../contributionsTemplate/ContributionsTemplateBody';
import { ArticleCountOptOut } from '../../../shared/ArticleCountOptOut';

interface UsEoyAppealBodyProps {
    isSupporter: boolean;
    numArticles: number;
}

const MIN_ARTICLES_TO_SHOW_ARTICLE_COUNT = 5;

const UsEoyAppealBody: React.FC<UsEoyAppealBodyProps> = ({
    isSupporter,
    numArticles,
}: UsEoyAppealBodyProps) => {
    const shouldShowArticleCount = numArticles >= MIN_ARTICLES_TO_SHOW_ARTICLE_COUNT;
    return (
        <ContributionsTemplateBody
            copy={
                <>
                    <Hide above="tablet">
                        The need for robust, fact-based journalism that highlights injustice and
                        offers solutions is as great as ever.
                    </Hide>
                    <Hide below="tablet">
                        {isSupporter ? (
                            shouldShowArticleCount ? (
                                // supporter + article count
                                <>
                                    Trump’s presidency is ending, but America’s systemic challenges
                                    remain. From a broken healthcare system to corrosive racial
                                    inequality, from rapacious corporations to a climate crisis, the
                                    need for robust, fact-based reporting that highlights injustice
                                    and offers solutions is as great as ever. We value your ongoing
                                    support and hope you’ll consider a year-end gift.{' '}
                                    <ArticleCountOptOut
                                        numArticles={numArticles}
                                        nextWord=" articles"
                                        componentType="us-eoy-banner"
                                    />
                                    .
                                </>
                            ) : (
                                // supporter + no article count
                                <>
                                    Trump’s presidency is ending, but America’s systemic challenges
                                    remain. From a broken healthcare system to corrosive racial
                                    inequality, from rapacious corporations to a climate crisis, the
                                    need for robust, fact-based reporting that highlights injustice
                                    and offers solutions is as great as ever. We value your ongoing
                                    support and hope you’ll consider a year-end gift.
                                </>
                            )
                        ) : shouldShowArticleCount ? (
                            // non-supporter + article count
                            <>
                                Trump’s presidency is ending, but America’s systemic challenges
                                remain. From a broken healthcare system to corrosive racial
                                inequality, from rapacious corporations to a climate crisis, the
                                need for robust, fact-based reporting that highlights injustice and
                                offers solutions is as great as ever. We hope you’ll consider a
                                year-end gift.
                                <ArticleCountOptOut
                                    numArticles={numArticles}
                                    nextWord=" articles"
                                    componentType="us-eoy-banner"
                                />
                                .
                            </>
                        ) : (
                            // non-supporter + no article count
                            <>
                                Trump’s presidency is ending, but America’s systemic challenges
                                remain. From a broken healthcare system to corrosive racial
                                inequality, from rapacious corporations to a climate crisis, the
                                need for robust, fact-based reporting that highlights injustice and
                                offers solutions is as great as ever. We hope you’ll consider a
                                year-end gift.
                            </>
                        )}
                    </Hide>
                </>
            }
        />
    );
};

export default UsEoyAppealBody;
