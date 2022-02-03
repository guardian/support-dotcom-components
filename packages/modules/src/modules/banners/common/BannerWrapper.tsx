import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
    createInsertEventFromTracking,
    createViewEventFromTracking,
} from '@sdc/shared/lib';
import React, { useEffect } from 'react';
import {
    BannerContent,
    BannerProps,
    bannerSchema,
    Cta,
    SecondaryCta,
    SecondaryCtaType,
} from '@sdc/shared/types';
import {
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
} from '@sdc/shared/lib';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';
import {
    BannerId,
    BannerEnrichedCta,
    BannerRenderedContent,
    BannerRenderProps,
    BannerEnrichedSecondaryCta,
} from './types';
import { getComponentIds } from './getComponentIds';
import { withParsedProps } from '../../shared/ModuleWrapper';
import { buildReminderFields } from '@sdc/shared/lib';
import { HasBeenSeen, useHasBeenSeen } from '../../../hooks/useHasBeenSeen';

// A separate article count is rendered as a subheading
const buildSubheading = (
    numArticles: number,
    separateArticleCount: boolean,
): JSX.Element | JSX.Element[] | null => {
    if (separateArticleCount && numArticles >= 5) {
        return replaceArticleCount(
            `You’ve read %%ARTICLE_COUNT%% articles in the last year`,
            numArticles,
            'banner',
        );
    }
    return null;
};

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
        email,
        fetchEmail,
        numArticles = 0,
        tickerSettings,
        isSupporter,
        separateArticleCount,
    } = bannerProps;

    const [hasBeenSeen, setNode] = useHasBeenSeen(
        {
            threshold: 0,
        },
        true,
    ) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen && submitComponentEvent) {
            submitComponentEvent(createViewEventFromTracking(tracking, tracking.campaignCode));
        }
    }, [hasBeenSeen, submitComponentEvent]);

    useEffect(() => {
        if (submitComponentEvent) {
            submitComponentEvent(createInsertEventFromTracking(tracking, tracking.campaignCode));
        }
    }, [submitComponentEvent]);

    const componentIds = getComponentIds(bannerId);

    // For safety, this function throws if not all placeholders are replaced
    const buildRenderedContent = (bannerContent: BannerContent): BannerRenderedContent => {
        const buildEnrichedCta = (cta: Cta): BannerEnrichedCta => ({
            ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(
                cta.baseUrl,
                tracking,
                numArticles,
                countryCode,
            ),
            ctaText: cta.text,
        });

        const buildEnrichedSecondaryCta = (
            secondaryCta: SecondaryCta,
        ): BannerEnrichedSecondaryCta => {
            if (secondaryCta.type === SecondaryCtaType.Custom) {
                return {
                    type: SecondaryCtaType.Custom,
                    cta: buildEnrichedCta(secondaryCta.cta),
                };
            }

            return {
                type: SecondaryCtaType.ContributionsReminder,
                reminderFields: buildReminderFields(),
            };
        };

        const primaryCta = bannerContent.cta ? buildEnrichedCta(bannerContent.cta) : null;
        const secondaryCta = bannerContent.secondaryCta
            ? buildEnrichedSecondaryCta(bannerContent.secondaryCta)
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

        const subheading = buildSubheading(numArticles, !!separateArticleCount);

        if (copyHasPlaceholder) {
            throw Error('Banner copy contains placeholders, abandoning.');
        }

        return {
            highlightedText: highlightedTextWithArticleCount,
            messageText: messageTextWithArticleCount,
            heading: headingWithArticleCount,
            subheading,
            primaryCta,
            secondaryCta,
        };
    };

    const clickHandlerFor = (componentId: string, close: boolean) => {
        return (): void => {
            const componentClickEvent = createClickEventFromTracking(tracking, componentId);
            if (submitComponentEvent) {
                submitComponentEvent(componentClickEvent);
            }
            if (close) {
                onClose();
            }
        };
    };

    const onCtaClick = clickHandlerFor(componentIds.cta, true);
    const onSecondaryCtaClick = clickHandlerFor(componentIds.secondaryCta, true);
    const onReminderCtaClick = clickHandlerFor(componentIds.reminderCta, false);
    const onReminderSetClick = clickHandlerFor(componentIds.reminderSet, false);
    const onReminderCloseClick = clickHandlerFor(componentIds.reminderClose, false);
    const onCloseClick = clickHandlerFor(componentIds.close, true);
    const onNotNowClick = clickHandlerFor(componentIds.notNow, true);
    const onSignInClick = clickHandlerFor(componentIds.signIn, false);

    try {
        const renderedContent = content && buildRenderedContent(content);
        const renderedMobileContent = mobileContent && buildRenderedContent(mobileContent);

        if (renderedContent) {
            const props: BannerRenderProps = {
                onCtaClick,
                onSecondaryCtaClick,
                reminderTracking: {
                    onReminderCtaClick,
                    onReminderSetClick,
                    onReminderCloseClick,
                },
                onCloseClick,
                onSignInClick,
                onNotNowClick,
                content: {
                    mainContent: renderedContent,
                    mobileContent: renderedMobileContent,
                },
                countryCode,
                email,
                fetchEmail,
                tickerSettings,
                isSupporter,
                numArticles,
            };
            return (
                <div ref={setNode}>
                    <Banner {...props} />
                </div>
            );
        }
    } catch (err) {
        console.log(err);
    }

    return null;
};

export const bannerWrapper = (
    Banner: React.FC<BannerRenderProps>,
    bannerId: BannerId,
): React.FC<BannerProps> => withCloseable(withBannerData(Banner, bannerId));

const validate = (props: unknown): props is BannerProps => {
    const result = bannerSchema.safeParse(props);
    return result.success;
};

export const validatedBannerWrapper = (
    Banner: React.FC<BannerRenderProps>,
    bannerId: BannerId,
): React.FC<BannerProps> => {
    const withoutValidation = bannerWrapper(Banner, bannerId);
    return withParsedProps(withoutValidation, validate);
};
