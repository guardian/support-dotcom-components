import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import styles from '../helpers/styles';
import { BannerTracking } from '../../../../../types/BannerTypes';
import { addTrackingParams } from '../../../../../lib/tracking';

const container = css`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    & > * + * {
        margin-left: ${space[3]}px;
    }

    ${from.desktop} {
        flex-direction: column;

        & > * + * {
            margin-top: ${space[2]}px;
            margin-left: 0px;
        }
    }
`;

const contributeButton = css`
    color: ${neutral[7]};
    border: 1px solid ${neutral[7]};
`;

const BASE_LANDING_PAGE_URL = 'https://support.theguardian.com/contribute';
const PLEDGE_LINK =
    'https://www.theguardian.com/environment/ng-interactive/2020/oct/05/the-guardian-environment-pledge-2020-climate-emergency-carbon-emissions?INTCMP=enviro_moment_2020_pledgelink_banner';

interface EnvironmentMomentSimpleBannerCtasProps {
    isSupporter: boolean;
    countryCode: string;
    onReadPledgeClick: () => void;
    onContributeClick: () => void;
    onHearFromOurEditorClick: () => void;
    tracking: BannerTracking;
}

const EnvironmentMomentSimpleBannerCtas: React.FC<EnvironmentMomentSimpleBannerCtasProps> = ({
    isSupporter,
    countryCode,
    onReadPledgeClick,
    onContributeClick,
    onHearFromOurEditorClick,
    tracking,
}: EnvironmentMomentSimpleBannerCtasProps) => {
    let landingPageUrl = addTrackingParams(BASE_LANDING_PAGE_URL, tracking);
    if (isSupporter) {
        landingPageUrl += '&selected-contribution-type=ONE_OFF';
    }

    return (
        <div css={container}>
            <div>
                <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                    {countryCode === 'AU' ? (
                        <LinkButton onClick={onHearFromOurEditorClick} size="small">
                            Hear from our editor
                        </LinkButton>
                    ) : (
                        <LinkButton onClick={onReadPledgeClick} size="small" href={PLEDGE_LINK}>
                            Read our pledge
                        </LinkButton>
                    )}
                </ThemeProvider>
            </div>
            <div>
                <LinkButton
                    onClick={onContributeClick}
                    css={contributeButton}
                    size="small"
                    priority="tertiary"
                    href={landingPageUrl}
                >
                    <span css={styles.hideAfterTablet}>Contribute</span>
                    <span css={styles.hideBeforeTablet}>
                        {isSupporter ? 'Support again' : 'Support the Guardian'}
                    </span>
                </LinkButton>
            </div>
        </div>
    );
};

export default EnvironmentMomentSimpleBannerCtas;
