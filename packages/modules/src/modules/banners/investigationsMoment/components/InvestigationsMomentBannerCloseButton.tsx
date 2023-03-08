import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
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
        margin-right: 8px;

        svg {
            display: block;
        }
    `,
    closeButton: css`
        border: 1px solid ${neutral[100]};
        background-color: ${neutral[0]};
        color: ${neutral[100]};

        &:hover {
            background-color: ${neutral[100]};
            color: ${neutral[0]};
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
            <Hide below="tablet">
                <div css={styles.roundelContainer}>
                    <SvgRoundelInverse />
                </div>
            </Hide>

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
        </div>
    );
}
