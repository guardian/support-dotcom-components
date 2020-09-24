import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';

const container = css`
    & > * + * {
        margin-top: ${space[1]}px;
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
        <LinkButton
            onClick={onContributeClick}
            css={contributeButton}
            size="small"
            priority="tertiary"
        >
            {isSupporter ? 'Support again' : 'Support the Guardian'}
        </LinkButton>
    </div>
);

export default EnvironmentMomentSimpleBannerCtas;
