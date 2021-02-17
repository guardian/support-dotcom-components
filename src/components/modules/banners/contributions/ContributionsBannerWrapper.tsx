// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
} from '../../../../lib/tracking';
import React from 'react';
import { BannerProps } from '../../../../types/BannerTypes';
import {
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
} from '../../../../lib/placeholders';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';
import { replaceArticleCount } from '../../../../lib/replaceArticleCount';

const bannerId = 'contributions-banner';
const closeComponentId = `${bannerId} : close`;
const ctaComponentId = `${bannerId} : cta`;

export interface ContributionsBannerProps {
    onContributeClick: () => void;
    onCloseClick: () => void;
    cleanHighlightedText: JSX.Element[] | null;
    cleanMessageText: JSX.Element[];
    cleanMobileMessageText: JSX.Element[] | null;
    cleanHeading: JSX.Element[] | null;
    ctaUrl: string;
    ctaText: string;
}

const withBannerData = (
    Banner: React.FC<ContributionsBannerProps>,
): React.FC<CloseableBannerProps> => bannerProps => {
    const {
        tracking,
        submitComponentEvent,
        onClose,
        content,
        countryCode,
        numArticles = 0,
    } = bannerProps;

    const onContributeClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(
            bannerProps.tracking,
            ctaComponentId,
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

    if (content && countryCode && content.cta) {
        const ctaUrl = addRegionIdAndTrackingParamsToSupportUrl(
            content.cta.baseUrl,
            tracking,
            countryCode,
        );

        const cleanHighlightedText =
            content.highlightedText &&
            replaceNonArticleCountPlaceholders(content.highlightedText, countryCode).trim();

        const cleanMessageText = replaceNonArticleCountPlaceholders(
            content.messageText,
            countryCode,
        ).trim();

        const cleanMobileMessageText = replaceNonArticleCountPlaceholders(
            content.mobileMessageText,
            countryCode,
        ).trim();

        const cleanHeading = replaceNonArticleCountPlaceholders(
            content.heading,
            countryCode,
        ).trim();

        const copyHasPlaceholder =
            containsNonArticleCountPlaceholder(cleanMessageText) ||
            (!!cleanMobileMessageText &&
                containsNonArticleCountPlaceholder(cleanMobileMessageText)) ||
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
        const mobileMessageTextWithArticleCount = !!cleanMobileMessageText
            ? replaceArticleCount(cleanMobileMessageText, numArticles, 'banner')
            : null;
        const highlightedTextWithArticleCount = !!cleanHighlightedText
            ? replaceArticleCount(cleanHighlightedText, numArticles, 'banner')
            : null;

        if (!copyHasPlaceholder) {
            const props: ContributionsBannerProps = {
                onContributeClick,
                onCloseClick,
                cleanHighlightedText: highlightedTextWithArticleCount,
                cleanMessageText: messageTextWithArticleCount,
                cleanMobileMessageText: mobileMessageTextWithArticleCount,
                cleanHeading: headingWithArticleCount,
                ctaUrl,
                ctaText: content.cta.text,
            };
            return <Banner {...props} />;
        } else {
            console.log('Banner copy contains placeholders, abandoning.');
        }
    }

    return null;
};

const contributionsBannerWrapper = (
    Banner: React.FC<ContributionsBannerProps>,
): React.FC<BannerProps> => withCloseable(withBannerData(Banner), 'contributions');

export default contributionsBannerWrapper;
