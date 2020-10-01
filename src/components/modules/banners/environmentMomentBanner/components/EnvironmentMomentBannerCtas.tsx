import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { space } from '@guardian/src-foundations';
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
`;

const contributeButton = css`
    color: ${neutral[7]};
    border: 1px solid ${neutral[7]};
`;

const BASE_LANDING_PAGE_URL = 'https://support.theguardian.com/contribute';
const PLEDGE_LINK =
    'https://www.theguardian.com/environment/ng-interactive/2020/oct/05/the-guardian-climate-pledge-2020-environment-emergency-carbon-emissions?INTCMP=enviro_moment_2020_pledgelink_banner';
interface EnvironmentMomentBannerCtasProps {
    isSupporter: boolean;
    countryCode: string;
    onReadPledgeClick: () => void;
    onContributeClick: () => void;
    onHearFromOurEditorClick: () => void;
    tracking: BannerTracking;
}

interface CtaProps {
    size: 'small' | 'default';
}

const EnvironmentMomentBannerCtas: React.FC<EnvironmentMomentBannerCtasProps> = ({
    isSupporter,
    countryCode,
    onReadPledgeClick,
    onContributeClick,
    onHearFromOurEditorClick,
    tracking,
}: EnvironmentMomentBannerCtasProps) => {
    const PrimaryCta: React.FC<CtaProps> = ({ size }: CtaProps) => (
        <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
            {countryCode === 'AU' ? (
                <LinkButton onClick={onHearFromOurEditorClick} size={size}>
                    Hear from our editor
                </LinkButton>
            ) : (
                <LinkButton onClick={onReadPledgeClick} size={size} href={PLEDGE_LINK}>
                    Read our pledge
                </LinkButton>
            )}
        </ThemeProvider>
    );

    let landingPageUrl = addTrackingParams(BASE_LANDING_PAGE_URL, tracking);
    if (isSupporter) {
        landingPageUrl += '&selected-contribution-type=ONE_OFF';
    }

    const SecondaryCta: React.FC<CtaProps> = ({ size }: CtaProps) => (
        <LinkButton
            onClick={onContributeClick}
            css={contributeButton}
            size={size}
            priority="tertiary"
            href={landingPageUrl}
        >
            <span css={styles.hideAfterTablet}>Contribute</span>
            <span css={styles.hideBeforeTablet}>
                {isSupporter ? 'Support again' : 'Support the Guardian'}
            </span>
        </LinkButton>
    );

    return (
        <div>
            <div css={styles.hideAfterTablet}>
                <div css={container}>
                    <PrimaryCta size="small" />
                    <SecondaryCta size="small" />
                </div>
            </div>
            <div css={styles.hideBeforeTablet}>
                <div css={container}>
                    <PrimaryCta size="default" />
                    <SecondaryCta size="default" />
                </div>
            </div>
        </div>
    );
};

export default EnvironmentMomentBannerCtas;
