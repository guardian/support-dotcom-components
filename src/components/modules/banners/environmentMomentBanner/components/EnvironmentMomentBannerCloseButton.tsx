import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { Button, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';

const button = css`
    border: 1px solid white;
`;

interface EnvironmentMomentBannerCloseButtonProps {
    onClick: () => void;
}

const EnvironmentMomentBannerCloseButton: React.FC<EnvironmentMomentBannerCloseButtonProps> = ({
    onClick,
}: EnvironmentMomentBannerCloseButtonProps) => (
    <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
        <Button onClick={onClick} css={button} size="small" icon={<SvgCross />} hideLabel>
            Dismiss the banner
        </Button>
    </ThemeProvider>
);

export default EnvironmentMomentBannerCloseButton;
