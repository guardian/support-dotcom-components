import React, { useState } from 'react';
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
    notNowButton,
    becomeASubscriberButton,
    linkStyle,
    signInLink,
} from './guardianWeeklyBannerStyles';
import { BannerProps } from '../../../../types/BannerTypes';
import { setSubscriptionsBannerClosedTimestamp } from '../localStorage';
import { addTrackingParams, createClickEventFromTracking } from '../../../../lib/tracking';

const subscriptionUrl = 'https://support.theguardian.com/subscribe/weekly';
const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_gWeekly&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'weekly-banner';
const ctaComponentId = `${bannerId} : cta`;
const notNowComponentId = `${bannerId} : not now`;
const closeComponentId = `${bannerId} : close`;
const signInComponentId = `${bannerId} : sign in`;

export const GuardianWeeklyBanner: React.FC<BannerProps> = ({
    tracking,
    submitComponentEvent,
}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);

    const onSubscribeClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        evt.preventDefault();
        const subscriptionUrlWithTracking = addTrackingParams(subscriptionUrl, tracking);
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
                <section css={banner} data-target={bannerId}>
                    <div css={contentContainer}>
                        <div css={topLeftComponent}>
                            <h3 css={heading}>Read The Guardian in print</h3>
                            <p css={paragraph}>
                                Support The Guardian&apos;s independent journalism by subscribing to
                                The Guardian Weekly, our essential world news magazine. Home
                                delivery available wherever you are.
                            </p>
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
                                    className={signInLink}
                                    data-link-name={signInComponentId}
                                    onClick={onSignInClick}
                                >
                                    Sign in
                                </a>{' '}
                                to not see this again
                            </div>
                        </div>
                        <div css={bottomRightComponent}>
                            <img
                                css={packShot}
                                src="https://i.guim.co.uk/img/media/f5c66a31a7d352acaee1c574e5cc009909f25119/0_0_2210_2062/500.png?quality=85&s=46fb180930f0ec0dc2f6b34a4e94cb06"
                                alt=""
                            />
                            <div css={iconPanel}>
                                <button
                                    data-link-name={closeComponentId}
                                    css={closeButton}
                                    onClick={onCloseClick}
                                    aria-label="Close"
                                >
                                    <SvgClose />
                                </button>
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
