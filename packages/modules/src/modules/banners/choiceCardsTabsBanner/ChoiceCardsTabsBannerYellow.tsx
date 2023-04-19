import { brandAlt, neutral } from '@guardian/src-foundations';
import React from 'react';
import { validatedBannerWrapper, bannerWrapper } from '../common/BannerWrapper';
import { BannerRenderProps } from '../common/types';
import { ChoiceCardsTabsBanner } from './ChoiceCardsTabsBanner';

const bannerId = 'choice-cards-tabs-banner-yellow';
export const backgroundColor = brandAlt[400];
export const headingColor = neutral[0];
export const borderTopColor = neutral[0];

const ChoiceCardsTabsBannerYellow = ({
    onCloseClick,
    content,
    choiceCardAmounts,
    countryCode,
    submitComponentEvent,
    tracking,
    numArticles,
    isSupporter,
    separateArticleCount,
}: BannerRenderProps) => {
    return (
        <ChoiceCardsTabsBanner
            onCloseClick={onCloseClick}
            content={content}
            choiceCardAmounts={choiceCardAmounts}
            countryCode={countryCode}
            submitComponentEvent={submitComponentEvent}
            tracking={tracking}
            numArticles={numArticles}
            backgroundColor={backgroundColor}
            headingColor={headingColor}
            bannerId={bannerId}
            isSupporter={isSupporter}
            separateArticleCount={separateArticleCount}
        />
    );
};

const validated = validatedBannerWrapper(ChoiceCardsTabsBannerYellow, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsTabsBannerYellow, bannerId);

export {
    validated as ChoiceCardsTabsBannerYellow,
    unvalidated as ChoiceCardsTabsBannerYellowUnValidated,
};
