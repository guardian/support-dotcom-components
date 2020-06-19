import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, LinkButton, buttonReaderRevenue } from '@guardian/src-button';
import { brand } from '@guardian/src-foundations/themes';
import { SvgGuardianLogo } from '@guardian/src-brand';
import { SvgClose } from '@guardian/src-icons';
import {
    banner,
    contentContainer,
    topLeftComponent,
    heading,
    paragraph,
    buttonTextDesktop,
    buttonTextMobileTablet,
    siteMessage,
    bottomRightComponent,
    packShot,
    iconPanel,
    closeButton,
    logoContainer,
} from './weeklyBannerStyles';

type WeeklyBannerProps = {
    subscriptionUrl: string;
    signInUrl: string;
};

export const WeeklyBanner: React.FC<WeeklyBannerProps> = ({
    subscriptionUrl,
    signInUrl,
}: WeeklyBannerProps) => {
    const [showBanner, closeBanner] = useState(true);
    return (
        <>
            {showBanner ? (
                <section
                    id="js-site-message--subscription-banner"
                    className={banner}
                    data-target="subscriptions-banner"
                >
                    <div className={contentContainer}>
                        <div className={topLeftComponent}>
                            <h3 className={heading}>Read The Guardian in print</h3>
                            <p className={paragraph}>
                                Support The Guardian&apos;s independent journalism by subscribing to
                                The Guardian Weekly, our essential world news magazine. Home
                                delivery available wherever you are.
                            </p>
                            <ThemeProvider theme={buttonReaderRevenue}>
                                <LinkButton
                                    id="js-site-message--subscription-banner__cta"
                                    data-link-name="subscription-banner : cta"
                                    priority="primary"
                                    size="default"
                                    href={subscriptionUrl}
                                >
                                    <span className={buttonTextDesktop}>
                                        Become a Guardian Weekly subscriber
                                    </span>
                                    <span className={buttonTextMobileTablet}>Subscribe now</span>
                                </LinkButton>
                            </ThemeProvider>
                            <ThemeProvider theme={brand}>
                                <Button
                                    id="js-site-message--subscription-banner__cta-dismiss"
                                    data-link-name="subscription-banner : not now"
                                    onClick={(): void => closeBanner(false)}
                                    priority="subdued"
                                >
                                    Not now
                                </Button>
                            </ThemeProvider>
                            <div className={siteMessage}>
                                Already a subscriber?{' '}
                                <a
                                    id="js-site-message--subscription-banner__sign-in"
                                    href={signInUrl}
                                    data-link-name="subscription-banner : sign in"
                                >
                                    Sign in
                                </a>{' '}
                                to not see this again
                            </div>
                        </div>
                        <div className={bottomRightComponent}>
                            <img
                                className={packShot}
                                src="https://i.guim.co.uk/img/media/f5c66a31a7d352acaee1c574e5cc009909f25119/0_0_2210_2062/500.png?quality=85&s=46fb180930f0ec0dc2f6b34a4e94cb06"
                                alt=""
                            />
                            <div className={iconPanel}>
                                <button
                                    onClick={(): void => closeBanner(false)}
                                    className={closeButton}
                                    id="js-site-message--subscription-banner__close-button"
                                    data-link-name="subscription-banner : close"
                                    aria-label="Close"
                                >
                                    <SvgClose />
                                </button>
                                <div className={logoContainer}>
                                    <SvgGuardianLogo />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    );
};
