import React from 'react';
import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerRenderedContent } from '../../common/types';
import { PaymentCards } from '../../common/PaymentCards';
import { buttonStyles } from '../styles/buttonStyles';
import { CtaSettings } from '../settings';
import { isSupportUrl } from '@sdc/shared/dist/lib';

interface DesignableBannerCtasProps {
    mainOrMobileContent: BannerRenderedContent;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
}

export function DesignableBannerCtas({
    mainOrMobileContent,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
    primaryCtaSettings,
    secondaryCtaSettings,
}: DesignableBannerCtasProps): JSX.Element {
    const { primaryCta, secondaryCta } = mainOrMobileContent;
    const hasSupportCta = primaryCta ? isSupportUrl(primaryCta.ctaUrl) : false;

    return (
        <div css={styles.container}>
            {primaryCta && (
                <LinkButton
                    href={primaryCta?.ctaUrl}
                    onClick={onPrimaryCtaClick}
                    size="small"
                    priority="primary"
                    cssOverrides={buttonStyles(primaryCtaSettings)}
                >
                    {primaryCta?.ctaText}
                </LinkButton>
            )}
            {secondaryCta?.type === SecondaryCtaType.Custom && (
                <LinkButton
                    href={secondaryCta?.cta.ctaUrl}
                    onClick={onSecondaryCtaClick}
                    size="small"
                    priority="tertiary"
                    cssOverrides={buttonStyles(secondaryCtaSettings)}
                >
                    {secondaryCta.cta.ctaText}
                </LinkButton>
            )}

            {primaryCta && hasSupportCta && <PaymentCards />}
        </div>
    );
}

const styles = {
    container: css`
        display: flex;
        flex-wrap: wrap;
        gap: ${space[4]}px;
        justify-content: center;

        > a {
            flex: 1 0 100%;
            justify-content: center;

            ${from.tablet} {
                flex: 0 1 auto;
            }
        }

        ${from.tablet} {
            justify-content: start;
        }
    `,
};
