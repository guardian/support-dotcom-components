import React from 'react';
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
    background-color: #006d67;
    color: ${neutral[100]};
`;

const contentContainer = css`
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
    padding: ${space[4]}px;
    button {
        margin-left: ${space[3]}px;
    }
    ${from.tablet} {
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

const headLineBreak = css`
    display: none;
    @media (min-width: 1040px) {
        display: block;
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

const buttonTextTablet = css`
    display: none;
    ${from.tablet} {
        display: block;
    }
    ${from.desktop} {
        display: none;
    }
`;

const buttonTextMobile = css`
    display: block;
    ${from.tablet} {
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
    display: flex;
    justify-content: center;
    width: 100%;
    ${from.tablet} {
        align-self: flex-end;
        max-width: 35%;
        margin-top: -200px;
    }
    ${from.desktop} {
        height: 100%;
        max-width: 50%;
        justify-content: flex-end;
        margin-top: 0;
    }
    ${from.leftCol} {
        justify-content: space-between;
    }
    ${from.wide} {
        max-width: 47%;
    }
`;

const packShot = css`
    max-width: 85%;
    ${from.phablet} {
        max-width: 100%;
    }
    ${from.desktop} {
        align-self: flex-end;
        max-width: 80%;
    }
    ${from.leftCol} {
        max-width: 80%;
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
    padding: ${space[1]}px;
    border: 1px solid ${neutral[100]};
    border-radius: 50%;
    outline: none;
    background: transparent;
    cursor: pointer;
    svg {
        width: 25px;
        height: 25px;
        fill: ${neutral[100]};
        transition: background-color 0.5s ease;
        border-radius: 50%;
    }
    svg:hover {
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
    closeBanner: () => void;
};

export const WeeklyBanner: React.FC<WeeklyBannerProps> = ({
    subscriptionUrl,
    signInUrl,
    closeBanner,
}: WeeklyBannerProps) => {
    return (
        <section
            id="js-site-message--subscription-banner"
            className={banner}
            data-target="subscriptions-banner"
        >
            <div className={contentContainer}>
                <div className={topLeftComponent}>
                    <h3 className={heading}>
                        The world is changing by the minute. <br className={headLineBreak} />
                        Keep up with a digital subscription.
                    </h3>
                    <p className={paragraph}>
                        Two Guardian apps, with you every day. <strong>The Daily</strong>, joining
                        you in the morning to share politics, culture, food and opinion.{' '}
                        <strong>Live</strong>, constantly by your side, keeping you connected with
                        the outside world.
                    </p>
                    <ThemeProvider theme={buttonReaderRevenue}>
                        <LinkButton
                            id="js-site-message--subscription-banner__cta"
                            data-link-name="subscription-banner : cta"
                            priority="primary"
                            size="default"
                            href={subscriptionUrl}
                        >
                            <span className={buttonTextDesktop}>Become a digital subscriber</span>
                            <span className={buttonTextTablet}>Become a subscriber</span>
                            <span className={buttonTextMobile}>Subscribe now</span>
                        </LinkButton>
                    </ThemeProvider>
                    <ThemeProvider theme={brand}>
                        <Button
                            id="js-site-message--subscription-banner__cta-dismiss"
                            data-link-name="subscription-banner : not now"
                            onClick={closeBanner}
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
                        src="https://i.guim.co.uk/img/media/773ead1bd414781052c0983858e6859993870dd3/34_72_1825_1084/1825.png?width=500&quality=85&s=24cb49b459c52c9d25868ca20979defb"
                        alt=""
                    />
                    <div className={iconPanel}>
                        <button
                            onClick={closeBanner}
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
    );
};
