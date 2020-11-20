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
    OPHAN_COMPONENT_EVENT_NOT_NOW_CLICK,
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
        <ContributionsTemplate
            closeButton={<UsEoyAppealCloseButton onClose={onCloseClick} />}
            header={<UsEoyAppealHeader />}
            body={<UsEoyAppealBody isSupporter={!!isSupporter} />}
            supportingText={<UsEoyAppealSupportingText />}
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

const wrapped = withCloseable(UsEoyAppealBanner, 'contributions');

export { wrapped as UsEoyAppealBanner };
