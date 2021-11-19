import React from 'react';
import { css } from '@emotion/react';
import { brand, neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { SvgRoundelBrand } from '@guardian/src-brand';

const styles = {
    container: css`
        display: flex;
    `,
    roundelContainer: css`
        height: 36px;
        width: 36px;
        margin-right: ${space[1]}px;

        svg {
            display: block;
        }
    `,
    closeButton: css`
        background-color: ${brand[400]};
        color: ${neutral[100]};

        &:hover {
            background-color: ${neutral[0]};
            color: ${neutral[100]};
        }

        ${from.tablet} {
            &:hover {
                background-color: #234b8a;
            }
        }
    `,
};

interface InvestigationsMomentBannerCloseButtonProps {
    onCloseClick: () => void;
}

export function UsEoyMomentBannerCloseButton({
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
                    <SvgRoundelBrand />
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
