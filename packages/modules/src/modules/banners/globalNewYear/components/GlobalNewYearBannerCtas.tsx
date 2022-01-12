import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerEnrichedCta, BannerEnrichedSecondaryCta } from '../../common/types';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { neutral } from '@guardian/src-foundations/palette';

const styles = {
    container: css`
        display: flex;
        flex-direction: row;

        & > * + * {
            margin-left: ${space[3]}px;
        }
    `,

    primaryCta: css`
        background-color: #007abc;
        color: white;

        &:hover {
            background-color: white;
            color: #007abc;
        }
    `,

    tertiaryCta: css`
        background-color: #f79e1b;
        color: ${neutral[0]};
        border: 1px solid ${neutral[0]};

        &:hover {
            background-color: white;
        }
    `,
};

interface BreakpointCtas {
    primary: BannerEnrichedCta | null;
    secondary: BannerEnrichedSecondaryCta | null;
}

interface GlobalNewYearBannerCtasProps {
    mobileCtas: BreakpointCtas | null;
    desktopCtas: BreakpointCtas;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

export function GlobalNewYearBannerCtas({
    desktopCtas,
    mobileCtas: maybeMobileCtas,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
}: GlobalNewYearBannerCtasProps): JSX.Element {
    const mobileCtas = maybeMobileCtas ?? desktopCtas;

    return (
        <div css={styles.container}>
            <div>
                {mobileCtas.primary && (
                    <Hide above="tablet">
                        <LinkButton
                            href={mobileCtas.primary.ctaUrl}
                            onClick={onPrimaryCtaClick}
                            size="default"
                            priority="primary"
                            icon={<SvgArrowRightStraight />}
                            iconSide="right"
                            cssOverrides={styles.primaryCta}
                        >
                            {mobileCtas.primary.ctaText}
                        </LinkButton>
                    </Hide>
                )}

                {desktopCtas.primary && (
                    <Hide below="tablet">
                        <LinkButton
                            href={desktopCtas.primary.ctaUrl}
                            onClick={onPrimaryCtaClick}
                            size="default"
                            priority="primary"
                            cssOverrides={styles.primaryCta}
                        >
                            {desktopCtas.primary.ctaText}
                        </LinkButton>
                    </Hide>
                )}
            </div>

            <div>
                {desktopCtas.secondary?.type === SecondaryCtaType.Custom && (
                    <Hide below="tablet">
                        <LinkButton
                            href={desktopCtas.secondary.cta.ctaUrl}
                            onClick={onSecondaryCtaClick}
                            size="default"
                            priority="tertiary"
                            cssOverrides={styles.tertiaryCta}
                        >
                            {desktopCtas.secondary.cta.ctaText}
                        </LinkButton>
                    </Hide>
                )}
            </div>
        </div>
    );
}
