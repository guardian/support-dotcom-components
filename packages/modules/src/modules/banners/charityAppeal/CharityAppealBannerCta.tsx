import { ThemeProvider } from '@emotion/react';
import { buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, space } from '@guardian/src-foundations';
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
    ctaOverides: (
        foreColor: string,
        backColor: string,
        hoverColor: string,
    ): SerializedStyles => css`
        background-color: ${backColor};
        color: ${foreColor};
        &:hover {
            background-color: ${hoverColor};
        }
    `,
};

interface CharityAppealBannerCtaProps {
    onContributeClick: () => void;
    ctaText: string;
    ctaUrl: string;
    stacked: boolean;
}

export const CharityAppealBannerCta: ReactComponent<CharityAppealBannerCtaProps> = ({
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
                    css={[
                        styles.ctaButton(stacked),
                        styles.ctaOverides('#313433', brandAlt[400], brandAlt[200]),
                    ]}
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
