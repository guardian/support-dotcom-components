import { css } from '@emotion/react';
import { brand } from '@guardian/src-foundations';
import React from 'react';
import { validatedBannerWrapper, bannerWrapper } from '../common/BannerWrapper';
import { BannerRenderProps } from '../common/types';
import { ChoiceCardsButtonsBanner } from './ChoiceCardsButtonsBanner';

const bannerId = 'choice-cards-buttons-banner-blue';
export const backgroundColor = '#F1F8FC';
export const headingColor = brand[400];
export const borderTopColorStyle = css`
    border-top: 1px solid ${brand[400]};
`;

const ChoiceCardsButtonsBannerBlue = ({
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
            borderTopColorStyle={borderTopColorStyle}
            bannerId={bannerId}
            isSupporter={isSupporter}
            separateArticleCount={separateArticleCount}
        />
    );
};

const validated = validatedBannerWrapper(ChoiceCardsButtonsBannerBlue, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsButtonsBannerBlue, bannerId);

export {
    validated as ChoiceCardsButtonsBannerBlue,
    unvalidated as ChoiceCardsButtonsBannerBlueUnValidated,
};
