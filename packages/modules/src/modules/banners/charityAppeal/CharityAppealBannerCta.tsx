import { ThemeProvider } from '@emotion/react';
import { buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { neutral, space } from '@guardian/src-foundations';
import { isSupportUrl } from '@sdc/shared/dist/lib';

const styles = {
    ctaButton: (stacked: boolean): SerializedStyles => css`
        ${stacked ? 'margin-bottom: 0.5rem' : 'margin-right: 14px'};
    `,
    paymentMethods: css`
        display: block;
        height: 1.25rem;
        width: auto;

        ${from.tablet} {
            margin-left: ${space[4]}px;
        }
    `,
    ctaOverides: css`
        background-color: ${neutral[100]};
        color: ${'#313433'};
        &:hover {
            background-color: ${neutral[46]};
            color: ${neutral[97]};
        }
    `,
};

interface CharityAppealBannerCtaProps {
    onContributeClick: () => void;
    ctaText: string;
    ctaUrl: string;
    stacked: boolean;
}

export const CharityAppealBannerCta: React.FC<CharityAppealBannerCtaProps> = ({
    onContributeClick,
    ctaText,
    ctaUrl,
    stacked,
}: CharityAppealBannerCtaProps) => {
    const hasSupportCta = isSupportUrl(ctaUrl);
    return (
        <div>
            <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                <LinkButton
                    data-link-name="charity-appeal-banner : cta"
                    css={[styles.ctaButton(stacked), styles.ctaOverides]}
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

            {hasSupportCta && (
                <img
                    width={422}
                    height={60}
                    src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                    css={styles.paymentMethods}
                />
            )}
        </div>
    );
};
