import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { Button, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';
import type { ReactComponent } from '../../../../types';

const button = css`
    border: 1px solid white;
`;

interface EnvironmentBannerCloseButtonProps {
    onClick: () => void;
}

export const EnvironmentBannerCloseButton: ReactComponent<EnvironmentBannerCloseButtonProps> = ({
    onClick,
}: EnvironmentBannerCloseButtonProps) => (
    <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
        <Button onClick={onClick} css={button} size="small" icon={<SvgCross />} hideLabel>
            Dismiss the banner
        </Button>
    </ThemeProvider>
);
