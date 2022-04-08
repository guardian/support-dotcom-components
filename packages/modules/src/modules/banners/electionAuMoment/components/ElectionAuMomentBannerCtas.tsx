import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import { BannerEnrichedCta } from '../../common/types';
import { brandAltBackground } from '@guardian/src-foundations/palette';

const styles = {
    container: css`
        display: flex;
        flex-direction: row;

        & > * + * {
            margin-left: ${space[3]}px;
        }
    `,

    primaryCta: css`
        background-color: ${brandAltBackground.ctaPrimary};
        color: white;
        margin-right: ${space[1]}px;

        &:hover {
            background-color: ${brandAltBackground.ctaPrimaryHover};
            color: white;
        }
    `,

    secondaryCta: css`
        color: ${brandAltBackground.ctaPrimary};
    `,
};

interface BreakpointCtas {
    primary: BannerEnrichedCta | null;
    secondary: BannerEnrichedSecondaryCta | null;
}

interface ElectionAuMomentBannerCtasProps {
    mobileCtas: BreakpointCtas | null;
    desktopCtas: BreakpointCtas;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

export function ElectionAuMomentBannerCtas({
    desktopCtas,
    mobileCtas: maybeMobileCtas,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
}: ElectionAuMomentBannerCtasProps): JSX.Element {
    const mobileCtas = maybeMobileCtas ?? desktopCtas;

    return (
        <div css={styles.container}>
            <div>
                {mobileCtas.primary && (
                    <>
                        <Hide above="tablet">
                            <LinkButton
                                href={mobileCtas.primary.ctaUrl}
                                onClick={onPrimaryCtaClick}
                                size="xsmall"
                                priority="primary"
                                cssOverrides={styles.primaryCta}
                            >
                                {mobileCtas.primary.ctaText}
                            </LinkButton>
                        </Hide>
                        <Hide above="tablet">
                            <LinkButton
                                href={mobileCtas.secondary.cta.ctaUrl}
                                onClick={onSecondaryCtaClick}
                                size="xsmall"
                                priority="tertiary"
                                cssOverrides={styles.secondaryCta}
                            >
                                {mobileCtas.secondary.cta.ctaText}
                            </LinkButton>
                        </Hide>
                    </>
                )}

                {desktopCtas.primary && (
                    <Hide below="tablet">
                        <LinkButton
                            href={desktopCtas.primary.ctaUrl}
                            onClick={onPrimaryCtaClick}
                            size="small"
                            priority="primary"
                            cssOverrides={styles.primaryCta}
                        >
                            {desktopCtas.primary.ctaText}
                        </LinkButton>
                    </Hide>
                )}
            </div>

            <div>
                {desktopCtas.secondary && (
                    <Hide below="tablet">
                        <LinkButton
                            href={desktopCtas.secondary.cta.ctaUrl}
                            onClick={onSecondaryCtaClick}
                            size="small"
                            priority="tertiary"
                            cssOverrides={styles.secondaryCta}
                        >
                            {desktopCtas.secondary.cta.ctaText}
                        </LinkButton>
                    </Hide>
                )}
            </div>
        </div>
    );
}
