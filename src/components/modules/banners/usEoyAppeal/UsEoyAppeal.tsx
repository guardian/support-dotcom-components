import React from 'react';
import ContributionsTemplate from '../contributionsTemplate/ContributionsTemplate';
import UsEoyAppealBody from './components/UsEoyAppealBody';
import UsEoyAppealCloseButton from './components/UsEoyAppealCloseButton';
import UsEoyAppealHeader from './components/UsEoyAppealHeader';
import UsEoyAppealTicker from './components/UsEoyAppealTicker';
import UsEoyAppealCta from './components/UsEoyAppealCta';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';

const UsEoyAppealBanner: React.FC<CloseableBannerProps> = ({
    isSupporter,
    tickerSettings,
    onClose,
}: CloseableBannerProps) => {
    return (
        <ContributionsTemplate
            closeButton={<UsEoyAppealCloseButton onClose={onClose} />}
            header={<UsEoyAppealHeader />}
            body={<UsEoyAppealBody isSupporter={!!isSupporter} />}
            ticker={tickerSettings && <UsEoyAppealTicker tickerSettings={tickerSettings} />}
            cta={<UsEoyAppealCta />}
        />
    );
};

const wrapped = withCloseable(UsEoyAppealBanner, 'contributions');

export { wrapped as UsEoyAppealBanner };
