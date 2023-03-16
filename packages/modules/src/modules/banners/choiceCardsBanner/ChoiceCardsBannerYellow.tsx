import { brandAlt, neutral } from '@guardian/src-foundations';
import React from 'react';
import { validatedBannerWrapper, bannerWrapper } from '../common/BannerWrapper';
import { BannerRenderProps } from '../common/types';
import { ChoiceCardsBanner } from './ChoiceCardsBanner';

const bannerId = 'choice-cards-banner-yellow';
export const backgroundColor = brandAlt[400];
export const headingColor = neutral[0];

const ChoiceCardsBannerYellow = ({
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
        <ChoiceCardsBanner
            onCloseClick={onCloseClick}
            content={content}
            choiceCardAmounts={choiceCardAmounts}
            countryCode={countryCode}
            submitComponentEvent={submitComponentEvent}
            tracking={tracking}
            numArticles={numArticles}
            backgroundColor={backgroundColor}
            headingColor={headingColor}
            borderTop={false}
            bannerId={bannerId}
            isSupporter={isSupporter}
            separateArticleCount={separateArticleCount}
        />
    );
};

const validated = validatedBannerWrapper(ChoiceCardsBannerYellow, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsBannerYellow, bannerId);

export { validated as ChoiceCardsBannerYellow, unvalidated as ChoiceCardsBannerYellowUnValidated };
