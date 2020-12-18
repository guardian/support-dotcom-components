import React from 'react';
import { css } from '@emotion/core';
import ContributionsTemplateWithVisual from '../contributionsTemplate/ContributionsTemplateWithVisual';
import GlobalEoyBody from './components/GlobalEoyBody';
import GlobalEoyVisual from './components/GlobalEoyVisual';
import GlobalEoyCloseButton from './components/GlobalEoyCloseButton';
import GlobalEoyHeader from './components/GlobalEoyHeader';
import GlobalEoyCta from './components/GlobalEoyCta';
import {
    OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK,
    OPHAN_COMPONENT_EVENT_READ_MORE_CLICK,
    OPHAN_COMPONENT_EVENT_CLOSE_CLICK,
} from './helpers/ophan';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';

const bannerStyles = css`
    background-color: #fff7e5;
    box-shadow: 0px -1px 0px #052962;
`;

const GlobalEoyBanner: React.FC<CloseableBannerProps> = ({
    isSupporter,
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
            visual={<GlobalEoyVisual />}
            closeButton={<GlobalEoyCloseButton onClose={onCloseClick} />}
            header={<GlobalEoyHeader />}
            body={
                <GlobalEoyBody
                    isSupporter={!!isSupporter}
                    numArticles={numArticles || 0}
                    hasOptedOutOfArticleCount={!!hasOptedOutOfArticleCount}
                />
            }
            cta={
                <GlobalEoyCta
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

const wrapped = withCloseable(GlobalEoyBanner, 'contributions');

export { wrapped as GlobalEoyBanner };
