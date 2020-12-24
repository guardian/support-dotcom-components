import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateBody from '../../contributionsTemplate/ContributionsTemplateBody';
import { ArticleCountOptOut } from '../../../shared/ArticleCountOptOut';
import { getLocalCurrencySymbol } from '../../../../../lib/geolocation';

interface GlobalEoyBodyProps {
    numArticles: number;
    hasOptedOutOfArticleCount: boolean;
    countryCode?: string;
}

const MIN_NUM_ARTICLES_TO_SHOW_ARTICLE_COUNT = 5;

const GlobalEoyBody: React.FC<GlobalEoyBodyProps> = ({
    hasOptedOutOfArticleCount,
    numArticles,
    countryCode,
}: GlobalEoyBodyProps) => {
    const shouldShowArticleCount =
        !hasOptedOutOfArticleCount && numArticles > MIN_NUM_ARTICLES_TO_SHOW_ARTICLE_COUNT;

    return (
        <ContributionsTemplateBody
            copy={
                <>
                    <Hide above="tablet">
                        With 2021 offering new hope, we commit to another year of quality reporting.
                        Support us from {getLocalCurrencySymbol(countryCode)}1.
                    </Hide>
                    <Hide below="tablet">
                        {shouldShowArticleCount ? (
                            <>
                                In an extraordinary 2020, our independent journalism was powered by
                                more than a million supporters. Thanks to you, we provided vital
                                news and analysis for everyone, led by science and truth.
                                You&apos;ve read{' '}
                                <ArticleCountOptOut
                                    numArticles={numArticles}
                                    nextWord=" articles"
                                    type="global-eoy-banner"
                                />{' '}
                                in the last year. With 2021 offering renewed hope, we commit to
                                another year of high-impact reporting. Support us from{' '}
                                {getLocalCurrencySymbol(countryCode)}1.
                            </>
                        ) : (
                            <>
                                In an extraordinary 2020, our independent journalism was powered by
                                more than a million supporters. Thanks to you, we provided vital
                                news and analysis for everyone, led by science and truth. With 2021
                                offering renewed hope, we commit to another year of high-impact
                                reporting. Support us from as little as{' '}
                                {getLocalCurrencySymbol(countryCode)}1.
                            </>
                        )}
                    </Hide>
                </>
            }
        />
    );
};

export default GlobalEoyBody;
