// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
} from '../../../../lib/tracking';
import React from 'react';
import { BannerChannel, BannerContent, BannerProps } from '../../../../types/BannerTypes';
import {
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
} from '../../../../lib/placeholders';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';
import { replaceArticleCount } from '../../../../lib/replaceArticleCount';
import { Cta } from '../../../../types/shared';
import { BannerId, BannerEnrichedCta, BannerRenderedContent, BannerRenderProps } from './types';
import { getComponentIds } from './getComponentIds';

const withBannerData = (
    Banner: React.FC<BannerRenderProps>,
    bannerId: BannerId,
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

    const componentIds = getComponentIds(bannerId);

    // For safety, this function throws if not all placeholders are replaced
    const buildRenderedContent = (bannerContent: BannerContent): BannerRenderedContent => {
        const buildEnrichedCta = (cta: Cta): BannerEnrichedCta => ({
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

    const clickHandlerFor = (componentId: string) => {
        return (): void => {
            const componentClickEvent = createClickEventFromTracking(tracking, componentId);
            if (submitComponentEvent) {
                submitComponentEvent(componentClickEvent);
            }
        };
    };

    const onCtaClick = clickHandlerFor(componentIds.cta);

    const onSecondaryCtaClick = clickHandlerFor(componentIds.secondaryCta);

    const onCloseClick = (): void => {
        clickHandlerFor(componentIds.close)();
        onClose();
    };

    const onNotNowClick = (): void => {
        clickHandlerFor(componentIds.notNow)();
        onClose();
    };

    const onSignInClick = clickHandlerFor(componentIds.signIn);

    try {
        const renderedContent = content && buildRenderedContent(content);
        const renderedMobileContent = mobileContent && buildRenderedContent(mobileContent);

        if (renderedContent) {
            const props: BannerRenderProps = {
                onCtaClick,
                onSecondaryCtaClick,
                onCloseClick,
                onSignInClick,
                onNotNowClick,
                content: {
                    mainContent: renderedContent,
                    mobileContent: renderedMobileContent,
                },
                countryCode,
            };
            return <Banner {...props} />;
        }
    } catch (err) {
        console.log(err);
    }

    return null;
};

const bannerWrapper = (
    Banner: React.FC<BannerRenderProps>,
    bannerId: BannerId,
    bannerChannel: BannerChannel,
): React.FC<BannerProps> => withCloseable(withBannerData(Banner, bannerId), bannerChannel);

export default bannerWrapper;
