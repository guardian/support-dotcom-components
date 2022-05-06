import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerEnrichedCta, BannerEnrichedSecondaryCta } from '../../common/types';
import { buttonStyles } from '../buttonStyles';
import { CtaSettings } from '../settings';
import { from } from '@guardian/src-foundations/mq';

// ---- Component ---- //

interface BreakpointCtas {
    primary: BannerEnrichedCta | null;
    secondary: BannerEnrichedSecondaryCta | null;
}

interface MomentTemplateBannerCtasProps {
    mobileCtas: BreakpointCtas | null;
    desktopCtas: BreakpointCtas;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
}

export function MomentTemplateBannerCtas({
    desktopCtas,
    mobileCtas: maybeMobileCtas,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
    primaryCtaSettings,
    secondaryCtaSettings,
}: MomentTemplateBannerCtasProps): JSX.Element {
    const mobileCtas = maybeMobileCtas ?? desktopCtas;

    return (
        <div css={styles.container}>
            <div>
                {mobileCtas.primary && (
                    <Hide above="tablet">
                        <PrimaryButton
                            ctaText={mobileCtas.primary.ctaText}
                            ctaUrl={mobileCtas.primary.ctaUrl}
                            ctaSettings={primaryCtaSettings}
                            onClick={onPrimaryCtaClick}
                            size="small"
                        />
                    </Hide>
                )}

                {desktopCtas.primary && (
                    <Hide below="tablet">
                        <PrimaryButton
                            ctaText={desktopCtas.primary.ctaText}
                            ctaUrl={desktopCtas.primary.ctaUrl}
                            ctaSettings={primaryCtaSettings}
                            onClick={onPrimaryCtaClick}
                            size="default"
                        />
                    </Hide>
                )}
            </div>

            <div>
                {mobileCtas.secondary?.type === SecondaryCtaType.Custom && (
                    <Hide above="tablet">
                        <SecondaryButton
                            ctaText={mobileCtas.secondary.cta.ctaText}
                            ctaUrl={mobileCtas.secondary.cta.ctaUrl}
                            ctaSettings={secondaryCtaSettings}
                            onClick={onSecondaryCtaClick}
                            size="small"
                        />
                    </Hide>
                )}

                {desktopCtas.secondary?.type === SecondaryCtaType.Custom && (
                    <Hide below="tablet">
                        <SecondaryButton
                            ctaText={desktopCtas.secondary.cta.ctaText}
                            ctaUrl={desktopCtas.secondary.cta.ctaUrl}
                            ctaSettings={secondaryCtaSettings}
                            onClick={onSecondaryCtaClick}
                            size="small"
                        />
                    </Hide>
                )}
            </div>
        </div>
    );
}

// ---- Helper Components ---- //

interface ButtonProps {
    ctaText: string;
    ctaUrl: string;
    ctaSettings: CtaSettings;
    onClick: () => void;
    size: 'small' | 'default';
}

function PrimaryButton({ ctaText, ctaUrl, ctaSettings, onClick, size }: ButtonProps) {
    return (
        <div>
            <LinkButton
                href={ctaUrl}
                onClick={onClick}
                size={size}
                priority="primary"
                cssOverrides={buttonStyles(ctaSettings)}
            >
                {ctaText}
            </LinkButton>

            <PaymentCards />
        </div>
    );
}

function SecondaryButton({ ctaText, ctaUrl, ctaSettings, onClick, size }: ButtonProps) {
    return (
        <LinkButton
            href={ctaUrl}
            onClick={onClick}
            size={size}
            priority="tertiary"
            cssOverrides={buttonStyles(ctaSettings)}
        >
            {ctaText}
        </LinkButton>
    );
}

function PaymentCards() {
    return (
        <img
            width={138}
            height={20}
            src="https://media.guim.co.uk/b6772cef0acaa243c379527b54f4375801b4cdec/0_0_138_20/138.png"
            alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
            css={styles.paymentMethods}
        />
    );
}

// ---- Styles ---- //

const styles = {
    container: css`
        display: flex;
        flex-direction: row;

        & > * + * {
            margin-left: ${space[3]}px;
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
