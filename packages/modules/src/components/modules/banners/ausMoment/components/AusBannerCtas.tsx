import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { LinkButton, buttonReaderRevenue, buttonBrand } from '@guardian/src-button';
import { neutral } from '@guardian/src-foundations/palette';
import { Inline, Hide } from '@guardian/src-layout';
import { BannerTextContent } from '../../common/types';
import { SecondaryCtaType } from '../../../../../types/shared';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Link, linkBrand } from '@guardian/src-link';
import { between } from '@guardian/src-foundations/mq';

const containerStyles = css`
    > * {
        margin-bottom: 0;

        ${between.tablet.and.desktop} {
            margin-bottom: ${space[2]}px;
        }
    }
    align-items: center;
`;

const primaryCtaStyles = css`
    color: ${neutral[0]};

    &:hover {
        background-color: #04ffff;
    }
`;

const secondaryCtaStyles = css`
    margin-left: ${space[12]}px;

    &:hover {
        border-color: ${neutral[0]};
        color: #04ffff;
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
