import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateBody from '../../contributionsTemplate/ContributionsTemplateBody';
import { ArticleCountOptOut } from '../../../shared/ArticleCountOptOut';
import { selectItem } from '../helpers/xmasUpdates';

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

    const BeforeDec29Copy: React.FC = () => (
        <Hide below="tablet">
            {isSupporter ? (
                shouldShowArticleCount ? (
                    // supporter + article count
                    <>
                        Trump’s presidency is ending, but America’s systemic challenges remain. From
                        broken healthcare to corrosive racial inequality, from rapacious
                        corporations to a climate crisis, the need for fact-based reporting that
                        highlights injustice and offers solutions is as great as ever. You&apos;ve
                        read{' '}
                        <ArticleCountOptOut
                            numArticles={numArticles}
                            nextWord=" articles"
                            type="us-eoy-banner"
                        />{' '}
                        in the past year. We value your support and hope you’ll consider a year-end
                        gift.
                    </>
                ) : (
                    // supporter + no article count
                    <>
                        Trump’s presidency is ending, but America’s systemic challenges remain. From
                        broken healthcare to corrosive racial inequality, from rapacious
                        corporations to a climate crisis, the need for fact-based reporting that
                        highlights injustice and offers solutions is as great as ever. We value your
                        support and hope you’ll consider a year-end gift.
                    </>
                )
            ) : shouldShowArticleCount ? (
                // non-supporter + article count
                <>
                    Trump’s presidency is ending, but America’s systemic challenges remain. From a
                    broken healthcare system to corrosive racial inequality, from rapacious
                    corporations to a climate crisis, the need for robust, fact-based reporting that
                    highlights injustice and offers solutions is as great as ever. You&apos;ve read{' '}
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
                    Trump’s presidency is ending, but America’s systemic challenges remain. From a
                    broken healthcare system to corrosive racial inequality, from rapacious
                    corporations to a climate crisis, the need for robust, fact-based reporting that
                    highlights injustice and offers solutions is as great as ever. We hope you’ll
                    consider a year-end gift.
                </>
            )}
        </Hide>
    );

    const Dec29To31Copy: React.FC = () => (
        <Hide below="tablet">
            {isSupporter ? (
                shouldShowArticleCount ? (
                    // supporter + article count
                    <>
                        … we want to thank you for your ongoing support. From a broken healthcare
                        system to corrosive racial inequality, from rapacious corporations to a
                        climate crisis, the Guardian will tackle America’s deep systemic challenges
                        in the new year. You&apos;ve read{' '}
                        <ArticleCountOptOut
                            numArticles={numArticles}
                            nextWord=" articles"
                            type="us-eoy-banner"
                        />{' '}
                        in the past year. If you haven&apos;t yet made a year-end gift, please
                        consider one today.
                    </>
                ) : (
                    // supporter + no article count
                    <>
                        … we want to thank you for your ongoing support. From a broken healthcare
                        system to corrosive racial inequality, from rapacious corporations to a
                        climate crisis, the Guardian will tackle America’s deep systemic challenges
                        in the new year. If you haven&apos;t yet made a year-end gift, please
                        consider one today.
                    </>
                )
            ) : shouldShowArticleCount ? (
                // non-supporter + article count
                <>
                    … time is running out to support the Guardian in 2020. From a broken healthcare
                    system to corrosive racial inequality, from rapacious corporations to a climate
                    crisis, the Guardian will tackle America’s deep systemic challenges in the new
                    year. You&apos;ve read{' '}
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
                    … time is running out to support the Guardian in 2020. From a broken healthcare
                    system to corrosive racial inequality, from rapacious corporations to a climate
                    crisis, the Guardian will tackle America’s deep systemic challenges in the new
                    year. We hope you’ll consider a year-end gift.
                </>
            )}
        </Hide>
    );

    const Jan1To3Copy: React.FC = () => (
        <Hide below="tablet">
            {isSupporter ? (
                // supporter
                <>
                    … the Guardian will tackle America’s deep systemic challenges, from a broken
                    healthcare system to corrosive racial inequality, from rapacious corporations to
                    a climate crisis. Thank you to everyone who has helped us reach our fundraising
                    goal. Our fundraiser closes on 10 January.
                </>
            ) : shouldShowArticleCount ? (
                // non-supporter + article count
                <>
                    … we want to thank everyone who has helped us reach our goal. The need for
                    robust, fact-based journalism that highlights injustice and offers solutions is
                    as great as ever. You&apos;ve read{' '}
                    <ArticleCountOptOut
                        numArticles={numArticles}
                        nextWord=" articles"
                        type="us-eoy-banner"
                    />{' '}
                    in the past year. It’s not too late to give; our fundraiser closes 10 January.
                    year.
                </>
            ) : (
                // non-supporter + no article count
                <>
                    … we want to thank everyone who has helped us reach our goal. The need for
                    robust, fact-based journalism that highlights injustice and offers solutions is
                    as great as ever. It’s not too late to give; our fundraiser closes 10 January.
                    year.
                </>
            )}
        </Hide>
    );

    const AfterJan3Copy: React.FC = () => (
        <Hide below="tablet">
            {isSupporter ? (
                shouldShowArticleCount ? (
                    // supporter + article count
                    <>
                        Your support helped raise more than $1.25m for high impact journalism in the
                        new year. From broken healthcare to corrosive racial inequality, from
                        rapacious corporations to a climate crisis, the Guardian will tackle
                        America’s systemic challenges in 2021. You&apos;ve read
                        <ArticleCountOptOut
                            numArticles={numArticles}
                            nextWord=" articles"
                            type="us-eoy-banner"
                        />{' '}
                        in the past year. It’s not too late to give; our fundraiser closes 10
                        January.
                    </>
                ) : (
                    // supporter + no article count
                    <>
                        Your support helped raise more than $1.25m for high impact journalism in the
                        new year. From broken healthcare to corrosive racial inequality, from
                        rapacious corporations to a climate crisis, the Guardian will tackle
                        America’s systemic challenges in 2021. It’s not too late to give; our
                        fundraiser closes 10 January.
                    </>
                )
            ) : shouldShowArticleCount ? (
                // non-supporter + article count
                <>
                    Your support helped raise more than $1.25m for high impact journalism in the new
                    year. From broken healthcare to corrosive racial inequality, from rapacious
                    corporations to a climate crisis, the Guardian will tackle America’s systemic
                    challenges in 2021. You&apos;ve read
                    <ArticleCountOptOut
                        numArticles={numArticles}
                        nextWord=" articles"
                        type="us-eoy-banner"
                    />{' '}
                    in the past year. It’s not too late to give; our fundraiser closes 10 January.
                </>
            ) : (
                // non-supporter + no article count
                <>
                    Your support helped raise more than $1.25m for high impact journalism in the new
                    year. From broken healthcare to corrosive racial inequality, from rapacious
                    corporations to a climate crisis, the Guardian will tackle America’s systemic
                    challenges in 2021. It’s not too late to give; our fundraiser closes 10 January.
                </>
            )}
        </Hide>
    );

    const Copy = selectItem(BeforeDec29Copy, Dec29To31Copy, Jan1To3Copy, AfterJan3Copy);

    return <ContributionsTemplateBody copy={<Copy />} />;
};

export default UsEoyAppealBody;
