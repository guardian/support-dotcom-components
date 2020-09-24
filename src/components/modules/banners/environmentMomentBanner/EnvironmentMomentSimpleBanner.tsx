import React, { useState } from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { BannerProps } from '../../../../types/BannerTypes';
import EnvironmentMomentSimpleBannerBody from './components/EnvironmentMomentSimpleBannerBody';
import EnvironmentMomentSimpleBannerCloseButton from './components/EnvironmentMomentSimpleBannerCloseButton';
import EnvironmentMomentSimpleBannerCtas from './components/EnvironmentMomentSimpleBannerCtas';
import { setContributionsBannerClosedTimestamp } from '../localStorage';
import {
    OPHAN_COMPONENT_EVENT_CLOSE_CLICK,
    OPHAN_COMPONENT_EVENT_READ_PLEDGE_CLICK,
    OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK,
    OPHAN_COMPONENT_EVENT_HEAR_FROM_OUR_EDITOR_CLICK,
} from './helpers/ophan';

const container = css`
    position: relative;
    overflow: hidden;
    background: white;
`;

const banner = css`
    padding: ${space[2]}px ${space[3]}px ${space[5]}px ${space[3]}px;
    margin: auto;
    box-sizing: border-box;
    border-top: 1px solid ${neutral[7]};
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    ${from.tablet} {
        padding: 0.5rem 20px 1.125rem 20px;
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

const closeButtonContainer = css`
    float: right;
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
                    <div>
                        <div css={closeButtonContainer}>
                            <EnvironmentMomentSimpleBannerCloseButton onClick={closeBanner} />
                        </div>
                        <EnvironmentMomentSimpleBannerBody isSupporter={!!isSupporter} />
                    </div>
                    <EnvironmentMomentSimpleBannerCtas
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
