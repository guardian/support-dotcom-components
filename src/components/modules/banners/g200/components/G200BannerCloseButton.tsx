import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { Button, buttonBrand } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';
import { news } from '@guardian/src-foundations/palette';

const closeButtonStyles = css`
    &:hover {
        background-color: ${news[300]};
    }
`;

interface G200BannerCloseButtonProps {
    onClose: () => void;
}

const G200BannerCloseButton: React.FC<G200BannerCloseButtonProps> = ({
    onClose,
}: G200BannerCloseButtonProps) => {
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

export default G200BannerCloseButton;
