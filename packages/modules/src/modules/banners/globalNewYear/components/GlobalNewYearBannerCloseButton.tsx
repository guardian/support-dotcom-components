import React from 'react';
import { css } from '@emotion/react';
import { brand } from '@guardian/src-foundations';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';

const styles = {
    container: css`
        display: flex;
    `,
    closeButton: css`
        background-color: #f79e1b;
        color: ${brand[400]};
        border: 1px solid ${brand[400]};

        &:hover {
            background-color: white;
        }
    `,
};

interface GlobalNewYearBannerCloseButtonProps {
    onCloseClick: () => void;
}

export function GlobalNewYearBannerCloseButton({
    onCloseClick,
}: GlobalNewYearBannerCloseButtonProps): JSX.Element {
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
