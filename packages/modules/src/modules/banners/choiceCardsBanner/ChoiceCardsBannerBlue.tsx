import { brand } from '@guardian/src-foundations';
import React from 'react';
import { validatedBannerWrapper, bannerWrapper } from '../common/BannerWrapper';
import { BannerRenderProps } from '../common/types';
import { ChoiceCardsBanner } from './ChoiceCardsBanner';

const bannerId = 'choice-cards-banner-blue';
export const backgroundColor = '#F1F8FC';
export const headingColor = brand[400];

const ChoiceCardsBannerBlue = ({
    onCloseClick,
    content,
    choiceCardAmounts,
    countryCode,
    submitComponentEvent,
    tracking,
    numArticles,
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
            bannerId={bannerId}
        />
    );
};

const validated = validatedBannerWrapper(ChoiceCardsBannerBlue, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsBannerBlue, bannerId);

export { validated as ChoiceCardsBannerBlue, unvalidated as ChoiceCardsBannerBlueUnValidated };
