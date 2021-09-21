import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { SvgRoundelInverse } from '@guardian/src-brand';

const styles = {
    container: css`
        display: flex;
    `,
    roundelContainer: css`
        height: 36px;
        width: 36px;

        svg {
            display: block;
        }
    `,
    closeButton: css`
        background-color: ${neutral[100]};
        color: ${neutral[0]};

        ${from.tablet} {
            background-color: ${neutral[0]};
            color: ${neutral[100]};
            border: 1px solid ${neutral[100]};
        }
    `,
};

interface InvestigationsMomentBannerCloseButtonProps {
    onCloseClick: () => void;
}

export function InvestigationsMomentBannerCloseButton({
    onCloseClick,
}: InvestigationsMomentBannerCloseButtonProps): JSX.Element {
    return (
        <div css={styles.container}>
            <Hide above="tablet">
                <Button
                    onClick={onCloseClick}
                    cssOverrides={styles.closeButton}
                    icon={<SvgCross />}
                    size="xsmall"
                    hideLabel
                >
                    Close
                </Button>
            </Hide>

            <Hide below="tablet">
                <div css={styles.roundelContainer}>
                    <SvgRoundelInverse />
                </div>
            </Hide>

            <Hide below="tablet">
                <div>
                    <Button
                        onClick={onCloseClick}
                        cssOverrides={styles.closeButton}
                        icon={<SvgCross />}
                        size="small"
                        hideLabel
                    >
                        Close
                    </Button>
                </div>
            </Hide>
        </div>
    );
}
