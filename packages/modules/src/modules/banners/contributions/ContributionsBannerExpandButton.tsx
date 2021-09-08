import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { LinkButton } from '@guardian/src-button';
import { css } from '@emotion/react';
import { SvgChevronDownSingle, SvgChevronUpSingle } from '@guardian/src-icons';

const styles = {
    expandButtonContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        display: block;
    `,
    expandButtonStyles: css`
        font-size: 12px;
    `,
};

interface ContributionsBannerExpandProps {
    onExpandClick: () => void;
}

interface ContributionsBannerCollapseProps {
    onCollapseClick: () => void;
}

export const ContributionsBannerExpandButton: React.FC<ContributionsBannerExpandProps> = ({
    onExpandClick,
}: ContributionsBannerExpandProps) => {
    return (
        <div css={styles.expandButtonContainer}>
            <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                <LinkButton
                    aria-label="Expand"
                    data-link-name="contributions-banner : open"
                    priority="subdued"
                    size="xsmall"
                    onClick={onExpandClick}
                    icon={<SvgChevronDownSingle />}
                    cssOverrides={styles.expandButtonStyles}
                >
                    CHECK OUT
                </LinkButton>
            </ThemeProvider>
        </div>
    );
};

export const ContributionsBannerCollapseButton: React.FC<ContributionsBannerCollapseProps> = ({
    onCollapseClick,
}: ContributionsBannerCollapseProps) => {
    return (
        <div css={styles.expandButtonContainer}>
            <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                <LinkButton
                    aria-label="Expand"
                    data-link-name="contributions-banner : open"
                    priority="subdued"
                    size="xsmall"
                    onClick={onCollapseClick}
                    icon={<SvgChevronUpSingle />}
                    cssOverrides={styles.expandButtonStyles}
                >
                    COLLAPSE
                </LinkButton>
            </ThemeProvider>
        </div>
    );
};
