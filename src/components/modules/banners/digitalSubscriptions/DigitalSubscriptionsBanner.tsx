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
import { BannerProps } from '../BannerTypes';
import { setSubscriptionsBannerClosedTimestamp } from '../localStorage';
import { getSignInUrl, getSubscriptionUrl } from '../subscriptionsTracking';

export const DigitalSubscriptionsBanner: React.FC<BannerProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tracking,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isSupporter,
}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);
    const closeBanner = (): void => {
        setShowBanner(false);
        setSubscriptionsBannerClosedTimestamp();
    };
    const signInUrl = getSignInUrl('DigitalSubscription');
    const subscriptionsUrl = getSubscriptionUrl(
        'DigitalSubscription',
        tracking.ophanPageId,
        tracking.referrerUrl,
    );

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
                                The world is changing by the minute.{' '}
                                <br className={headLineBreak} />
                                Keep up with a digital subscription.
                            </h3>
                            <p className={paragraph}>
                                Two Guardian apps, with you every day. <strong>The Daily</strong>,
                                joining you in the morning to share politics, culture, food and
                                opinion. <strong>Live</strong>, constantly by your side, keeping you
                                connected with the outside world.
                            </p>
                            <a className={linkStyle} href={subscriptionsUrl}>
                                <div
                                    id="js-site-message--subscription-banner__cta"
                                    data-link-name="subscription-banner : cta"
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
                                id="js-site-message--subscription-banner__cta-dismiss"
                                data-link-name="subscription-banner : not now"
                                onClick={(): void => closeBanner()}
                            >
                                Not now
                            </button>
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
                                    onClick={(): void => closeBanner()}
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
