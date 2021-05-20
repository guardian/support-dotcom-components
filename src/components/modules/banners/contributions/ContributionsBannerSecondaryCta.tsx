import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';

interface ContributionsBannerSecondaryCtaProps {
    onCtaClick: () => void;
    ctaText: string;
    ctaUrl: string;
}

export const ContributionsBannerSecondaryCta: React.FC<ContributionsBannerSecondaryCtaProps> = ({
    onCtaClick,
    ctaText,
    ctaUrl,
}: ContributionsBannerSecondaryCtaProps) => {
    return (
        <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
            <LinkButton
                priority="tertiary"
                size="small"
                icon={<SvgArrowRightStraight />}
                iconSide="right"
                nudgeIcon={true}
                onClick={onCtaClick}
                href={ctaUrl}
            >
                {ctaText}
            </LinkButton>
        </ThemeProvider>
    );
};
