import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
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

interface EnvironmentMomentSimpleBannerCtasProps {
    isSupporter: boolean;
    countryCode: string;
    onReadPledgeClick: () => void;
    onContributeClick: () => void;
    onHearFromOurEditorClick: () => void;
}

const EnvironmentMomentSimpleBannerCtas: React.FC<EnvironmentMomentSimpleBannerCtasProps> = ({
    isSupporter,
    countryCode,
    onReadPledgeClick,
    onContributeClick,
    onHearFromOurEditorClick,
}: EnvironmentMomentSimpleBannerCtasProps) => (
    <div css={container}>
        <div>
            <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                {countryCode === 'AU' ? (
                    <LinkButton onClick={onHearFromOurEditorClick} size="small">
                        Hear from our editor
                    </LinkButton>
                ) : (
                    <LinkButton onClick={onReadPledgeClick} size="small">
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
            >
                <span css={styles.hideAfterTablet}>Contribute</span>
                <span css={styles.hideBeforeTablet}>
                    {isSupporter ? 'Support again' : 'Support the Guardian'}
                </span>
            </LinkButton>
        </div>
    </div>
);

export default EnvironmentMomentSimpleBannerCtas;
