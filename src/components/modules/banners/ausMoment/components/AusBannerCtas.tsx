import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { LinkButton, buttonReaderRevenue, buttonBrand } from '@guardian/src-button';
import { neutral } from '@guardian/src-foundations/palette';
import { Inline, Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import { BannerTextContent } from '../../common/types';
import { SecondaryCtaType } from '../../../../../types/shared';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Link, linkBrand } from '@guardian/src-link';

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

interface AusBannerCtasProps {
    content: BannerTextContent;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

const AusBannerCtas: React.FC<AusBannerCtasProps> = ({
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
            <div>
                <ThemeProvider theme={buttonReaderRevenue}>
                    {mobilePrimaryCta && (
                        <Hide above="tablet">
                            <LinkButton
                                onClick={onPrimaryCtaClick}
                                href={mobilePrimaryCta.ctaUrl}
                                cssOverrides={primaryCtaStyles}
                                size="small"
                                priority="primary"
                                icon={<SvgArrowRightStraight />}
                                iconSide="right"
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
                                icon={<SvgArrowRightStraight />}
                                iconSide="right"
                            >
                                {content.mainContent.primaryCta.ctaText}
                            </LinkButton>
                        </Hide>
                    )}
                </ThemeProvider>
            </div>
            <ThemeProvider theme={buttonBrand}>
                {content.mainContent.secondaryCta && (
                    <Hide below="desktop">
                        <ThemeProvider theme={linkBrand}>
                            <Link
                                onClick={onSecondaryCtaClick}
                                href={secondaryCtaHref}
                                cssOverrides={secondaryCtaStyles}
                            >
                                {secondaryCtaText}
                            </Link>
                        </ThemeProvider>
                    </Hide>
                )}
            </ThemeProvider>
        </Inline>
    );
};

export default AusBannerCtas;
