import React from 'react';
import ContributionsTemplateWithVisual from '../contributionsTemplate/ContributionsTemplateWithVisual';
import UsEoyAppealBody from './components/UsEoyAppealBody';
import UsEoyAppealVisual from './components/UsEoyAppealVisual';
import UsEoyAppealCloseButton from './components/UsEoyAppealCloseButton';
import UsEoyAppealHeader from './components/UsEoyAppealHeader';
import UsEoyAppealTicker from './components/UsEoyAppealTicker';
import UsEoyAppealCta from './components/UsEoyAppealCta';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';

const UsEoyAppealBannerWithVisual: React.FC<CloseableBannerProps> = ({
    isSupporter,
    tickerSettings,
    onClose,
}: CloseableBannerProps) => {
    return (
        <ContributionsTemplateWithVisual
            visual={<UsEoyAppealVisual />}
            closeButton={<UsEoyAppealCloseButton onClose={onClose} />}
            header={<UsEoyAppealHeader />}
            body={<UsEoyAppealBody isSupporter={!!isSupporter} />}
            ticker={tickerSettings && <UsEoyAppealTicker tickerSettings={tickerSettings} />}
            cta={<UsEoyAppealCta />}
        />
    );
};

const wrapped = withCloseable(UsEoyAppealBannerWithVisual, 'contributions');

export { wrapped as UsEoyAppealBannerWithVisual };
