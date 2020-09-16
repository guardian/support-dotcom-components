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

const EnvironmentMomentBannerCtas: React.FC = () => (
    <div css={container}>
        <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
            <LinkButton size="small">Read our pledge</LinkButton>
        </ThemeProvider>
        <LinkButton css={contributeButton} size="small" priority="tertiary">
            <span css={styles.hideAfterTablet}>Contribute</span>
            <span css={styles.hideBeforeTablet}>Support the Guardian</span>
        </LinkButton>
    </div>
);

export default EnvironmentMomentBannerCtas;
