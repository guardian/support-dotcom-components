import React from 'react';
import { SvgRoundelDefault } from '@guardian/src-brand';
import { ThemeProvider } from 'emotion-theming';
import { buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { Button } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations';

const styles = {
    roundelAndCloseButtonContainer: css`
        margin-left: 4px;
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
            margin-right: 2px;
        }
    `,
    roundel: css`
        width: 2.25rem;
        height: 2.25rem;
        fill: ${neutral[7]};
    `,
    closeButtonContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        display: block;
    `,
};

interface ContributionsCloseButtonProps {
    onCloseClick: () => void;
}

export const ContributionsBannerCloseButton: React.FC<ContributionsCloseButtonProps> = ({
    onCloseClick,
}: ContributionsCloseButtonProps) => {
    return (
        <div css={styles.roundelAndCloseButtonContainer}>
            <div css={styles.roundelContainer}>
                <div css={styles.roundel}>
                    <SvgRoundelDefault />
                </div>
            </div>
            <div css={styles.closeButtonContainer}>
                <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                    <Button
                        aria-label="Close"
                        data-link-name="contributions-banner : close"
                        priority="tertiary"
                        size="small"
                        icon={<SvgCross />}
                        nudgeIcon={false}
                        onClick={onCloseClick}
                        hideLabel={true}
                        iconSide="left"
                    >
                        Close
                    </Button>
                </ThemeProvider>
            </div>
        </div>
    );
};
