export type BannerId = 'contributions-banner' | 'subscription-banner' | 'weekly-banner';

export interface BannerEnrichedCta {
    ctaUrl: string;
    ctaText: string;
}

export interface BannerRenderedContent {
    heading: JSX.Element | JSX.Element[] | null;
    messageText: JSX.Element | JSX.Element[];
    highlightedText?: JSX.Element[] | null;
    primaryCta: BannerEnrichedCta | null;
    secondaryCta: BannerEnrichedCta | null;
}

export interface BannerTextContent {
    mainContent: BannerRenderedContent;
    mobileContent?: BannerRenderedContent;
}

export interface BannerRenderProps {
    onCtaClick: () => void;
    onSecondaryCtaClick: () => void;
    onNotNowClick: () => void;
    onCloseClick: () => void;
    onSignInClick?: () => void;
    content: BannerTextContent;
    countryCode?: string;
}
