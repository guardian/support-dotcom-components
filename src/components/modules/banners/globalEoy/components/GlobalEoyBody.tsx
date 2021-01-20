import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateBody from '../../contributionsTemplate/ContributionsTemplateBody';
import { replaceNonArticleCountPlaceholders } from '../../../../../lib/placeholders';
import { replaceArticleCount } from '../../../../../lib/replaceArticleCount';

interface GlobalEoyBodyProps {
    numArticles: number;
    countryCode?: string;
    body: string;
    mobileBody: string;
}

const GlobalEoyBody: React.FC<GlobalEoyBodyProps> = ({
    numArticles,
    countryCode,
    body,
    mobileBody,
}: GlobalEoyBodyProps) => {
    const cleanMobileBody = replaceNonArticleCountPlaceholders(mobileBody, countryCode);
    const cleanBody = replaceNonArticleCountPlaceholders(body, countryCode);
    return (
        <ContributionsTemplateBody
            copy={
                <>
                    <Hide above="tablet">
                        {replaceArticleCount(cleanMobileBody, numArticles, 'global-eoy-banner')}
                    </Hide>
                    <Hide below="tablet">
                        {replaceArticleCount(cleanBody, numArticles, 'global-eoy-banner')}
                    </Hide>
                </>
            }
        />
    );
};

export default GlobalEoyBody;
