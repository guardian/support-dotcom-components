import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from '@emotion/react';
import { Button, buttonBrand } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';
import { neutral } from '@guardian/src-foundations/palette';

const closeButtonStyles = css`
    position: absolute;
    right: 0;
    &:hover {
        background-color: ${neutral[0]};
        border-color: ${neutral[0]};
    }
`;

interface AusBannerCloseButtonProps {
    onClose: () => void;
}

const AusBannerCloseButton: React.FC<AusBannerCloseButtonProps> = ({
    onClose,
}: AusBannerCloseButtonProps) => {
    return (
        <ThemeProvider theme={buttonBrand}>
            <Button
                onClick={onClose}
                cssOverrides={closeButtonStyles}
                priority="tertiary"
                size="small"
                icon={<SvgCross />}
                hideLabel
            >
                Close
            </Button>
        </ThemeProvider>
    );
};

export default AusBannerCloseButton;
