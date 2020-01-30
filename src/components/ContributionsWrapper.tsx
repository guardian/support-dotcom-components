import React from 'react';
import { isEpicContent, isEpicSuitable, isEpicWorthwhile } from '../lib/targeting';
import { Props as ContributionsEpicProps } from './ContributionsEpic';

export type Tag = {
    id: string;
    type: string;
    title: string;
    twitterHandle?: string;
    bylineImageUrl?: string;
};

export type EpicTargeting = {
    contentType: string;
    sectionName: string;
    shouldHideReaderRevenue: boolean;
    isMinuteArticle: boolean;
    isPaidContent: boolean;
    tags: Tag[];
};

type Props = {
    children: React.ReactElement<ContributionsEpicProps>;
    targeting: EpicTargeting;
};

export const ContributionsWrapper: React.FC<Props> = ({ children, targeting }: Props) => {
    // Render Epic if content is simultaneously:
    // 1) The right type to be served an Epic (i.e. an Article)
    // 2) Suitable to be served an Epic (i.e. not 'sensitive' and not sponsored)
    // 3) Worth it of an Epic (i.e. not blacklisted for section/keyword/tone)
    if (isEpicContent(targeting) && isEpicSuitable(targeting) && isEpicWorthwhile(targeting)) {
        return children;
    }

    // Otherwise, don't render anything
    return null;
};
