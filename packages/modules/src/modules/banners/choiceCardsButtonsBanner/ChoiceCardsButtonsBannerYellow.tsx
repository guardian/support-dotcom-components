import { brandAlt, neutral } from '@guardian/src-foundations';
import React from 'react';
import { validatedBannerWrapper, bannerWrapper } from '../common/BannerWrapper';
import { BannerRenderProps } from '../common/types';
import { ChoiceCardsButtonsBanner } from './ChoiceCardsButtonsBanner';

const bannerId = 'choice-cards-buttons-banner-yellow';
export const backgroundColor = brandAlt[400];
export const headingColor = neutral[0];
export const borderTopColor = neutral[0];

const ChoiceCardsButtonsBannerYellow = ({
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
        <ChoiceCardsButtonsBanner
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

const validated = validatedBannerWrapper(ChoiceCardsButtonsBannerYellow, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsButtonsBannerYellow, bannerId);

export {
    validated as ChoiceCardsButtonsBannerYellow,
    unvalidated as ChoiceCardsButtonsBannerYellowUnValidated,
};
