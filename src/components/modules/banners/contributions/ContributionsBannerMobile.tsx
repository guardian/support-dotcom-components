import React from 'react';
import { styles } from './ContributionsBannerStyles';
import { css } from '@emotion/core';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import {
    ContributionsBannerCloseButton,
    ContributionsBannerCta,
} from './ContributionsBannerButtons';

const mobileStyles = {
    container: css`
        ${from.tablet} {
            display: none;
        }
        margin: 0 12px;
    `,
    heading: css`
        ${headline.xsmall({ fontWeight: 'bold' })};
    `,
    copy: css`
        margin-top: 2px;
    `,
    ctaContainer: css`
        *:first-child {
            margin-right: 5px;
        }
        margin-top: 20px;
        padding-bottom: 20px;
    `,
    headingContainer: css`
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid ${neutral[7]};
        padding: 6px 5px 10px 0;
    `,
};

interface ContributionsBannerMobileProps {
    onContributeClick: () => void;
    onCloseClick: () => void;
    messageText: JSX.Element[];
    highlightedText: JSX.Element[] | null;
    heading: JSX.Element[] | null;
    ctaUrl: string;
    ctaText: string;
}

export const ContributionsBannerMobile: React.FC<ContributionsBannerMobileProps> = ({
    onContributeClick,
    onCloseClick,
    highlightedText,
    messageText,
    heading,
    ctaUrl,
    ctaText,
}: ContributionsBannerMobileProps) => {
    return (
        <div css={mobileStyles.container}>
            <div css={mobileStyles.headingContainer}>
                <div css={mobileStyles.heading}>{heading}</div>
                <ContributionsBannerCloseButton onCloseClick={onCloseClick} />
            </div>
            <div css={[styles.copy, mobileStyles.copy]}>
                {messageText}
                {highlightedText && (
                    <>
                        {' '}
                        <span css={styles.highlightedText}>{highlightedText}</span>
                    </>
                )}
            </div>

            <div css={mobileStyles.ctaContainer}>
                <ContributionsBannerCta
                    onContributeClick={onContributeClick}
                    ctaText={ctaText}
                    ctaUrl={ctaUrl}
                />
            </div>
        </div>
    );
};
