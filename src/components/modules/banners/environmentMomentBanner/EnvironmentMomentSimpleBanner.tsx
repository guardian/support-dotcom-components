import React, { useState } from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { BannerProps } from '../../../../types/BannerTypes';
import EnvironmentMomentSimpleBannerBody from './components/EnvironmentMomentSimpleBannerBody';
import EnvironmentMomentSimpleBannerCloseButton from './components/EnvironmentMomentSimpleBannerCloseButton';
import EnvironmentMomentSimpleBannerRoundel from './components/EnvironmentMomentSimpleBannerRoundel';
import EnvironmentMomentSimpleBannerCtas from './components/EnvironmentMomentSimpleBannerCtas';
import { setContributionsBannerClosedTimestamp } from '../localStorage';
import {
    OPHAN_COMPONENT_EVENT_CLOSE_CLICK,
    OPHAN_COMPONENT_EVENT_READ_PLEDGE_CLICK,
    OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK,
    OPHAN_COMPONENT_EVENT_HEAR_FROM_OUR_EDITOR_CLICK,
} from './helpers/ophan';
import styles from './helpers/styles';

const container = css`
    padding: ${space[2]}px ${space[3]}px ${space[5]}px ${space[3]}px;
    box-sizing: border-box;
    border-top: 1px solid ${neutral[7]};
    position: relative;
    overflow: hidden;
    background: white;
`;

const banner = css`
    margin: auto;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    ${from.tablet} {
        max-width: 740px;
    }

    ${from.desktop} {
        max-width: 980px;
    }
    ${from.leftCol} {
        max-width: 1140px;
    }
`;

const bodyAndCtasContainer = css`
    & > * + * {
        margin-top: ${space[5]}px;
    }
`;

const bodyAndCloseButtonContainer = css`
    display: flex;
    flex-direction: row-reverse;
`;

const closeButtonContainer = css`
    float: right;

    ${from.tablet} {
        float: none;
        display: flex;

        & > * + * {
            margin-left: ${space[1]}px;
        }
    }
`;

const roundelContainer = css`
    display: none;

    ${from.tablet} {
        display: initial;
    }
`;

export const EnvironmentMomentBanner: React.FC<BannerProps> = ({
    isSupporter,
    countryCode,
    submitComponentEvent,
}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);

    const closeBanner = (): void => {
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_CLOSE_CLICK);
        setContributionsBannerClosedTimestamp();
        setShowBanner(false);
    };

    const onReadPledgeClick = (): void =>
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_READ_PLEDGE_CLICK);

    const onContributeClick = (): void =>
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK);

    const onHearFromOurEditorClick = (): void =>
        submitComponentEvent &&
        submitComponentEvent(OPHAN_COMPONENT_EVENT_HEAR_FROM_OUR_EDITOR_CLICK);

    return showBanner ? (
        <div css={container}>
            <div css={banner}>
                <div css={bodyAndCtasContainer}>
                    <div css={bodyAndCloseButtonContainer}>
                        <div css={closeButtonContainer}>
                            <div css={roundelContainer}>
                                <EnvironmentMomentSimpleBannerRoundel />
                            </div>
                            <EnvironmentMomentSimpleBannerCloseButton onClick={closeBanner} />
                        </div>
                        <EnvironmentMomentSimpleBannerBody isSupporter={!!isSupporter} />
                    </div>
                    <EnvironmentMomentSimpleBannerCtas
                        isSupporter={!!isSupporter}
                        countryCode={countryCode || ''}
                        onReadPledgeClick={onReadPledgeClick}
                        onContributeClick={onContributeClick}
                        onHearFromOurEditorClick={onHearFromOurEditorClick}
                    />
                </div>
            </div>
        </div>
    ) : null;
};
