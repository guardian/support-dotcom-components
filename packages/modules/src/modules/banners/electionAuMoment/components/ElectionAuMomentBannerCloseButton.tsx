import React from 'react';
import { css } from '@emotion/react';
import { SvgCross } from '@guardian/src-icons';
import { SvgRoundelDefault } from '@guardian/src-brand';
import { ThemeProvider } from '@emotion/react';
import { Button, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { neutral } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const styles = {
    container: css`
        display: flex;
    `,
    closeButton: css`
        background-color: #e4e4e3;
        color: ${neutral[0]};
        border: 1px solid ${neutral[0]};

        &:hover {
            background-color: white;
        }
        ${from.tablet} {
            padding: 0;
            width: 1.75rem;
            height: 1.75rem;
        }
    `,
    roundelAndCloseButtonContainer: css`
        margin-left: ${space[1]}px;
        display: flex;
        flex-direction: row;
        white-space: nowrap;
        justify-content: flex-end;
        flex-grow: 1;
    `,
    roundelContainer: css`
        display: none;
        ${from.tablet} {
            display: block;
            margin-right: ${space[1]}px;
        }
    `,
    roundel: css`
        width: 1.75rem;
        height: 1.75rem;
        fill: ${neutral[7]};
    `,
};

interface ElectionAuMomentBannerCloseButtonProps {
    onCloseClick: () => void;
}

const CloseButton = ({ onCloseClick }: ElectionAuMomentBannerCloseButtonProps) => (
    <Button
        aria-label="Close"
        data-link-name="contributions-banner : close"
        priority="tertiary"
        size="xsmall"
        icon={<SvgCross />}
        cssOverrides={styles.closeButton}
        onClick={onCloseClick}
        hideLabel
    >
        Close
    </Button>
);

export function ElectionAuMomentBannerCloseButton({
    onCloseClick,
}: ElectionAuMomentBannerCloseButtonProps): JSX.Element {
    return (
        <>
            <Hide above="tablet">
                <CloseButton onCloseClick={onCloseClick} />
            </Hide>
            <Hide below="tablet">
                <div css={styles.roundelAndCloseButtonContainer}>
                    <div css={styles.roundelContainer}>
                        <div css={styles.roundel}>
                            <SvgRoundelDefault />
                        </div>
                    </div>
                    <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                        <CloseButton onCloseClick={onCloseClick} />
                    </ThemeProvider>
                </div>
            </Hide>
        </>
    );
}
