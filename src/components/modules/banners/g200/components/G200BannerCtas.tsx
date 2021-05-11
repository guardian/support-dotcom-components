import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { space } from '@guardian/src-foundations';
import { LinkButton, buttonReaderRevenue, buttonBrand } from '@guardian/src-button';
import { neutral } from '@guardian/src-foundations/palette';
import { Inline, Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import { ContributionsBannerRenderedContent } from '../../contributions/ContributionsBannerWrapper';

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

        ${from.tablet} {
            height: 20px;
        }
    }
`;

interface G200BannerCtasProps {
    mobileContent: ContributionsBannerRenderedContent | undefined;
    content: ContributionsBannerRenderedContent;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

const G200BannerCtas: React.FC<G200BannerCtasProps> = ({
    mobileContent,
    content,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
}) => {
    const mobileSecondaryCta = mobileContent?.secondaryCta
        ? mobileContent.secondaryCta
        : content.secondaryCta;
    const mobilePrimaryCta = mobileContent?.primaryCta
        ? mobileContent.primaryCta
        : content.primaryCta;

    return (
        <Inline cssOverrides={containerStyles} space={2}>
            <ThemeProvider theme={buttonBrand}>
                {mobileSecondaryCta && (
                    <Hide above="tablet">
                        <LinkButton
                            onClick={onSecondaryCtaClick}
                            href={mobileSecondaryCta.ctaUrl}
                            cssOverrides={secondaryCtaStyles}
                            priority="tertiary"
                            size="xsmall"
                        >
                            {mobileSecondaryCta.ctaText}
                        </LinkButton>
                    </Hide>
                )}

                {content.secondaryCta && (
                    <Hide below="tablet">
                        <LinkButton
                            onClick={onSecondaryCtaClick}
                            href={content.secondaryCta.ctaUrl}
                            cssOverrides={secondaryCtaStyles}
                            priority="tertiary"
                            size="small"
                        >
                            {content.secondaryCta.ctaText}
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

                    {content.primaryCta && (
                        <Hide below="tablet">
                            <LinkButton
                                onClick={onPrimaryCtaClick}
                                href={content.primaryCta.ctaUrl}
                                cssOverrides={primaryCtaStyles}
                                size="small"
                                priority="primary"
                            >
                                {content.primaryCta.ctaText}
                            </LinkButton>
                        </Hide>
                    )}
                </ThemeProvider>

                <div css={paymentIconContainerStyles}>
                    <img
                        src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                        alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                    />
                </div>
            </div>
        </Inline>
    );
};

export default G200BannerCtas;
