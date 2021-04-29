// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
} from '../../../../lib/tracking';
import React from 'react';
import { BannerContent, BannerProps, Cta } from '../../../../types/BannerTypes';
import {
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
} from '../../../../lib/placeholders';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';
import { replaceArticleCount } from '../../../../lib/replaceArticleCount';

const bannerId = 'contributions-banner';
const closeComponentId = `${bannerId} : close`;
const ctaComponentId = `${bannerId} : cta`;
const secondaryCtaComponentId = `${bannerId} : secondary-cta`;

export interface ContributionsBannerEnrichedCta {
    ctaUrl: string;
    ctaText: string;
}

export interface ContributionsBannerRenderedContent {
    highlightedText: JSX.Element[] | null;
    messageText: JSX.Element[];
    heading: JSX.Element[] | null;
    primaryCta: ContributionsBannerEnrichedCta | null;
    secondaryCta: ContributionsBannerEnrichedCta | null;
}

export interface ContributionsBannerProps {
    onContributeClick: () => void;
    onSecondaryCtaClick: () => void;
    onCloseClick: () => void;
    content: ContributionsBannerRenderedContent;
    mobileContent?: ContributionsBannerRenderedContent;
}

const withBannerData = (
    Banner: React.FC<ContributionsBannerProps>,
): React.FC<CloseableBannerProps> => bannerProps => {
    const {
        tracking,
        submitComponentEvent,
        onClose,
        content,
        mobileContent,
        countryCode,
        numArticles = 0,
    } = bannerProps;

    // For safety, this function throws if not all placeholders are replaced
    const buildRenderedContent = (
        bannerContent: BannerContent,
    ): ContributionsBannerRenderedContent => {
        const buildEnrichedCta = (cta: Cta): ContributionsBannerEnrichedCta => ({
            ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(cta.baseUrl, tracking, countryCode),
            ctaText: cta.text,
        });

        const primaryCta = bannerContent.cta ? buildEnrichedCta(bannerContent.cta) : null;
        const secondaryCta = bannerContent.secondaryCta
            ? buildEnrichedCta(bannerContent.secondaryCta)
            : null;

        const cleanHighlightedText =
            bannerContent.highlightedText &&
            replaceNonArticleCountPlaceholders(bannerContent.highlightedText, countryCode).trim();

        const cleanMessageText = replaceNonArticleCountPlaceholders(
            bannerContent.messageText,
            countryCode,
        ).trim();

        const cleanHeading = replaceNonArticleCountPlaceholders(
            bannerContent.heading,
            countryCode,
        ).trim();

        const copyHasPlaceholder =
            containsNonArticleCountPlaceholder(cleanMessageText) ||
            (!!cleanHighlightedText && containsNonArticleCountPlaceholder(cleanHighlightedText)) ||
            (!!cleanHeading && containsNonArticleCountPlaceholder(cleanHeading));

        const headingWithArticleCount = !!cleanHeading
            ? replaceArticleCount(cleanHeading, numArticles, 'banner')
            : null;
        const messageTextWithArticleCount = replaceArticleCount(
            cleanMessageText,
            numArticles,
            'banner',
        );
        const highlightedTextWithArticleCount = !!cleanHighlightedText
            ? replaceArticleCount(cleanHighlightedText, numArticles, 'banner')
            : null;

        if (copyHasPlaceholder) {
            throw Error('Banner copy contains placeholders, abandoning.');
        }

        return {
            highlightedText: highlightedTextWithArticleCount,
            messageText: messageTextWithArticleCount,
            heading: headingWithArticleCount,
            primaryCta,
            secondaryCta,
        };
    };

    const onContributeClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(
            bannerProps.tracking,
            ctaComponentId,
        );
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
    };

    const onSecondaryCtaClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(
            bannerProps.tracking,
            secondaryCtaComponentId,
        );
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
    };

    const onCloseClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(tracking, closeComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        onClose();
    };

    try {
        const renderedContent = content && buildRenderedContent(content);
        const renderedMobileContent = mobileContent && buildRenderedContent(mobileContent);

        if (renderedContent) {
            const props: ContributionsBannerProps = {
                onContributeClick,
                onSecondaryCtaClick,
                onCloseClick,
                content: renderedContent,
                mobileContent: renderedMobileContent,
            };
            return <Banner {...props} />;
        }
    } catch (err) {
        console.log(err);
    }

    return null;
};

const contributionsBannerWrapper = (
    Banner: React.FC<ContributionsBannerProps>,
): React.FC<BannerProps> => withCloseable(withBannerData(Banner), 'contributions');

export default contributionsBannerWrapper;
