import React from 'react';
import { css } from '@emotion/react';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { buttonStyles } from '../buttonStyles';
import { CtaSettings } from '../settings';

// ---- Component ---- //

interface MomentTemplateBannerCloseButtonProps {
    onCloseClick: () => void;
    settings: CtaSettings;
}

export function MomentTemplateBannerCloseButton({
    onCloseClick,
    settings,
}: MomentTemplateBannerCloseButtonProps): JSX.Element {
    return (
        <div css={styles.container}>
            <Button
                onClick={onCloseClick}
                cssOverrides={buttonStyles(settings)}
                icon={<SvgCross />}
                size="small"
                hideLabel
            >
                Close
            </Button>
        </div>
    );
}

// ---- Styles ---- //

const styles = {
    container: css`
        display: flex;
    `,
};
