/**
 * Note - zod validators for these ophan types are in /props/shared.ts
 * This is to avoid including zod in the dotcom library
 */
export type OphanProduct =
    | 'CONTRIBUTION'
    | 'RECURRING_CONTRIBUTION'
    | 'MEMBERSHIP_SUPPORTER'
    | 'MEMBERSHIP_PATRON'
    | 'MEMBERSHIP_PARTNER'
    | 'DIGITAL_SUBSCRIPTION'
    | 'PRINT_SUBSCRIPTION';
export type OphanAction =
    | 'INSERT'
    | 'VIEW'
    | 'EXPAND'
    | 'LIKE'
    | 'DISLIKE'
    | 'SUBSCRIBE'
    | 'ANSWER'
    | 'VOTE'
    | 'CLICK'
    | 'ACCEPT_DEFAULT_CONSENT'
    | 'MANAGE_CONSENT'
    | 'CONSENT_ACCEPT_ALL'
    | 'CONSENT_REJECT_ALL'
    | 'STICK'
    | 'CLOSE'
    | 'RETURN'
    | 'SIGN_IN'
    | 'CREATE_ACCOUNT';
export type OphanComponentType =
    | 'READERS_QUESTIONS_ATOM'
    | 'QANDA_ATOM'
    | 'PROFILE_ATOM'
    | 'GUIDE_ATOM'
    | 'TIMELINE_ATOM'
    | 'NEWSLETTER_SUBSCRIPTION'
    | 'SURVEYS_QUESTIONS'
    | 'ACQUISITIONS_EPIC'
    | 'ACQUISITIONS_ENGAGEMENT_BANNER'
    | 'ACQUISITIONS_THANK_YOU_EPIC'
    | 'ACQUISITIONS_HEADER'
    | 'ACQUISITIONS_FOOTER'
    | 'ACQUISITIONS_INTERACTIVE_SLICE'
    | 'ACQUISITIONS_NUGGET'
    | 'ACQUISITIONS_STANDFIRST'
    | 'ACQUISITIONS_THRASHER'
    | 'ACQUISITIONS_EDITORIAL_LINK'
    | 'ACQUISITIONS_MANAGE_MY_ACCOUNT'
    | 'ACQUISITIONS_BUTTON'
    | 'ACQUISITIONS_OTHER'
    | 'APP_ADVERT'
    | 'APP_AUDIO'
    | 'APP_BUTTON'
    | 'APP_CARD'
    | 'APP_CROSSWORDS'
    | 'APP_ENGAGEMENT_BANNER'
    | 'APP_EPIC'
    | 'APP_GALLERY'
    | 'APP_LINK'
    | 'APP_NAVIGATION_ITEM'
    | 'APP_SCREEN'
    | 'APP_THRASHER'
    | 'APP_VIDEO'
    | 'AUDIO_ATOM'
    | 'CHART_ATOM'
    | 'ACQUISITIONS_MERCHANDISING'
    | 'ACQUISITIONS_HOUSE_ADS'
    | 'SIGN_IN_GATE'
    | 'ACQUISITIONS_SUBSCRIPTIONS_BANNER'
    | 'MOBILE_STICKY_AD'
    | 'IDENTITY_AUTHENTICATION'
    | 'RETENTION_ENGAGEMENT_BANNER'
    | 'ACQUISITION_SUPPORT_SITE'
    | 'RETENTION_EPIC'
    | 'CONSENT'
    | 'LIVE_BLOG_PINNED_POST'
    | 'STICKY_VIDEO'
    | 'KEY_EVENT_CARD'
    | 'RETENTION_HEADER'
    | 'SLIDESHOW'
    | 'APP_FEATURE'
    | 'CARD'
    | 'CAROUSEL';

export type OphanComponent = {
    componentType: OphanComponentType;
    id?: string;
    products?: OphanProduct[];
    campaignCode?: string;
    labels?: string[];
};

interface OphanAbTest {
    name: string;
    variant: string;
}

export type OphanComponentEvent = {
    component: OphanComponent;
    action: OphanAction;
    value?: string;
    id?: string;
    abTest?: OphanAbTest;
    targetingAbTest?: OphanAbTest;
};
