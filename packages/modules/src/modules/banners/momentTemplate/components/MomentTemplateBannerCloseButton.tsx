import React from 'react';
import { css } from '@emotion/react';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { buttonStyles } from '../buttonStyles';
import { CtaSettings } from '../settings';
import { SvgRoundelBrand } from '@guardian/src-brand';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

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
        <div css={styles.container(settings)}>
            <div css={styles.roundelContainer}>
                <SvgRoundelBrand />
            </div>

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
    container: (settings: CtaSettings) => css`
        display: flex;
        position: relative;
        z-index: ${settings.default.zIndex ?? 'auto'};
    `,
    roundelContainer: css`
        display: none;
        height: 36px;

        svg {
            height: 100%;
        }

        ${from.tablet} {
            display: block;
            margin-right: ${space[2]}px;
        }
    `,
};
