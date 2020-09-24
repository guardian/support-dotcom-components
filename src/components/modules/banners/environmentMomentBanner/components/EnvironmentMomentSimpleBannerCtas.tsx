import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';

const container = css`
    & > * + * {
        margin-top: ${space[3]}px;
    }
`;

const contributeButton = css`
    color: ${neutral[7]};
    border: 1px solid ${neutral[7]};
`;

interface EnvironmentMomentSimpleBannerCtasProps {
    countryCode: string;
    onReadPledgeClick: () => void;
    onContributeClick: () => void;
    onHearFromOurEditorClick: () => void;
}

const EnvironmentMomentSimpleBannerCtas: React.FC<EnvironmentMomentSimpleBannerCtasProps> = ({
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
                Support
            </LinkButton>
        </div>
    </div>
);

export default EnvironmentMomentSimpleBannerCtas;
