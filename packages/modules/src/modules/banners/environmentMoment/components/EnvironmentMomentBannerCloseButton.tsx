import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { Button, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';

const button = css`
    border: 1px solid white;
`;

interface EnvironmentMomentBannerCloseButtonProps {
    onClick: () => void;
}

export const EnvironmentMomentBannerCloseButton: React.FC<
    EnvironmentMomentBannerCloseButtonProps
> = ({ onClick }: EnvironmentMomentBannerCloseButtonProps) => (
    <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
        <Button onClick={onClick} css={button} size="small" icon={<SvgCross />} hideLabel>
            Dismiss the banner
        </Button>
    </ThemeProvider>
);
