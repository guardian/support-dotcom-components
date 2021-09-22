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

interface InvestigationsMomentBannerCtasProps {
    primaryCta: BannerEnrichedCta | null;
    secondaryCta: BannerEnrichedSecondaryCta | null;
    mobilePrimaryCta: BannerEnrichedCta | null;
    mobileSecondaryCta: BannerEnrichedSecondaryCta | null;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
}

export function InvestigationsMomentBannerCtas({
    primaryCta,
    secondaryCta,
    mobilePrimaryCta: maybeMobilePrimaryCta,
    mobileSecondaryCta: maybeMobileSecondaryCta,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
}: InvestigationsMomentBannerCtasProps): JSX.Element {
    const mobilePrimaryCta = maybeMobilePrimaryCta ?? primaryCta;
    const mobileSecondaryCta = maybeMobileSecondaryCta ?? secondaryCta;

    return (
        <div css={styles.container}>
            <div>
                {mobilePrimaryCta && (
                    <Hide above="tablet">
                        <ButtonWithPaymentIcons
                            button={
                                <ThemeProvider theme={buttonReaderRevenue}>
                                    <LinkButton
                                        href={mobilePrimaryCta.ctaUrl}
                                        onClick={onPrimaryCtaClick}
                                        cssOverrides={styles.mobilePrimaryCta}
                                        size="small"
                                        priority="primary"
                                    >
                                        {mobilePrimaryCta.ctaText}
                                    </LinkButton>
                                </ThemeProvider>
                            }
                        />
                    </Hide>
                )}

                {primaryCta && (
                    <Hide below="tablet">
                        <ButtonWithPaymentIcons
                            button={
                                <LinkButton
                                    href={primaryCta.ctaUrl}
                                    onClick={onPrimaryCtaClick}
                                    cssOverrides={styles.desktopPrimaryCta}
                                    size="small"
                                    priority="primary"
                                    icon={<SvgArrowRightStraight />}
                                    iconSide="right"
                                >
                                    {primaryCta.ctaText}
                                </LinkButton>
                            }
                        />
                    </Hide>
                )}
            </div>

            <div>
                {mobileSecondaryCta?.type === SecondaryCtaType.Custom && (
                    <Hide above="tablet">
                        <ThemeProvider theme={buttonBrandAlt}>
                            <LinkButton
                                href={mobileSecondaryCta.cta.ctaUrl}
                                onClick={onSecondaryCtaClick}
                                cssOverrides={styles.secondaryCta}
                                size="small"
                                priority="primary"
                            >
                                {mobileSecondaryCta.cta.ctaText}
                            </LinkButton>
                        </ThemeProvider>
                    </Hide>
                )}

                {secondaryCta?.type === SecondaryCtaType.Custom && (
                    <Hide below="tablet">
                        <ThemeProvider theme={buttonBrandAlt}>
                            <LinkButton
                                href={secondaryCta.cta.ctaUrl}
                                onClick={onSecondaryCtaClick}
                                cssOverrides={styles.secondaryCta}
                                size="small"
                                priority="primary"
                            >
                                {secondaryCta.cta.ctaText}
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
                height: 17px;
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
