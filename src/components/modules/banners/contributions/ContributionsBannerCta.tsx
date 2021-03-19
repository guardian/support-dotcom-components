import { ThemeProvider } from 'emotion-theming';
import { buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const styles = {
    ctaButton: (stacked: boolean): SerializedStyles => css`
        ${stacked ? 'margin-bottom: 0.5rem' : 'margin-right: 14px'};
    `,
    cta: (stacked: boolean): SerializedStyles => css`
        display: flex;
        flex-direction: ${stacked ? 'column' : 'row'};
        align-items: ${stacked ? 'flex-start' : 'center'};
        ${from.tablet} {
            width: auto;
            justify-content: flex-start;
        }
    `,
    paymentMethods: css`
        margin-left: ${space[4]}px;
        display: block;
        max-height: 1.25rem;
    `,
};

interface ContributionsBannerCtaProps {
    onContributeClick: () => void;
    ctaText: string;
    ctaUrl: string;
    stacked: boolean;
}

export const ContributionsBannerCta: React.FC<ContributionsBannerCtaProps> = ({
    onContributeClick,
    ctaText,
    ctaUrl,
    stacked,
}: ContributionsBannerCtaProps) => {
    return (
        <div css={styles.cta(stacked)}>
            <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                <LinkButton
                    data-link-name="contributions-banner : cta"
                    css={styles.ctaButton(stacked)}
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
