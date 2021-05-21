import React from 'react';
import { commonStyles } from './ContributionsBannerCommonStyles';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { ContributionsBannerCta } from './ContributionsBannerCta';
import { ContributionsBannerSecondaryCta } from './ContributionsBannerSecondaryCta';
import { ContributionsBannerCloseButton } from './ContributionsBannerCloseButton';
import { ContributionsBannerRenderedContent } from './ContributionsBannerWrapper';

const styles = {
    container: css`
        ${from.tablet} {
            display: none;
        }
        margin: 0 12px;
        padding-bottom: 20px;
    `,
    heading: css`
        ${headline.xsmall({ fontWeight: 'bold' })};
        max-width: 90%; /* to avoid pushing the close button off screen on mobile devices with extra large font */
    `,
    copy: css`
        margin-top: 2px;
    `,
    ctasContainer: css`
        & > * + * {
            margin-top: ${space[3]}px;
        }
    `,
    ctaContainer: css`
        > :first-child {
            margin-right: 5px;
        }
        margin-top: 20px;
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
    onSecondaryCtaClick: () => void;
    onCloseClick: () => void;
    content: ContributionsBannerRenderedContent;
}

export const ContributionsBannerMobile: React.FC<ContributionsBannerMobileProps> = ({
    onContributeClick,
    onSecondaryCtaClick,
    onCloseClick,
    content,
}: ContributionsBannerMobileProps) => {
    return (
        <div css={styles.container}>
            <div css={styles.headingContainer}>
                <div css={styles.heading}>{content.heading}</div>
                <ContributionsBannerCloseButton onCloseClick={onCloseClick} />
            </div>
            <div css={[commonStyles.copy, styles.copy]}>
                {content.messageText}
                {content.highlightedText && (
                    <>
                        {' '}
                        <span css={commonStyles.highlightedText}>{content.highlightedText}</span>
                    </>
                )}
            </div>

            <div css={styles.ctasContainer}>
                {content.primaryCta && (
                    <div css={styles.ctaContainer}>
                        <ContributionsBannerCta
                            onContributeClick={onContributeClick}
                            ctaText={content.primaryCta.ctaText}
                            ctaUrl={content.primaryCta.ctaUrl}
                            stacked={true}
                        />
                    </div>
                )}

                {content.secondaryCta && (
                    <ContributionsBannerSecondaryCta
                        onCtaClick={onSecondaryCtaClick}
                        ctaText={content.secondaryCta.ctaText}
                        ctaUrl={content.secondaryCta.ctaUrl}
                    />
                )}
            </div>
        </div>
    );
};
