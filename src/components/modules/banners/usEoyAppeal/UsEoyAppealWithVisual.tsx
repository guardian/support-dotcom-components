import React from 'react';
import { css } from '@emotion/core';
import ContributionsTemplateWithVisual from '../contributionsTemplate/ContributionsTemplateWithVisual';
import UsEoyAppealBody from './components/UsEoyAppealBody';
import UsEoyAppealVisual from './components/UsEoyAppealVisual';
import UsEoyAppealCloseButton from './components/UsEoyAppealCloseButton';
import UsEoyAppealHeader from './components/UsEoyAppealHeader';
import UsEoyAppealTicker from './components/UsEoyAppealTicker';
import UsEoyAppealCta from './components/UsEoyAppealCta';
import {
    OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK,
    OPHAN_COMPONENT_EVENT_READ_MORE_CLICK,
    OPHAN_COMPONENT_EVENT_CLOSE_CLICK,
} from './helpers/ophan';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';
import { selectItem } from './helpers/xmasUpdates';

const UsEoyAppealBannerWithVisual: React.FC<CloseableBannerProps> = ({
    isSupporter,
    tickerSettings,
    onClose,
    submitComponentEvent,
    tracking,
    countryCode,
    numArticles,
    hasOptedOutOfArticleCount,
}: CloseableBannerProps) => {
    const onContributeClick = (): void =>
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK);

    const onReadMoreClick = (): void => {
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_READ_MORE_CLICK);
        onClose();
    };

    const onCloseClick = (): void => {
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_CLOSE_CLICK);
        onClose();
    };

    const beforeDec29BackgroundColour = '#dddbd1';
    const dec29ToJan3Colour = '#e7d5b8';
    const afterJan3Colour = beforeDec29BackgroundColour;

    const backgroundColour = selectItem(
        beforeDec29BackgroundColour,
        dec29ToJan3Colour,
        dec29ToJan3Colour,
        afterJan3Colour,
    );

    const bannerStyles = css`
        background-color: ${backgroundColour};
    `;

    return (
        <ContributionsTemplateWithVisual
            cssOverrides={bannerStyles}
            visual={<UsEoyAppealVisual />}
            closeButton={<UsEoyAppealCloseButton onClose={onCloseClick} />}
            header={<UsEoyAppealHeader isSupporter={!!isSupporter} />}
            body={
                <UsEoyAppealBody
                    isSupporter={!!isSupporter}
                    numArticles={numArticles || 0}
                    hasOptedOutOfArticleCount={!!hasOptedOutOfArticleCount}
                />
            }
            ticker={tickerSettings && <UsEoyAppealTicker tickerSettings={tickerSettings} />}
            cta={
                <UsEoyAppealCta
                    onContributeClick={onContributeClick}
                    onReadMoreClick={onReadMoreClick}
                    tracking={tracking}
                    countryCode={countryCode || ''}
                    isSupporter={!!isSupporter}
                />
            }
        />
    );
};

const wrapped = withCloseable(UsEoyAppealBannerWithVisual, 'contributions');

export { wrapped as UsEoyAppealBannerWithVisual };
