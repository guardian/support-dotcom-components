import React, { useState } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { body, headline, textSans } from '@guardian/src-foundations/typography/cjs';
import { neutral } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { Button, LinkButton, buttonReaderRevenue } from '@guardian/src-button';
import { brand } from '@guardian/src-foundations/themes';
import Logo from '../guardianLogo/Logo';
import Close from '../closeButton/Close';

const banner = css`
    html {
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #3f464a;
    color: ${neutral[100]};
`;

const contentContainer = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    ${from.tablet} {
        display: flex;
        flex-direction: row;
    }
    ${from.wide} {
        max-width: 1250px;
    }
`;

const topLeftComponent = css`
    width: 100%;
    padding: ${space[4]}px ${space[4]}px 0 ${space[4]}px;
    button {
        margin-left: ${space[3]}px;
    }
    ${from.tablet} {
        padding: ${space[4]}px;
        width: 65%;
    }

    ${from.desktop} {
        width: 50%;
    }

    ${from.wide} {
        width: 53%;
    }
`;

const heading = css`
    ${headline.small({ fontWeight: 'bold' })};
    margin: 0;
    max-width: 100%;

    @media (max-width: 740px) {
        max-width: 85%;
    }

    ${until.mobileLandscape} {
        ${headline.xsmall({ fontWeight: 'bold' })};
    }
`;

const paragraph = css`
    ${body.medium()}
    line-height: 135%;
    margin: ${space[2]}px 0 ${space[6]}px;
    max-width: 85%;
    ${from.tablet} {
        max-width: 100%;
    }
    ${from.desktop} {
        font-size: 20px;
        margin: ${space[3]}px 0 ${space[9]}px;
    }
`;

const buttonTextDesktop = css`
    display: none;
    ${from.desktop} {
        display: block;
    }
`;

const buttonTextMobileTablet = css`
    display: block;
    ${from.desktop} {
        display: none;
    }
`;

const siteMessage = css`
    margin: ${space[3]}px 0 ${space[4]}px;
    ${textSans.small()};
    color: ${neutral[100]};
    a,
    :visited {
        color: ${neutral[100]};
        font-weight: bold;
    }
`;

const bottomRightComponent = css`
    max-height: 215px;
    overflow: hidden;
    margin-top: -25px;

    ${from.mobileMedium} {
        max-height: 280px;
        margin-top: -15px;
    }

    ${from.tablet} {
        max-width: 55%;
        margin-top: 10px;
    }

    ${from.desktop} {
        display: flex;
        align-items: center;
        max-width: 50%;
        margin-top: 0;
        max-height: 100%;
    }

    ${from.leftCol} {
        max-height: 290px;
        justify-content: space-around;
    }

    ${from.wide} {
        max-width: 47%;
        max-height: 290px;
    }
`;

const packShot = css`
    max-width: 100%;

    ${from.tablet} {
        max-width: 90%;
    }

    ${from.desktop} {
        max-width: 75%;
        margin-bottom: -55px;
    }

    ${from.leftCol} {
        max-width: 65%;
    }

    ${from.wide} {
        max-width: 100%;
        width: 75%;
    }
`;

const iconPanel = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;
    padding: ${space[4]}px 0;
    margin: 0 ${space[4]}px;
`;

const logoContainer = css`
    display: none;

    ${from.desktop} {
        display: block;
        width: 100%;
        fill: ${neutral[100]};
        min-width: 60px;
    }

    ${from.leftCol} {
        min-width: 80px;
    }
`;

const closeButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid ${neutral[100]};
    border-radius: 50%;
    outline: none;
    background: transparent;
    cursor: pointer;
    width: 35px;
    height: 35px;

    svg {
        width: 25px;
        height: 25px;
        fill: ${neutral[100]};
        transition: background-color 0.5s ease;
        border-radius: 50%;
    }

    :hover {
        cursor: pointer;
        background-color: rgba(237, 237, 237, 0.5);
    }

    ${until.desktop} {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

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
                                    <Close />
                                </button>
                                <div className={logoContainer}>
                                    <Logo />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    );
};
