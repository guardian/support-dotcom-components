import React, { useState, useRef, useEffect } from 'react';
import { css } from 'emotion';
import { neutral, opinion, brandAlt } from '@guardian/src-foundations/palette';
import { headline, body, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { Button, LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import {
    SvgChevronDownSingle,
    SvgCross,
    SvgFacebook,
    SvgTwitter,
    SvgEnvelope,
} from '@guardian/src-icons';
import { ThemeProvider } from 'emotion-theming';
import { brandAlt as brandAltTheme } from '@guardian/src-foundations/themes';
import { from } from '@guardian/src-foundations/mq';
import { BannerProps } from '../BannerTypes';
import { addTrackingParams } from '../../../../../lib/tracking';
import { setContributionsBannerClosedTimestamp } from '../localStorage';

const banner = css`
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: ${opinion[500]};

    @keyframes sun-rise-banner {
        0% {
            background-color: ${opinion[400]};
        }
        100% {
            background-color: ${opinion[500]};
        }
    }

    animation-name: sun-rise-banner;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;

    ${from.tablet} {
        flex-direction: row-reverse;
    }
`;

const sunSvgAndMessagesContainer = css`
    overflow: hidden;

    ${from.tablet} {
        width: 50%;
        padding: ${space[1]}px ${space[1]}px 0 0;
    }

    ${from.desktop} {
        margin-top: -${space[12]}px;
        padding: 0 ${space[12]}px 0 0;
    }

    ${from.wide} {
        margin-top: -${space[24]}px;
        padding: 0 ${space[24]}px 0 0;
    }
`;

const slideUpContainer = css`
    position: relative;
    transition: transform 0.5s ease-in-out;
`;

const slideUpContainerExpanded = css`
    ${slideUpContainer}
    transform: translateY(-140px);

    ${from.mobileMedium} {
        transform: translateY(-180px);
    }
`;

const sunSvgAndThankYouContainer = css`
    position: relative;
    ${from.desktop} {
        max-width: 400px;
    }
`;

const sunSvg = css`
    display: block;

    @keyframes sun-rise-sun-svg--delay {
        0% {
            transform: translateY(55px);
            opacity: 0;
        }
        100% {
            transform: translateY(55px);
            opacity: 0;
        }
    }

    @keyframes sun-rise-sun-svg {
        0% {
            transform: translateY(55px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    animation-name: sun-rise-sun-svg--delay, sun-rise-sun-svg;
    animation-delay: 0s, 0.7s;
    animation-duration: 0.7s, 1.3s;
    animation-timing-function: ease-in-out;
`;

const sunSvgMobile = css`
    ${sunSvg}
    display: block;
    ${from.tablet} {
        display: none;
    }
`;
const sunSvgTablet = css`
    ${sunSvg}
    display: none;
    ${from.tablet} {
        display: block;
    }
    ${from.desktop} {
        display: none;
    }
`;

const sunSvgDesktop = css`
    ${sunSvg}

    @keyframes sun-rise-sun-svg-desktop {
        0% {
            transform: translateY(100px);
            opacity: 0;
        }
        40% {
            opacity: 1;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    animation-name: sun-rise-sun-svg--delay, sun-rise-sun-svg-desktop;
    animation-delay: 0s, 0.7s;
    animation-duration: 0.7s, 1.3s;
    animation-timing-function: ease-in-out;
    display: none;

    ${from.desktop} {
        display: block;
    }
`;
const sunSvgOuterSun = css`
    color: ${brandAlt[200]};

    @keyframes sun-pulsing-inner {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.95);
        }
    }

    animation-name: sun-pulsing-inner;
    animation-delay: 2.25s;
    animation-duration: 2s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.45, 0.26, 0.22, 0.79);
`;

const sunSvgInnerSun = css`
    color: ${brandAlt[400]};

    @keyframes sun-pulsing-inner {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.95);
        }
    }

    animation-name: sun-pulsing-inner;
    animation-delay: 2s;
    animation-duration: 2s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.45, 0.26, 0.22, 0.79);

    &:hover {
        color: ${brandAlt[200]};
    }

    transition: color 0.3s ease-in-out;
`;

const thankYouMessageInSunContainer = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;

    pointer-events: none;
`;

const thankYouMessageInSun = css`
    width: 100%;
    color: ${neutral[7]};
    text-align: center;

    @keyframes sun-rise-thank-you--delay {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes sun-rise-thank-you {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    animation-name: sun-rise-thank-you--delay, sun-rise-thank-you;
    animation-delay: 0s, 1.5s;
    animation-duration: 1.5s, 0.5s;
    animation-timing-function: ease-in-out;

    // turn off the opacity animation in ff due to flickering bug
    -moz-animation-name: sun-rise-thank-you--delay;
    -moz-animation-delay: 0s;
    -moz-animation-duration: 2s;
    -moz-animation-timing-function: ease-in-out;
`;

const thankYouMessageInSunThankYou = css`
    ${body.small()}

    ${from.tablet} {
        font-size: 17px;
    }
`;

const thankYouMessageInSunSupportersCount = css`
    ${headline.xsmall()}
    font-weight: bold;

    ${from.tablet} {
        font-size: 42px;
    }
`;

const thankYouMessageInSunTagLine = css`
    ${body.small()}
    font-size: 12px;

    ${from.tablet} {
        font-size: 15px;
    }
`;

const thankYouMessageMainMobileContainer = css`
    position: relative;
    margin-top: -${space[12]}px;
    color: ${neutral[7]};
    padding: 0 ${space[3]}px;
    z-index: 100;

    ${from.tablet} {
        display: none;
    }
`;

const thankYouMessageMainTabletContainer = css`
    display: none;

    ${from.tablet} {
        display: block;
        margin-top: ${space[1]}px;
    }
`;

const thankYouMessageMain = css`
    color: ${neutral[7]};
`;

const thankYouMessageMainHeader = css`
    ${headline.xsmall()}
    font-weight: bold;
    padding-bottom: 28px;

    ${from.tablet} {
        font-size: 32px;
        padding-bottom: 0px;
    }

    ${from.desktop} {
        font-size: 42px;
    }
`;

const thankYouMessageMainHeaderThreeLines = css`
    display: block;
    ${from.mobileMedium} {
        display: none;
    }

    ${from.tablet} {
        display: block;
    }

    ${from.desktop} {
        display: none;
    }
`;

const thankYouMessageMainHeaderTwoLines = css`
    display: none;
    ${from.mobileMedium} {
        display: block;
    }

    ${from.tablet} {
        display: none;
    }

    ${from.desktop} {
        display: block;
    }
`;

const thankYouMessageMainBody = css`
    position: absolute;
    top: 84px;
    ${body.small()}
    margin-top: ${space[1]}px;
    padding-right: ${space[3]}px;
    overflow: hidden;
    height: 160px;

    ${from.mobileMedium} {
        top: 54px;
        height: 185px;
    }

    ${from.tablet} {
        position: relative;
        top: 0px;
        height: auto;
        margin-top: ${space[2]}px;
    }

    ${from.desktop} {
        margin-top: ${space[3]}px;
        padding-right: 0;
    }
`;

const thankYouMessageMainBodyExpanded = css`
    ${thankYouMessageMainBody}
    overflow-y: scroll;
`;

const closeButtonContainer = css`
    position: absolute;
    top: 0;
    right: 0;

    ${from.tablet} {
        top: ${space[5]}px;
        right: ${space[5]}px;
    }

    ${from.wide} {
        right: ${space[24]}px;
    }
`;

const closeButtonContainerMobile = css`
    display: block;
    ${from.tablet} {
        display: none;
    }
`;

const closeButtonContainerTablet = css`
    display: none;
    ${from.tablet} {
        display: block;
    }
`;

const buttonsContainer = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 ${space[3]}px ${space[3]}px;

    ${from.tablet} {
        width: 60%;
        padding: 0 ${space[5]}px ${space[5]}px;
    }

    ${from.desktop} {
        width: 75%;
        padding: 0 0 ${space[5]}px ${space[5]}px;
    }

    ${from.wide} {
        padding: 0 0 ${space[5]}px ${space[24]}px;
    }
`;

const readMoreButton = css`
    position: relative;
    ${body.small()}
    background: none;
    border: none;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;

    &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #000;
    }

    ${from.tablet} {
        display: none;
    }
`;

const readMoreButtonText = css`
    width: 80px;
    text-align: start;
    white-space: nowrap;

    transition: width 0.3s ease-in-out;
`;

const readMoreButtonTextExpanded = css`
    ${readMoreButtonText}
    width: 70px;
`;

const readMoreButtonIconContainer = css`
    transition: transform 0.3s ease-in-out;

    svg {
        display: block;
        width: 16px;
    }
`;

const readMoreButtonIconContainerExpanded = css`
    ${readMoreButtonIconContainer}
    transform: rotate(-180deg);
`;

const ctaButtonContainer = css`
    width: 100%;
    margin-top: ${space[4]}px;
    display: flex;
    align-items: center;
`;

const supportTheGuardianLink = css`
    ${textSans.medium()}
    font-weight: 700;
    padding: 0 ${space[5]}px;
    padding-bottom: 2px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 44px;
    color: ${neutral[100]};
    text-decoration: none;
    background-color: ${neutral[7]};
    transition: 0.3s ease-in-out;

    &:hover {
        background-color: ${neutral[20]};
    }
`;

const socialShareContainer = css`
    display: flex;
    align-items: center;

    > * + * {
        margin-left: ${space[3]}px;
    }
`;

const socialShareLinksContainer = css`
    > * + * {
        margin-left: ${space[2]}px;
    }
`;

const socialShareLink = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 44px;
    height: 44px;
    border-radius: 44px;
    background-color: ${neutral[7]};
    transition: 0.3s ease-in-out;

    &:hover {
        background-color: ${neutral[20]};
    }

    svg {
        fill: currentColor;
        color: ${neutral[100]};
        display: block;
        width: 30px;
    }
`;

const socialShareMessage = css`
    ${textSans.small()}
`;

const hearFromSupportersCtaContainer = css`
    display: none;

    ${from.tablet} {
        display: block;
    }
`;

const supporterCtaContainer = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > * + * {
        margin-top: ${space[3]}px;
    }

    ${from.desktop} {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > * + * {
            margin-top: 0;
        }
    }
`;

const nonSupporterCtaContainer = css`
    display: flex;
    align-items: center;

    > * + * {
        margin-left: ${space[4]}px;
    }
`;

interface ThankYouMessageMainProps {
    isExpanded: boolean;
    isSupporter: boolean;
}

const ThankYouMessageMain: React.FC<ThankYouMessageMainProps> = ({
    isExpanded,
    isSupporter,
}: ThankYouMessageMainProps) => {
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bodyRef.current && !isExpanded) {
            bodyRef.current.scroll({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, [isExpanded]);

    return (
        <div className={thankYouMessageMain}>
            <div className={thankYouMessageMainHeader}>
                <div className={thankYouMessageMainHeaderThreeLines}>
                    <div>Our supporters</div>
                    <div>have done something</div>
                    <div>powerful</div>
                </div>
                <div className={thankYouMessageMainHeaderTwoLines}>
                    <div>Our supporters have done</div>
                    <div>something powerful</div>
                </div>
            </div>
            <div
                ref={bodyRef}
                className={isExpanded ? thankYouMessageMainBodyExpanded : thankYouMessageMainBody}
            >
                {isSupporter ? (
                    <>
                        <div>
                            Thanks to supporters like you, including the more than 10,000 who have
                            just joined us for the first time, and everyone who’s spread the word
                            about our work. We’ve surpassed our ambitious goal and grown our
                            community in Australia.
                        </div>
                        <div>
                            Reader support powers our work – it helps us provide independent,
                            quality journalism every day. You enable us to remain open to everyone.
                            To reach even further, we hope you will continue to champion our
                            mission. Together we can do more.
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            Thank you to all who support us financially, including more than 10,000
                            who have just joined us for the first time, and everyone who’s spread
                            the word about our work. We’ve surpassed our ambitious goal and grown
                            our community in Australia.
                        </div>
                        <div>
                            Reader support powers our work – it helps us provide independent,
                            quality journalism every day. You enable us to remain open to everyone.
                            To reach even further, we hope you will champion our mission. Together
                            we can do more.
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

interface ReadMoreButtonProps {
    isExpanded: boolean;
    onClick: () => void;
}

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
    isExpanded,
    onClick,
}: ReadMoreButtonProps) => {
    const [readMoreText, setReadMoreText] = useState('Read more');

    useEffect(() => {
        setTimeout(() => {
            setReadMoreText(isExpanded ? 'Read less' : 'Read more');
        }, 150);
    });

    return (
        <button className={readMoreButton} onClick={onClick}>
            <div className={isExpanded ? readMoreButtonTextExpanded : readMoreButtonText}>
                {readMoreText}
            </div>
            <div
                className={
                    isExpanded ? readMoreButtonIconContainerExpanded : readMoreButtonIconContainer
                }
            >
                <SvgChevronDownSingle />
            </div>
        </button>
    );
};

export const AusMomentThankYouBanner: React.FC<BannerProps> = ({
    tracking,
    isSupporter,
    tickerSettings,
}: BannerProps) => {
    if (!(tickerSettings && tickerSettings.tickerData)) {
        return null;
    }
    const [showBanner, setShowBanner] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    const supportersCount = tickerSettings.tickerData.total;

    const closeBanner = (): void => {
        setContributionsBannerClosedTimestamp();
        setShowBanner(false);
    };

    return (
        <>
            {showBanner ? (
                <div className={banner}>
                    <div className={sunSvgAndMessagesContainer}>
                        <div className={isExpanded ? slideUpContainerExpanded : slideUpContainer}>
                            <div className={sunSvgAndThankYouContainer}>
                                <svg className={sunSvgMobile} viewBox="-16 -10 32 20">
                                    <a
                                        href={
                                            'https://support.theguardian.com/aus-2020-map?INTCMP=Aus_moment_2020_frontend_banner_sun'
                                        }
                                    >
                                        <circle
                                            className={sunSvgOuterSun}
                                            r="9"
                                            cx="0"
                                            cy="0"
                                            fill="currentColor"
                                        />
                                        <circle
                                            className={sunSvgInnerSun}
                                            r="8.5"
                                            cx="0"
                                            cy="0"
                                            fill="currentColor"
                                        />
                                    </a>
                                </svg>
                                <svg className={sunSvgTablet} viewBox="-16 -16 32 32">
                                    <a
                                        href={
                                            'https://support.theguardian.com/aus-2020-map?INTCMP=Aus_moment_2020_frontend_banner_sun'
                                        }
                                    >
                                        <circle
                                            className={sunSvgOuterSun}
                                            r="14"
                                            cx="0"
                                            cy="0"
                                            fill="currentColor"
                                        />
                                        <circle
                                            className={sunSvgInnerSun}
                                            r="13.25"
                                            cx="0"
                                            cy="0"
                                            fill="currentColor"
                                        />
                                    </a>
                                </svg>
                                <svg className={sunSvgDesktop} viewBox="-16 -16 32 32">
                                    <a
                                        href={
                                            'https://support.theguardian.com/aus-2020-map?INTCMP=Aus_moment_2020_frontend_banner_sun'
                                        }
                                    >
                                        <circle
                                            className={sunSvgOuterSun}
                                            r="14.75"
                                            cx="0"
                                            cy="0"
                                            fill="currentColor"
                                        />
                                        <circle
                                            className={sunSvgInnerSun}
                                            r="14.25"
                                            cx="0"
                                            cy="0"
                                            fill="currentColor"
                                        />
                                    </a>
                                </svg>
                                <div className={thankYouMessageInSunContainer}>
                                    <div className={thankYouMessageInSun}>
                                        <div className={thankYouMessageInSunThankYou}>
                                            Thank you!
                                        </div>
                                        <div className={thankYouMessageInSunSupportersCount}>
                                            {supportersCount.toLocaleString()}
                                        </div>
                                        <div className={thankYouMessageInSunTagLine}>
                                            supporters in Australia
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={thankYouMessageMainMobileContainer}>
                                <ThankYouMessageMain
                                    isExpanded={isExpanded}
                                    isSupporter={!!isSupporter}
                                />
                            </div>
                        </div>
                        <div className={closeButtonContainer}>
                            <div className={closeButtonContainerMobile}>
                                <ThemeProvider theme={brandAltTheme}>
                                    <Button
                                        icon={<SvgCross />}
                                        priority="subdued"
                                        hideLabel
                                        onClick={closeBanner}
                                    />
                                </ThemeProvider>
                            </div>
                            <div className={closeButtonContainerTablet}>
                                <ThemeProvider theme={brandAltTheme}>
                                    <Button
                                        icon={<SvgCross />}
                                        priority="tertiary"
                                        hideLabel
                                        onClick={closeBanner}
                                    />
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>

                    <div className={buttonsContainer}>
                        <ReadMoreButton
                            isExpanded={isExpanded}
                            onClick={(): void => setIsExpanded(!isExpanded)}
                        />

                        <div className={thankYouMessageMainTabletContainer}>
                            <ThankYouMessageMain
                                isExpanded={isExpanded}
                                isSupporter={!!isSupporter}
                            />
                        </div>

                        <div className={ctaButtonContainer}>
                            {isSupporter ? (
                                <div className={supporterCtaContainer}>
                                    <div className={socialShareContainer}>
                                        <div className={socialShareLinksContainer}>
                                            <a
                                                className={socialShareLink}
                                                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsupport.theguardian.com%2Fcontribute%3FausAcquisitionData%3Dthankyou_facebook"
                                            >
                                                <SvgFacebook />
                                            </a>
                                            <a
                                                className={socialShareLink}
                                                href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fsupport.theguardian.com%2Fcontribute%3FausAcquisitionData%3Dthankyou_twitter&hashtags=supporttheguardian&text=Guardian%20Australia%20supporters%20are%20doing%20something%20powerful.%20I%20believe%20independent%20journalism%20is%20vital%2C%20and%20should%20be%20open%20and%20free%20to%20all.%20Join%20me%20and%20contribute%20to%20the%20Guardian%20from%20as%20little%20as%20%241.%20With%20your%20support%2C%20we%20can%20do%20more."
                                            >
                                                <SvgTwitter />
                                            </a>
                                            <a
                                                className={socialShareLink}
                                                href="mailto:?subject=Guardian%20Australia%20supporters%20are%20doing%20something%20powerful&body=I%20believe%20independent%20journalism%20is%20vital%2C%20and%20should%20be%20open%20and%20free%20to%20all.%20Join%20me%20and%20contribute%20to%20the%20Guardian%20from%20as%20little%20as%20%241.%20With%20your%20support%2C%20we%20can%20do%20more.%20%23supporttheguardian%0A%0Ahttps%3A%2F%2Fsupport.theguardian.com%2Fcontribute%3FausAcquisitionData%3Dthankyou_email"
                                            >
                                                <SvgEnvelope />
                                            </a>
                                        </div>
                                        <div className={socialShareMessage}>Share you support</div>
                                    </div>
                                    <div className={hearFromSupportersCtaContainer}>
                                        <ThemeProvider theme={brandAltTheme}>
                                            <LinkButton
                                                href={
                                                    'https://support.theguardian.com/aus-2020-map?INTCMP=Aus_moment_2020_frontend_banner_button'
                                                }
                                                priority="tertiary"
                                            >
                                                Hear from supporters
                                            </LinkButton>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            ) : (
                                <div className={nonSupporterCtaContainer}>
                                    <a
                                        className={supportTheGuardianLink}
                                        href={addTrackingParams(
                                            'https://support.theguardian.com/contribute',
                                            tracking,
                                        )}
                                    >
                                        Support the Guardian
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};
