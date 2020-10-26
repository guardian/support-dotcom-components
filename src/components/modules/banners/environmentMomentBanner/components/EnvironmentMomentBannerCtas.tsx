import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import styles from '../helpers/styles';
import { BannerTracking } from '../../../../../types/BannerTypes';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../../../lib/tracking';

const container = css`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    & > * + * {
        margin-left: ${space[3]}px;
    }
`;

const secondaryButton = css`
    color: ${neutral[7]};
    border: 1px solid ${neutral[7]};
`;

const BASE_LANDING_PAGE_URL = 'https://support.theguardian.com/contribute';
const PLEDGE_LINK =
    'https://www.theguardian.com/environment/ng-interactive/2020/oct/05/the-guardian-climate-pledge-2020-environment-emergency-carbon-emissions?INTCMP=enviro_moment_2020_pledgelink_banner';
const LENORE_LINK =
    'https://www.theguardian.com/environment/2020/oct/05/our-world-is-facing-irreversible-destruction-and-still-theres-no-urgency-in-australian-climate-policy?INTCMP=enviro_moment_2020_banner_lenore';

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
    let landingPageUrl = addRegionIdAndTrackingParamsToSupportUrl(
        BASE_LANDING_PAGE_URL,
        tracking,
        countryCode,
    );
    if (isSupporter) {
        landingPageUrl += '&selected-contribution-type=ONE_OFF';
    }

    const PrimaryCta: React.FC<CtaProps> = ({ size }: CtaProps) => (
        <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
            <LinkButton onClick={onContributeClick} size={size} href={landingPageUrl}>
                <span css={styles.hideAfterTablet}>Support us</span>
                <span css={styles.hideBeforeTablet}>
                    {isSupporter ? 'Support again' : 'Support the Guardian'}
                </span>
            </LinkButton>
        </ThemeProvider>
    );

    const SecondaryCta: React.FC<CtaProps> = ({ size }: CtaProps) => (
        <>
            {countryCode === 'AU' ? (
                <LinkButton
                    onClick={onHearFromOurEditorClick}
                    css={secondaryButton}
                    size={size}
                    href={LENORE_LINK}
                    priority="tertiary"
                >
                    Hear from our editor
                </LinkButton>
            ) : (
                <LinkButton
                    onClick={onReadPledgeClick}
                    css={secondaryButton}
                    size={size}
                    href={PLEDGE_LINK}
                    priority="tertiary"
                >
                    Read our pledge
                </LinkButton>
            )}
        </>
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
