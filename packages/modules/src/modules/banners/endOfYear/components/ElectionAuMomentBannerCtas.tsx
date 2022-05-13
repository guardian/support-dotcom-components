import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerEnrichedCta, BannerEnrichedSecondaryCta } from '../../common/types';
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
    ctaWithPaymentMethods: css`
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        margin-right: ${space[2]}px;

        ${from.tablet} {
            margin-right: 0;
        }
    `,
    paymentMethods: css`
        display: block;
        height: 1.1rem;
        width: auto;
        margin-top: ${space[2]}px;
        margin-left: ${space[1]}px;

        ${from.tablet} {
            margin-left: ${space[2]}px;
            height: 1.25rem;
        }
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

const PaymentCards = () => (
    <img
        width={422}
        height={60}
        src="https://media.guim.co.uk/3deab000beec83c65a2893c4d4fc9f3c700c900c/0_0_135_21/135.png"
        alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
        css={styles.paymentMethods}
    />
);

interface ButtonProps {
    ctaText: string;
    ctaUrl: string;
    onClick: () => void;
}

const PrimaryButton = ({ ctaText, ctaUrl, onClick }: ButtonProps) => (
    <div css={styles.ctaWithPaymentMethods}>
        <LinkButton
            href={ctaUrl}
            onClick={onClick}
            size="small"
            priority="primary"
            cssOverrides={styles.primaryCta}
        >
            {ctaText}
        </LinkButton>
        <PaymentCards />
    </div>
);

const SecondaryButton = ({ ctaText, ctaUrl, onClick }: ButtonProps) => (
    <LinkButton
        href={ctaUrl}
        onClick={onClick}
        size="small"
        priority="tertiary"
        cssOverrides={styles.secondaryCta}
    >
        {ctaText}
    </LinkButton>
);

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
                    <Hide above="tablet">
                        <PrimaryButton
                            ctaText={mobileCtas.primary.ctaText}
                            ctaUrl={mobileCtas.primary.ctaUrl}
                            onClick={onPrimaryCtaClick}
                        />
                        {mobileCtas.secondary?.type === SecondaryCtaType.Custom && (
                            <SecondaryButton
                                ctaText={mobileCtas.secondary.cta.ctaText}
                                ctaUrl={mobileCtas.secondary.cta.ctaUrl}
                                onClick={onSecondaryCtaClick}
                            />
                        )}
                    </Hide>
                )}

                {desktopCtas.primary && (
                    <Hide below="tablet">
                        <PrimaryButton
                            ctaText={desktopCtas.primary.ctaText}
                            ctaUrl={desktopCtas.primary.ctaUrl}
                            onClick={onPrimaryCtaClick}
                        />
                    </Hide>
                )}
            </div>

            <div>
                {desktopCtas.secondary?.type === SecondaryCtaType.Custom && (
                    <Hide below="tablet">
                        <SecondaryButton
                            ctaText={desktopCtas.secondary.cta.ctaText}
                            ctaUrl={desktopCtas.secondary.cta.ctaUrl}
                            onClick={onSecondaryCtaClick}
                        />
                    </Hide>
                )}
            </div>
        </div>
    );
}
