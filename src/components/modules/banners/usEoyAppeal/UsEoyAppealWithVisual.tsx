import React from 'react';
import ContributionsTemplateWithVisual from '../contributionsTemplate/ContributionsTemplateWithVisual';
import UsEoyAppealBody from './components/UsEoyAppealBody';
import UsEoyAppealVisual from './components/UsEoyAppealVisual';
import UsEoyAppealCloseButton from './components/UsEoyAppealCloseButton';
import UsEoyAppealHeader from './components/UsEoyAppealHeader';
import UsEoyAppealTicker from './components/UsEoyAppealTicker';
import UsEoyAppealCta from './components/UsEoyAppealCta';
import {
    OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK,
    OPHAN_COMPONENT_EVENT_NOT_NOW_CLICK,
    OPHAN_COMPONENT_EVENT_CLOSE_CLICK,
} from './helpers/ophan';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';

const UsEoyAppealBannerWithVisual: React.FC<CloseableBannerProps> = ({
    isSupporter,
    tickerSettings,
    onClose,
    submitComponentEvent,
    tracking,
    countryCode,
    numArticles,
}: CloseableBannerProps) => {
    const onContributeClick = (): void =>
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK);

    const onNotNowClick = (): void => {
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_NOT_NOW_CLICK);
        onClose();
    };

    const onCloseClick = (): void => {
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_CLOSE_CLICK);
        onClose();
    };

    return (
        <ContributionsTemplateWithVisual
            visual={<UsEoyAppealVisual />}
            closeButton={<UsEoyAppealCloseButton onClose={onCloseClick} />}
            header={<UsEoyAppealHeader />}
            body={<UsEoyAppealBody isSupporter={!!isSupporter} numArticles={numArticles || 0} />}
            ticker={tickerSettings && <UsEoyAppealTicker tickerSettings={tickerSettings} />}
            cta={
                <UsEoyAppealCta
                    onContributeClick={onContributeClick}
                    onNotNowClick={onNotNowClick}
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
