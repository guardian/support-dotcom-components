// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { addTrackingParams, createClickEventFromTracking } from '../../../../lib/tracking';
import React, { useState } from 'react';
import { SvgGuardianLogo } from '@guardian/src-brand';
import { SvgClose } from '@guardian/src-icons';
import {
    banner,
    contentContainer,
    topLeftComponent,
    heading,
    secondaryHeading,
    paragraph,
    highlightedText,
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
    signInLink,
} from './digitalSubscriptionsBannerStyles';
import { BannerProps } from '../../../../types/BannerTypes';
import { setChannelClosedTimestamp } from '../localStorage';

const subscriptionUrl = 'https://support.theguardian.com/subscribe/digital';
const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'subscription-banner';
const ctaComponentId = `${bannerId} : cta`;
const notNowComponentId = `${bannerId} : not now`;
const closeComponentId = `${bannerId} : close`;
const signInComponentId = `${bannerId} : sign in`;

export const DigitalSubscriptionsBanner: React.FC<BannerProps> = ({
    bannerChannel,
    content,
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
                            <h3 css={heading}>
                                <span>{content?.heading}</span>
                                {content?.secondaryHeading && (
                                    <span css={secondaryHeading}>{content.secondaryHeading}</span>
                                )}
                            </h3>
                            <p css={paragraph}>
                                {content?.highlightedText && (
                                    <>
                                        <span css={highlightedText}>{content.highlightedText}</span>{' '}
                                    </>
                                )}
                                {content?.messageText}
                            </p>
                            <a css={linkStyle} onClick={onSubscribeClick}>
                                <div data-link-name={ctaComponentId} css={becomeASubscriberButton}>
                                    <span css={buttonTextDesktop}>Become a digital subscriber</span>
                                    <span css={buttonTextTablet}>Become a subscriber</span>
                                    <span css={buttonTextMobile}>Subscribe now</span>
                                </div>
                            </a>
                            <button
                                css={notNowButton}
                                data-link-name={notNowComponentId}
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
                            <div css={packShot}>
                                <img
                                    src="https://media.guim.co.uk/3e6ecc7e48f11c5476fc2d7fad4b3af2aaff4263/4001_0_1986_1193/500.png"
                                    alt=""
                                />
                            </div>
                            <div css={iconPanel}>
                                <button
                                    onClick={onCloseClick}
                                    css={closeButton}
                                    data-link-name={closeComponentId}
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
