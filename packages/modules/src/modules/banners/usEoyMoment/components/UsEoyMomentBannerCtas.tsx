import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, news, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { buttonBrandAlt, buttonReaderRevenue, LinkButton } from '@guardian/src-button';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerEnrichedCta, BannerEnrichedSecondaryCta } from '../../common/types';
import { SvgArrowRightStraight } from '@guardian/src-icons';

const styles = {
    container: css`
        display: flex;
        flex-direction: row;

        & > * + * {
            margin-left: ${space[4]}px;
        }

        ${from.tablet} {
            flex-direction: row-reverse;

            & > * + * {
                margin-left: 0;
                margin-right: ${space[4]}px;
            }
        }
    `,
    mobilePrimaryCta: css`
        color: ${neutral[0]};

        &:hover {
            background-color: ${neutral[100]};
        }
    `,
    desktopPrimaryCta: css`
        border: 1px solid ${news[400]};
        background-color: ${news[400]};
        color: ${neutral[100]};

        ${from.tablet} {
            &:hover {
                background-color: ${neutral[100]};
                color: ${news[400]};
            }
        }
    `,
    secondaryCta: css`
        background-color: ${neutral[0]};
        border: 1px solid ${neutral[100]};

        &:hover {
            background-color: ${neutral[100]};
            color: ${neutral[0]};
        }

        ${from.tablet} {
            border: 1px solid ${neutral[0]};
        }
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

export function UsEoyMomentBannerCtas({
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
                                        cssOverrides={styles.mobilePrimaryCta}
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
                        <ButtonWithPaymentIcons
                            button={
                                <LinkButton
                                    href={desktopCtas.primary.ctaUrl}
                                    onClick={onPrimaryCtaClick}
                                    cssOverrides={styles.desktopPrimaryCta}
                                    size="small"
                                    priority="primary"
                                    icon={<SvgArrowRightStraight />}
                                    iconSide="right"
                                >
                                    {desktopCtas.primary.ctaText}
                                </LinkButton>
                            }
                        />
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
                                cssOverrides={styles.secondaryCta}
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
                            <LinkButton
                                href={desktopCtas.secondary.cta.ctaUrl}
                                onClick={onSecondaryCtaClick}
                                cssOverrides={styles.secondaryCta}
                                size="small"
                                priority="primary"
                            >
                                {desktopCtas.secondary.cta.ctaText}
                            </LinkButton>
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
    `,
    paymentIconsContainer: css`
        margin-top: ${space[1]}px;
        margin-left: ${space[4]}px;

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
                <img
                    width={497}
                    height={88}
                    src="https://media.guim.co.uk/40745a456b9da26eccca15a615dd0e406839ceb6/0_0_1549_274/500.png"
                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                />
            </div>
        </div>
    );
}
