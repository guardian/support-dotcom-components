import { ThemeProvider } from '@emotion/react';
import { buttonThemeReaderRevenueBrandAlt } from '@guardian/source-react-components';
import { LinkButton } from '@guardian/source-react-components';
import { SvgArrowRightStraight } from '@guardian/source-react-components';
import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { space } from '@guardian/source-foundations';
import { isSupportUrl } from '@sdc/shared/dist/lib';
import type { ReactComponent } from '../../../types';

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
};

interface ContributionsBannerCtaProps {
    onContributeClick: () => void;
    ctaText: string;
    ctaUrl: string;
    stacked: boolean;
}

export const ContributionsBannerCta: ReactComponent<ContributionsBannerCtaProps> = ({
    onContributeClick,
    ctaText,
    ctaUrl,
    stacked,
}: ContributionsBannerCtaProps) => {
    const hasSupportCta = isSupportUrl(ctaUrl);
    return (
        <div>
            <ThemeProvider theme={buttonThemeReaderRevenueBrandAlt}>
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
