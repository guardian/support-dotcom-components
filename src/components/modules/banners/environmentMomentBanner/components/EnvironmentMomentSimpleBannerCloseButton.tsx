import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { neutral } from '@guardian/src-foundations/palette';
import { Button, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';

const button = css`
    &:hover {
        background-color: ${neutral[86]};
    }
`;

interface EnvironmentMomentSimpleBannerCloseButtonProps {
    onClick: () => void;
}

const EnvironmentMomentSimpleBannerCloseButton: React.FC<EnvironmentMomentSimpleBannerCloseButtonProps> = ({
    onClick,
}: EnvironmentMomentSimpleBannerCloseButtonProps) => (
    <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
        <Button
            onClick={onClick}
            css={button}
            size="small"
            icon={<SvgCross />}
            priority="tertiary"
            hideLabel
        >
            Dismiss the banner
        </Button>
    </ThemeProvider>
);

export default EnvironmentMomentSimpleBannerCloseButton;
