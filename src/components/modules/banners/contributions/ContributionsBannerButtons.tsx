import { SvgRoundel } from '@guardian/src-brand';
import { ThemeProvider } from 'emotion-theming';
import { buttonReaderRevenueBrandAlt } from '@guardian/src-button/themes';
import { Button, LinkButton } from '@guardian/src-button/index';
import { SvgArrowRightStraight, SvgCross } from '@guardian/src-icons';
import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations';

const styles = {
    buttonsAndIcons: css`
        display: flex;
        flex-direction: column;
        height: 100%;
    `,
    rightButtons: css`
        margin-left: 4px;
        display: flex;
        flex-direction: row;
        white-space: nowrap;
        justify-content: flex-end;

        flex-grow: 1;
    `,
    rightRoundel: css`
        display: none;
        ${from.tablet} {
            display: block;
            margin-right: 2px;
        }
    `,
    roundelContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        fill: ${neutral[7]};
    `,
    closeButtonContainer: css`
        width: 2.25rem;
        height: 2.25rem;
        display: block;
    `,
    ctaButton: css`
        margin-bottom: 0.5rem;
    `,
    cta: css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        ${from.tablet} {
            width: auto;
            justify-content: flex-start;
            flex-direction: column;
        }
    `,
    paymentMethods: css`
        display: block;
        max-height: 1.25rem;
    `,
};

interface ContributionsCloseButtonProps {
    onCloseClick: () => void;
}

export const ContributionsBannerCloseButton: React.FC<ContributionsCloseButtonProps> = ({
    onCloseClick,
}: ContributionsCloseButtonProps) => {
    return (
        <div css={styles.rightButtons}>
            <div css={styles.rightRoundel}>
                <div css={styles.roundelContainer}>
                    <SvgRoundel />
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

interface ContributionsBannerCtaProps {
    onContributeClick: () => void;
    ctaText: string;
    ctaUrl: string;
}

export const ContributionsBannerCta: React.FC<ContributionsBannerCtaProps> = ({
    onContributeClick,
    ctaText,
    ctaUrl,
}: ContributionsBannerCtaProps) => {
    return (
        <div css={styles.cta}>
            <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                <LinkButton
                    data-link-name="contributions-banner : cta"
                    css={styles.ctaButton}
                    priority="primary"
                    size="small"
                    icon={<SvgArrowRightStraight />}
                    iconSide="right"
                    nudgeIcon={true}
                    onClick={onContributeClick}
                    hideLabel={false}
                    aria-label="Contribute"
                    href={ctaUrl}
                >
                    {ctaText}
                </LinkButton>
            </ThemeProvider>
            <img
                src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                css={styles.paymentMethods}
            />
        </div>
    );
};
