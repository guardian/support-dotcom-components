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

const bannerStyles = css`
    background-color: #dddbd1;
`;

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

    return (
        <ContributionsTemplateWithVisual
            cssOverrides={bannerStyles}
            visual={<UsEoyAppealVisual />}
            closeButton={<UsEoyAppealCloseButton onClose={onCloseClick} />}
            header={<UsEoyAppealHeader />}
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
