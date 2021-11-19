import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerEnrichedCta, BannerEnrichedSecondaryCta } from '../../common/types';
import { SvgArrowRightStraight } from '@guardian/src-icons';

const styles = {
    container: css`
        display: flex;
        flex-direction: row;

        & > * + * {
            margin-left: ${space[3]}px;
        }
    `,
};

interface BreakpointCtas {
    primary: BannerEnrichedCta | null;
    secondary: BannerEnrichedSecondaryCta | null;
}

interface UsEoyMomentBannerCtasProps {
    mobileCtas: BreakpointCtas | null;
    desktopCtas: BreakpointCtas;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

export function UsEoyMomentBannerCtas({
    desktopCtas,
    mobileCtas: maybeMobileCtas,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
}: UsEoyMomentBannerCtasProps): JSX.Element {
    const mobileCtas = maybeMobileCtas ?? desktopCtas;

    return (
        <div css={styles.container}>
            <div>
                {mobileCtas.primary && (
                    <Hide above="tablet">
                        <LinkButton
                            href={mobileCtas.primary.ctaUrl}
                            onClick={onPrimaryCtaClick}
                            size="small"
                            priority="primary"
                            icon={<SvgArrowRightStraight />}
                            iconSide="right"
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
                            size="small"
                            priority="primary"
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
                            size="small"
                            priority="tertiary"
                        >
                            {desktopCtas.secondary.cta.ctaText}
                        </LinkButton>
                    </Hide>
                )}
            </div>
        </div>
    );
}
