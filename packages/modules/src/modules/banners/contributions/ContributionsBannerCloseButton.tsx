import React from 'react';
import { SvgRoundelDefault } from '@guardian/source-react-components';
import { ThemeProvider } from '@emotion/react';
import { buttonReaderRevenueBrandAlt } from '@guardian/source-react-components';
import { Button } from '@guardian/source-react-components';
import { SvgCross } from '@guardian/source-react-components';
import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { neutral } from '@guardian/source-foundations';
import type { ReactComponent } from '../../../types';

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

export const ContributionsBannerCloseButton: ReactComponent<ContributionsCloseButtonProps> = ({
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
