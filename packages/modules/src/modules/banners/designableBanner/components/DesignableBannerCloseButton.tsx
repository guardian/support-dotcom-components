import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { buttonStyles } from '../styles/buttonStyles';
import { CtaSettings } from '../settings';
import { SvgRoundelBrand, SvgRoundelDefault, SvgRoundelInverse } from '@guardian/src-brand';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

interface DesignableBannerCloseButtonProps {
    onCloseClick: () => void;
    settings: CtaSettings;
    styleOverides?: SerializedStyles;
}

export function DesignableBannerCloseButton({
    onCloseClick,
    settings,
    styleOverides,
}: DesignableBannerCloseButtonProps): JSX.Element {
    const { guardianRoundel } = settings;

    const getRoundel = () => {
        switch (guardianRoundel) {
            case 'brand':
                return <SvgRoundelBrand />;
            case 'inverse':
                return <SvgRoundelInverse />;
            default:
                return <SvgRoundelDefault />;
        }
    };

    return (
        <div
            css={css`
                ${styles.container} ${styleOverides || ''}
            `}
        >
            <div css={styles.roundelContainer}>{getRoundel()}</div>

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
    roundelContainer: css`
        display: none;
        height: 40px;

        svg {
            height: 40px;
            width: 40px;
        }

        ${from.tablet} {
            display: block;
            margin-right: ${space[2]}px;
        }
    `,
    closeButtonOverrides: css`
        height: 40px;
        min-height: 40px;
        width: 40px;
        min-width: 40px;
    `,
};
