import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { LinkButton, buttonReaderRevenue, buttonBrand } from '@guardian/src-button';
import { neutral } from '@guardian/src-foundations/palette';
import { Inline, Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import { BannerTextContent } from '../../common/types';
import { SecondaryCtaType } from '@sdc/shared/types';

const containerStyles = css`
    > * {
        margin-bottom: 0;
    }
`;

const primaryCtaStyles = css`
    color: ${neutral[0]};

    &:hover {
        color: ${neutral[100]};
        background-color: ${neutral[0]};
    }
`;

const secondaryCtaStyles = css`
    &:hover {
        background-color: ${neutral[0]};
        border-color: ${neutral[0]};
    }
`;

const paymentIconContainerStyles = css`
    margin-top: ${space[2]}px;
    margin-left: ${space[3]}px;

    ${from.tablet} {
        margin-left: ${space[4]}px;
    }

    img {
        display: block;
        height: 12px;
        width: auto;

        ${from.tablet} {
            height: 20px;
        }
    }
`;

interface G200BannerCtasProps {
    content: BannerTextContent;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

const G200BannerCtas: React.FC<G200BannerCtasProps> = ({
    content,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
}) => {
    const mobileSecondaryCta =
        content.mobileContent?.secondaryCta ?? content.mainContent.secondaryCta;
    const mobilePrimaryCta = content.mobileContent?.primaryCta ?? content.mainContent.primaryCta;

    const secondaryCtaHref =
        mobileSecondaryCta?.type === SecondaryCtaType.Custom
            ? mobileSecondaryCta.cta.ctaUrl
            : undefined;

    const secondaryCtaText =
        mobileSecondaryCta?.type === SecondaryCtaType.Custom
            ? mobileSecondaryCta.cta.ctaText
            : undefined;

    return (
        <Inline cssOverrides={containerStyles} space={2}>
            <ThemeProvider theme={buttonBrand}>
                {mobileSecondaryCta && (
                    <Hide above="tablet">
                        <LinkButton
                            onClick={onSecondaryCtaClick}
                            href={secondaryCtaHref}
                            cssOverrides={secondaryCtaStyles}
                            priority="tertiary"
                            size="xsmall"
                        >
                            {secondaryCtaText}
                        </LinkButton>
                    </Hide>
                )}

                {content.mainContent.secondaryCta && (
                    <Hide below="tablet">
                        <LinkButton
                            onClick={onSecondaryCtaClick}
                            href={secondaryCtaHref}
                            cssOverrides={secondaryCtaStyles}
                            priority="tertiary"
                            size="small"
                        >
                            {secondaryCtaText}
                        </LinkButton>
                    </Hide>
                )}
            </ThemeProvider>

            <div>
                <ThemeProvider theme={buttonReaderRevenue}>
                    {mobilePrimaryCta && (
                        <Hide above="tablet">
                            <LinkButton
                                onClick={onPrimaryCtaClick}
                                href={mobilePrimaryCta.ctaUrl}
                                cssOverrides={primaryCtaStyles}
                                size="xsmall"
                                priority="primary"
                            >
                                {mobilePrimaryCta.ctaText}
                            </LinkButton>
                        </Hide>
                    )}

                    {content.mainContent.primaryCta && (
                        <Hide below="tablet">
                            <LinkButton
                                onClick={onPrimaryCtaClick}
                                href={content.mainContent.primaryCta.ctaUrl}
                                cssOverrides={primaryCtaStyles}
                                size="small"
                                priority="primary"
                            >
                                {content.mainContent.primaryCta.ctaText}
                            </LinkButton>
                        </Hide>
                    )}
                </ThemeProvider>

                <div css={paymentIconContainerStyles}>
                    <img
                        width={422}
                        height={60}
                        src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                        alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                    />
                </div>
            </div>
        </Inline>
    );
};

export default G200BannerCtas;
