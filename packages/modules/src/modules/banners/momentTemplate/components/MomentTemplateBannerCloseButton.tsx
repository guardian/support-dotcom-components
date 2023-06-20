import React from 'react';
import { css } from '@emotion/react';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { buttonStyles } from '../styles/buttonStyles';
import { CtaSettings } from '../settings';
import { SvgRoundelBrand, SvgRoundelDefault, SvgRoundelInverse } from '@guardian/src-brand';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

interface MomentTemplateBannerCloseButtonProps {
    onCloseClick: () => void;
    settings: CtaSettings;
}

export function MomentTemplateBannerCloseButton({
    onCloseClick,
    settings,
}: MomentTemplateBannerCloseButtonProps): JSX.Element {
    const { theme, guardianRoundel } = settings;

    const getRoundel = () => {
        if (guardianRoundel) {
            switch (guardianRoundel) {
                case 'brand':
                    return <SvgRoundelBrand />;
                case 'inverse':
                    return <SvgRoundelInverse />;
                default:
                    return <SvgRoundelDefault />;
            }
        }
        if (theme && theme === 'brand') {
            return <SvgRoundelBrand />;
        }
        return <SvgRoundelDefault />;
    };

    return (
        <div css={styles.container}>
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
        justify-content: end;
        position: relative;
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
