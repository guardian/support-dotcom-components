import React, { useState } from 'react';
import { SvgGuardianLogo } from '@guardian/src-brand';
import { SvgClose } from '@guardian/src-icons';
import {
    banner,
    contentContainer,
    topLeftComponent,
    heading,
    headLineBreak,
    paragraph,
    buttonTextDesktop,
    buttonTextTablet,
    buttonTextMobile,
    siteMessage,
    bottomRightComponent,
    packShot,
    iconPanel,
    closeButton,
    logoContainer,
    notNowButton,
    becomeASubscriberButton,
    linkStyle,
} from './digitalSubscriptionsBannerStyles';
import { BannerProps } from '../../../../types/BannerTypes';
import { setSubscriptionsBannerClosedTimestamp } from '../localStorage';
import { addTrackingParams, createClickEventFromTracking } from '../../../../lib/tracking';

const subscriptionUrl = 'https://support.theguardian.com/subscribe/digital';
const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'subscription-banner :';
const ctaComponentId = `${bannerId} cta`;
const notNowComponentId = `${bannerId} not now`;
const closeComponentId = `${bannerId} close`;
const signInComponentId = `${bannerId} sign in`;

export const DigitalSubscriptionsBanner: React.FC<BannerProps> = ({
    tracking,
    submitComponentEvent,
}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);

    const subscriptionUrlWithTracking = addTrackingParams(subscriptionUrl, tracking);

    const onSubscribeClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        evt.preventDefault();
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
        console.log('componentClickEvent ---->', componentClickEvent);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setSubscriptionsBannerClosedTimestamp();
    };

    const onNotNowClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
        const componentClickEvent = createClickEventFromTracking(tracking, notNowComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setSubscriptionsBannerClosedTimestamp();
    };

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
                            <h3 className={heading}>
                                Our reporting. <br className={headLineBreak} />
                                Your pace.
                            </h3>
                            <p className={paragraph}>
                                Tired of being always on? Our Daily edition comes to you just once a
                                day. If a story breaks, you can still catch it with Premium access
                                to our Live app. All with no ads. It&apos;s up to you.
                            </p>
                            <a className={linkStyle} onClick={onSubscribeClick}>
                                <div
                                    data-link-name={ctaComponentId}
                                    className={becomeASubscriberButton}
                                >
                                    <span className={buttonTextDesktop}>
                                        Become a digital subscriber
                                    </span>
                                    <span className={buttonTextTablet}>Become a subscriber</span>
                                    <span className={buttonTextMobile}>Subscribe now</span>
                                </div>
                            </a>
                            <button
                                className={notNowButton}
                                data-link-name={notNowComponentId}
                                onClick={onNotNowClick}
                            >
                                Not now
                            </button>
                            <div className={siteMessage}>
                                Already a subscriber?{' '}
                                <a data-link-name={signInComponentId} onClick={onSignInClick}>
                                    Sign in
                                </a>{' '}
                                to not see this again
                            </div>
                        </div>
                        <div className={bottomRightComponent}>
                            <div className={packShot}>
                                <img
                                    src="https://i.guim.co.uk/img/media/773ead1bd414781052c0983858e6859993870dd3/34_72_1825_1084/1825.png?width=500&quality=85&s=24cb49b459c52c9d25868ca20979defb"
                                    alt=""
                                />
                            </div>
                            <div className={iconPanel}>
                                <button
                                    onClick={onCloseClick}
                                    className={closeButton}
                                    data-link-name={closeComponentId}
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
