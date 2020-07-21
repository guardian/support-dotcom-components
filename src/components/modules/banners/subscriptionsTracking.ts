type OphanComponentType =
    | 'ACQUISITIONS_ENGAGEMENT_BANNER'
    | 'ACQUISITIONS_THANK_YOU_EPIC'
    | 'ACQUISITIONS_SUBSCRIPTIONS_BANNER';

const COMPONENT_TYPE = 'ACQUISITIONS_SUBSCRIPTIONS_BANNER';

const BANNER_KEY: 'subscription-banner :';
const DISPLAY_EVENT_KEY = `${BANNER_KEY} display`;
const CLICK_EVENT_CTA = `${BANNER_KEY} cta`;
const CLICK_EVENT_CLOSE_NOT_NOW = `${BANNER_KEY} not now`;
const CLICK_EVENT_CLOSE_BUTTON = `${BANNER_KEY} close`;
const CLICK_EVENT_SIGN_IN = `${BANNER_KEY} sign in`;

export const bannerTracking = (): {} => {
    return {
        gaTracking: (): void => trackNonClickInteraction(DISPLAY_EVENT_KEY),

        trackBannerView: (): void => {
            submitViewEvent({
                component: {
                    componentType: COMPONENT_TYPE,
                    id: CLICK_EVENT_CTA,
                },
            });
        },
        trackBannerClick: (button): void => {
            submitClickEvent({
                component: {
                    componentType: COMPONENT_TYPE,
                    id:
                        button.id === 'js-site-message--subscription-banner__cta'
                            ? CLICK_EVENT_CTA
                            : CLICK_EVENT_SIGN_IN,
                },
            });
        },
        trackCloseButtons: (button): void => {
            submitClickEvent({
                component: {
                    componentType: COMPONENT_TYPE,
                    id:
                        button && button.id === 'js-site-message--subscription-banner__close-button'
                            ? CLICK_EVENT_CLOSE_BUTTON
                            : CLICK_EVENT_CLOSE_NOT_NOW,
                },
            });
        },
    };

    return createTracking(region, defaultTracking);
};

////////////////

import ophan from 'ophan/ng';

export const submitComponentEvent = (componentEvent: OphanComponentEvent) => {
    ophan.record({ componentEvent });
};

export const submitInsertEvent = (componentEvent: ComponentEventWithoutAction) =>
    submitComponentEvent({
        ...componentEvent,
        action: 'INSERT',
    });

export const submitViewEvent = (componentEvent: ComponentEventWithoutAction) =>
    submitComponentEvent({
        ...componentEvent,
        action: 'VIEW',
    });

export const submitClickEvent = (componentEvent: ComponentEventWithoutAction) =>
    submitComponentEvent({
        ...componentEvent,
        action: 'CLICK',
    });
