import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { buttonStyles } from '../styles/buttonStyles';
import { CtaSettings } from '../settings';

interface MomentTemplateBannerCloseButtonProps {
    onCloseClick: () => void;
    settings: CtaSettings;
    styleOverides?: SerializedStyles;
}

export function MomentTemplateBannerCloseButton({
    onCloseClick,
    settings,
    styleOverides,
}: MomentTemplateBannerCloseButtonProps): JSX.Element {
    return (
        <div
            css={css`
                ${styles.container} ${styleOverides || ''}
            `}
        >
            <Button
                onClick={onCloseClick}
                cssOverrides={buttonStyles(settings, styles.closeButtonOverrides)}
                icon={<SvgCross />}
                size="small"
                hideLabel
            >
                Close
            </Button>
        </div>
    );
}

const styles = {
    container: css`
        display: flex;
        position: fixed;
        right: 0;
        padding-right: 20px;
        z-index: 100;
    `,
    closeButtonOverrides: css`
        height: 40px;
        min-height: 40px;
        width: 40px;
        min-width: 40px;
    `,
};
