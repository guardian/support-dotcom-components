import { css } from '@emotion/react';
import { brand } from '@guardian/src-foundations';
import React from 'react';
import { validatedBannerWrapper, bannerWrapper } from '../common/BannerWrapper';
import { BannerRenderProps } from '../common/types';
import { ChoiceCardsBanner } from './ChoiceCardsTabsBanner';

const bannerId = 'choice-cards-tabs-banner-blue';
export const backgroundColor = '#F1F8FC';
export const headingColor = brand[400];
export const borderTopColorStyle = css`
    border-top: 1px solid ${brand[400]};
`;

const ChoiceCardsBannerBlue = ({
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
            borderTopColorStyle={borderTopColorStyle}
            bannerId={bannerId}
            isSupporter={isSupporter}
            separateArticleCount={separateArticleCount}
        />
    );
};

const validated = validatedBannerWrapper(ChoiceCardsBannerBlue, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsBannerBlue, bannerId);

export { validated as ChoiceCardsBannerBlue, unvalidated as ChoiceCardsBannerBlueUnValidated };
