import React from 'react';
import { css } from '@emotion/react';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { buttonStyles } from '../styles/buttonStyles';
import { CtaSettings } from '../settings';
import { SvgRoundelBrand, SvgRoundelDefault } from '@guardian/src-brand';
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
        <div css={styles.container}>
            <div css={styles.roundelContainer}>
                {settings.theme === 'default' || !settings.theme ? (
                    <SvgRoundelDefault />
                ) : (
                    <SvgRoundelBrand />
                )}
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
    container: css`
        display: flex;
        position: relative;
        z-index: 100;
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
