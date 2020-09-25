import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import styles from '../helpers/styles';

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

interface EnvironmentMomentBannerCtasProps {
    isSupporter: boolean;
    countryCode: string;
    onReadPledgeClick: () => void;
    onContributeClick: () => void;
    onHearFromOurEditorClick: () => void;
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
}: EnvironmentMomentBannerCtasProps) => {
    const PrimaryCta: React.FC<CtaProps> = ({ size }: CtaProps) => (
        <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
            {countryCode === 'AU' ? (
                <LinkButton onClick={onHearFromOurEditorClick} size={size}>
                    Hear from our editor
                </LinkButton>
            ) : (
                <LinkButton onClick={onReadPledgeClick} size={size}>
                    Read our pledge
                </LinkButton>
            )}
        </ThemeProvider>
    );

    const SecondaryCta: React.FC<CtaProps> = ({ size }: CtaProps) => (
        <LinkButton
            onClick={onContributeClick}
            css={contributeButton}
            size={size}
            priority="tertiary"
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
