import React from 'react';
import ContributionsTemplate from '../contributionsTemplate/ContributionsTemplate';
import UsEoyAppealBody from './components/UsEoyAppealBody';
import UsEoyAppealCloseButton from './components/UsEoyAppealCloseButton';
import UsEoyAppealHeader from './components/UsEoyAppealHeader';
import UsEoyAppealSupportingText from './components/UsEoyAppealSupportingText';
import UsEoyAppealTicker from './components/UsEoyAppealTicker';
import UsEoyAppealCta from './components/UsEoyAppealCta';
import {
    OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK,
    OPHAN_COMPONENT_EVENT_READ_MORE_CLICK,
    OPHAN_COMPONENT_EVENT_CLOSE_CLICK,
} from './helpers/ophan';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';

const UsEoyAppealBanner: React.FC<CloseableBannerProps> = ({
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

    const total = tickerSettings?.tickerData?.total || 1;
    const goal = tickerSettings?.tickerData?.goal || 1;

    const goalReached = total > goal;

    return (
        <ContributionsTemplate
            backgroundColour="#DDDBD1"
            closeButton={<UsEoyAppealCloseButton onClose={onCloseClick} />}
            header={<UsEoyAppealHeader />}
            body={
                <UsEoyAppealBody
                    isSupporter={!!isSupporter}
                    numArticles={numArticles || 0}
                    hasOptedOutOfArticleCount={!!hasOptedOutOfArticleCount}
                />
            }
            supportingText={<UsEoyAppealSupportingText goalReached={goalReached} />}
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

const wrapped = withCloseable(UsEoyAppealBanner, 'contributions');

export { wrapped as UsEoyAppealBanner };
