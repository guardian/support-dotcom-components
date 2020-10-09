import React, { useState } from 'react';
import { SvgGuardianLogo } from '@guardian/src-brand';
import { SvgClose } from '@guardian/src-icons';
import {
    banner,
    contentContainer,
    topLeftComponent,
    heading,
    iconAndCloseMobile,
    paragraph,
    buttonTextDesktop,
    buttonTextMobileTablet,
    siteMessage,
    bottomRightComponent,
    packShotContainer,
    packShotTablet,
    packShotMobileAndDesktop,
    iconPanel,
    closeButtonIconPanel,
    closeButtonMobile,
    logoContainer,
    notNowButton,
    becomeASubscriberButton,
    linkStyle,
    signInLink,
} from './guardianWeeklyBannerStyles';
import { BannerProps } from '../../../../types/BannerTypes';
import { setChannelClosedTimestamp } from '../localStorage';
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
} from '../../../../lib/tracking';

const subscriptionUrl = 'https://support.theguardian.com/subscribe/weekly';
const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_gWeekly&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'weekly-banner';
const ctaComponentId = `${bannerId} : cta`;
const notNowComponentId = `${bannerId} : not now`;
const closeComponentId = `${bannerId} : close`;
const signInComponentId = `${bannerId} : sign in`;

const mobileAndDesktopImg =
    'https://media.guim.co.uk/d544f4e24e4275d3434e6465d8676d2b5bcd0851/0_0_3430_1665/500.png';

const tabletImage =
    'https://media.guim.co.uk/a213adf3f68f788b3f9434a1e88787fce1fa10bd/245_0_2839_1632/500.png';

type ButtonPropTypes = {
    onClick: () => null;
    css: string;
};

const CloseButtonIconPanel = (props: ButtonPropTypes): null => (
    <button
        data-link-name={closeComponentId}
        css={closeButtonIconPanel}
        onClick={props.onClick}
        aria-label="Close"
    >
        <SvgClose />
    </button>
);

const CloseButtonMobile = (props: ButtonPropTypes): null => (
    <button
        data-link-name={closeComponentId}
        css={closeButtonMobile}
        onClick={props.onClick}
        aria-label="Close"
    >
        <SvgClose />
    </button>
);

export const GuardianWeeklyBanner: React.FC<BannerProps> = ({
    bannerChannel,
    content,
    tracking,
    submitComponentEvent,
    countryCode,
}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);

    const onSubscribeClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        evt.preventDefault();
        const subscriptionUrlWithTracking = addRegionIdAndTrackingParamsToSupportUrl(
            subscriptionUrl,
            tracking,
            countryCode,
        );
        const componentClickEvent = createClickEventFromTracking(tracking, ctaComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        window.location.href = subscriptionUrlWithTracking;
    };

    const onSignInClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        evt.preventDefault();
        const componentClickEvent = createClickEventFromTracking(tracking, signInComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        window.location.href = signInUrl;
    };

    const onCloseClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
        const componentClickEvent = createClickEventFromTracking(tracking, closeComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setChannelClosedTimestamp(bannerChannel);
    };

    const onNotNowClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
        const componentClickEvent = createClickEventFromTracking(tracking, notNowComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setChannelClosedTimestamp(bannerChannel);
    };

    return (
        <>
            {showBanner ? (
                <section css={banner} data-target={bannerId}>
                    <div css={contentContainer}>
                        <div css={topLeftComponent}>
                            <h3 css={heading}>{content?.heading}</h3>
                            <div css={iconAndCloseMobile}>
                                <CloseButtonMobile onClick={onCloseClick} css={closeButtonMobile} />
                            </div>
                            <p css={paragraph}>{content?.messageText}</p>
                            <a
                                data-link-name={ctaComponentId}
                                css={linkStyle}
                                onClick={onSubscribeClick}
                            >
                                <div css={becomeASubscriberButton}>
                                    <span css={buttonTextDesktop}>
                                        Become a Guardian Weekly subscriber
                                    </span>
                                    <span css={buttonTextMobileTablet}>Subscribe now</span>
                                </div>
                            </a>
                            <button
                                data-link-name={notNowComponentId}
                                css={notNowButton}
                                onClick={onNotNowClick}
                            >
                                Not now
                            </button>
                            <div css={siteMessage}>
                                Already a subscriber?{' '}
                                <a
                                    css={signInLink}
                                    data-link-name={signInComponentId}
                                    onClick={onSignInClick}
                                >
                                    Sign in
                                </a>{' '}
                                to not see this again
                            </div>
                        </div>
                        <div css={bottomRightComponent}>
                            <div css={packShotContainer}>
                                <img css={packShotTablet} src={tabletImage} alt="" />
                                <img
                                    css={packShotMobileAndDesktop}
                                    src={mobileAndDesktopImg}
                                    alt=""
                                />
                            </div>
                            <div css={iconPanel}>
                                <CloseButtonIconPanel onClick={onCloseClick} />
                                <div css={logoContainer}>
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
