import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { brandAlt, neutral, space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { buttonBrandAlt, buttonReaderRevenue, LinkButton } from '@guardian/src-button';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerEnrichedCta, BannerEnrichedSecondaryCta } from '../../common/types';
import { PaymentCards } from '../../common/PaymentCards';

const styles = {
    container: css`
        display: flex;
        flex-direction: row;

        & > * + * {
            margin-left: ${space[4]}px;
        }

        ${from.tablet} {
            flex-direction: column;
        }
    `,
    mobileSecondaryCta: css`
        background-color: ${neutral[0]};
        border: 1px solid ${neutral[100]};
        color: ${neutral[100]};

        &:hover {
            background-color: ${neutral[100]};
            color: ${neutral[0]};
        }
        ${until.mobileMedium} {
            padding: 0 ${space[3]}px;
        }
    `,
    secondaryCta: css`
        background-color: ${neutral[100]};
        border: 1px solid ${neutral[0]};
        color: ${neutral[0]};

        &:hover {
            background-color: ${neutral[93]};
        }
        width: fit-content;
    `,
    primaryCta: css`
        background-color: ${brandAlt[400]};
        border: 1px solid ${brandAlt[400]};
        color: ${neutral[0]};

        &:hover {
            background-color: ${brandAlt[200]};
        }
        ${until.mobileMedium} {
            padding: 0 ${space[3]}px;
        }
    `,
    buttonPaymentIcons: css`
        margin-left: 32px;
    `,
};

interface BreakpointCtas {
    primary: BannerEnrichedCta | null;
    secondary: BannerEnrichedSecondaryCta | null;
}

interface InvestigationsMomentBannerCtasProps {
    mobileCtas: BreakpointCtas | null;
    desktopCtas: BreakpointCtas;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

export function InvestigationsMomentBannerCtas({
    desktopCtas,
    mobileCtas: maybeMobileCtas,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
}: InvestigationsMomentBannerCtasProps): JSX.Element {
    const mobileCtas = maybeMobileCtas ?? desktopCtas;

    return (
        <div css={styles.container}>
            <div>
                {mobileCtas.primary && (
                    <Hide above="tablet">
                        <ButtonWithPaymentIcons
                            button={
                                <ThemeProvider theme={buttonReaderRevenue}>
                                    <LinkButton
                                        href={mobileCtas.primary.ctaUrl}
                                        onClick={onPrimaryCtaClick}
                                        cssOverrides={styles.primaryCta}
                                        size="small"
                                        priority="primary"
                                    >
                                        {mobileCtas.primary.ctaText}
                                    </LinkButton>
                                </ThemeProvider>
                            }
                        />
                    </Hide>
                )}

                {desktopCtas.primary && (
                    <Hide below="tablet">
                        <LinkButton
                            href={desktopCtas.primary.ctaUrl}
                            onClick={onPrimaryCtaClick}
                            cssOverrides={styles.primaryCta}
                            size="small"
                            priority="primary"
                        >
                            {desktopCtas.primary.ctaText}
                        </LinkButton>
                    </Hide>
                )}
            </div>

            <div>
                {mobileCtas.secondary?.type === SecondaryCtaType.Custom && (
                    <Hide above="tablet">
                        <ThemeProvider theme={buttonBrandAlt}>
                            <LinkButton
                                href={mobileCtas.secondary.cta.ctaUrl}
                                onClick={onSecondaryCtaClick}
                                cssOverrides={styles.mobileSecondaryCta}
                                size="small"
                                priority="primary"
                            >
                                {mobileCtas.secondary.cta.ctaText}
                            </LinkButton>
                        </ThemeProvider>
                    </Hide>
                )}

                {desktopCtas.secondary?.type === SecondaryCtaType.Custom && (
                    <Hide below="tablet">
                        <ThemeProvider theme={buttonBrandAlt}>
                            <ButtonWithPaymentIcons
                                button={
                                    <LinkButton
                                        href={desktopCtas.secondary.cta.ctaUrl}
                                        onClick={onSecondaryCtaClick}
                                        cssOverrides={styles.secondaryCta}
                                        size="small"
                                        priority="primary"
                                    >
                                        {desktopCtas.secondary.cta.ctaText}
                                    </LinkButton>
                                }
                            />
                        </ThemeProvider>
                    </Hide>
                )}
            </div>
        </div>
    );
}

// ----- Helpers ----- //

const buttonWithPaymentIconStyles = {
    container: css`
        display: flex;
        flex-direction: column;

        ${from.tablet} {
            margin-top: ${space[2]}px;
            margin-left: -${space[4]}px;
        }
    `,
    paymentIconsContainer: css`
        margin-top: ${space[2]}px;

        img {
            height: 14px;
            width: auto;

            ${from.tablet} {
                height: 20px;
            }
        }
    `,
};

interface ButtonWithPaymentIconProps {
    button: JSX.Element;
}

function ButtonWithPaymentIcons({ button }: ButtonWithPaymentIconProps) {
    return (
        <div css={buttonWithPaymentIconStyles.container}>
            {button}
            <div css={buttonWithPaymentIconStyles.paymentIconsContainer}>
                <PaymentCards />
            </div>
        </div>
    );
}
