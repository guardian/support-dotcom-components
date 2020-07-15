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
} from './guardianWeeklyBannerStyles';

type WeeklyBannerProps = {
    subscriptionUrl: string;
    signInUrl: string;
};

export const GuardianWeeklyBanner: React.FC<WeeklyBannerProps> = ({
    subscriptionUrl,
    signInUrl,
}: WeeklyBannerProps) => {
    const [showBanner, closeBanner] = useState(true);
    return (
        <>
            {showBanner ? (
                <section className={banner} data-target="weekly-banner">
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
                                    data-link-name="weekly-banner : cta"
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
                                    data-link-name="weekly-banner : not now"
                                    onClick={(): void => closeBanner(false)}
                                    priority="subdued"
                                >
                                    Not now
                                </Button>
                            </ThemeProvider>
                            <div className={siteMessage}>
                                Already a subscriber?{' '}
                                <a href={signInUrl} data-link-name="weekly-banner : sign in">
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
                                    data-link-name="weekly-banner : close"
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
