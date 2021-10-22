import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import { BannerEnrichedCta, BannerEnrichedSecondaryCta } from '../../common/types';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BLUE_HEX, GREEN_HEX } from '../utils/constants';

const container = css`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    & > * + * {
        margin-left: ${space[3]}px;
    }
`;

const primaryButton = css`
    color: ${neutral[100]};
    background-color: ${GREEN_HEX};

    &:hover {
        background-color: ${BLUE_HEX};
    }
`;

const secondaryButton = css`
    color: ${GREEN_HEX};
    background-color: ${neutral[97]};
    border: 1px solid ${GREEN_HEX};

    &:hover {
        color: ${neutral[100]};
        background-color: ${BLUE_HEX};
        border: 1px solid ${BLUE_HEX};
    }
`;

interface BreakpointCtas {
    primary: BannerEnrichedCta | null;
    secondary: BannerEnrichedSecondaryCta | null;
}

interface EnvironmentMomentBannerCtasProps {
    mobileCtas: BreakpointCtas | null;
    desktopCtas: BreakpointCtas;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

interface CtaProps {
    size: 'small' | 'default';
    ctas: BreakpointCtas;
}

export const EnvironmentMomentBannerCtas: React.FC<EnvironmentMomentBannerCtasProps> = ({
    desktopCtas,
    mobileCtas: maybeMobileCtas,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
}: EnvironmentMomentBannerCtasProps) => {
    const mobileCtas = maybeMobileCtas ?? desktopCtas;

    const PrimaryCta: React.FC<CtaProps> = ({ size, ctas }: CtaProps) => (
        <>
            {ctas.primary && (
                <LinkButton
                    onClick={onPrimaryCtaClick}
                    cssOverrides={primaryButton}
                    size={size}
                    href={ctas.primary.ctaUrl}
                >
                    {ctas.primary.ctaText}
                </LinkButton>
            )}
        </>
    );

    const SecondaryCta: React.FC<CtaProps> = ({ size, ctas }: CtaProps) => (
        <>
            {ctas.secondary && ctas.secondary.type === SecondaryCtaType.Custom && (
                <LinkButton
                    onClick={onSecondaryCtaClick}
                    cssOverrides={secondaryButton}
                    size={size}
                    href={ctas.secondary.cta.ctaUrl}
                    priority="tertiary"
                >
                    {ctas.secondary.cta.ctaText}
                </LinkButton>
            )}
        </>
    );

    return (
        <div>
            <Hide above="tablet">
                <div css={container}>
                    <PrimaryCta size="small" ctas={mobileCtas} />
                    <SecondaryCta size="small" ctas={mobileCtas} />
                </div>
            </Hide>
            <Hide below="tablet">
                <div css={container}>
                    <PrimaryCta size="default" ctas={desktopCtas} />
                    <SecondaryCta size="default" ctas={desktopCtas} />
                </div>
            </Hide>
        </div>
    );
};
