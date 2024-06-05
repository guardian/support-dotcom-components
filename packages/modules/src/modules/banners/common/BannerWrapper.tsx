import {
    addRegionIdAndTrackingParamsToSupportUrl,
    addTrackingParamsToProfileUrl,
    createClickEventFromTracking,
    createInsertEventFromTracking,
    createViewEventFromTracking,
    isProfileUrl,
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
    getReminderFields,
} from '@sdc/shared/lib';
import React, { useEffect, useState } from 'react';
import {
    BannerContent,
    BannerProps,
    bannerSchema,
    Cta,
    SecondaryCta,
    SecondaryCtaType,
    Tracking,
} from '@sdc/shared/types';
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
import { HasBeenSeen, useHasBeenSeen } from '../../../hooks/useHasBeenSeen';
import { useScrollDepth } from '../../../hooks/useScrollDepth';
import SlideIn from './SlideIn';
import type { ReactComponent } from '../../../types';
import { ArticleCounts, ArticleCountType } from '@sdc/shared/dist/types';

// A separate article count is rendered as a subheading
const buildSubheading = (
    articleCounts: ArticleCounts,
    numArticles: number,
    separateArticleCount: boolean,
    countType?: ArticleCountType,
): JSX.Element | JSX.Element[] | null => {
    const numOfArticles = articleCounts[countType ?? 'for52Weeks'];
    if (separateArticleCount && numArticles >= 5 && numOfArticles >= 5) {
        return replaceArticleCount(
            `You’ve read %%ARTICLE_COUNT%% articles in the last year`,
            numArticles,
            numOfArticles,
            'banner',
        );
    }
    return null;
};

export const getParagraphsOrMessageText = (
    paras: string[] | undefined,
    text: string | undefined,
): string[] => {
    const bodyCopy = [];

    if (paras != null) {
        bodyCopy.push(...paras);
    } else if (text != null) {
        bodyCopy.push(text);
    }
    return bodyCopy;
};

const scrollDepthForRender = (tracking: Tracking) => {
    const isInTest = tracking.abTestName === 'RENDERDELAY';
    const isInVariant = tracking.abTestVariant === 'VARIANT';

    if (isInTest && isInVariant) {
        return 5;
    }

    return 0;
};

const withBannerData =
    (
        Banner: ReactComponent<BannerRenderProps>,
        bannerId: BannerId,
    ): ReactComponent<CloseableBannerProps> =>
    (bannerProps) => {
        const {
            tracking,
            submitComponentEvent,
            onClose,
            content,
            mobileContent,
            countryCode,
            prices,
            fetchEmail,
            numArticles = 0,
            articleCounts,
            countType,
            tickerSettings,
            isSupporter,
            separateArticleCount,
            choiceCardAmounts,
            design,
        } = bannerProps;

        const [canShow, setCanShow] = useState<boolean>(false);
        const [hasBeenSeen, setNode] = useHasBeenSeen(
            {
                threshold: 0,
            },
            true,
        ) as HasBeenSeen;

        const renderScrollThreshold = scrollDepthForRender(tracking);

        useEffect(() => {
            if (hasBeenSeen && submitComponentEvent) {
                submitComponentEvent(createViewEventFromTracking(tracking, tracking.campaignCode));
            }
        }, [hasBeenSeen, submitComponentEvent]);

        useEffect(() => {
            if (submitComponentEvent) {
                submitComponentEvent(
                    createInsertEventFromTracking(tracking, tracking.campaignCode),
                );
            }
        }, [submitComponentEvent]);

        useScrollDepth(
            (depthPercent) => {
                if (depthPercent >= renderScrollThreshold) {
                    setCanShow(true);
                }
            },
            [],
            1000,
        );

        const cleanParagraphsOrMessageText = (
            paras: string[] | undefined,
            text: string | undefined,
        ): string[] => {
            const originalCopy = getParagraphsOrMessageText(paras, text);

            return originalCopy.map((p) =>
                replaceNonArticleCountPlaceholders(p, countryCode, prices).trim(),
            );
        };

        const finaliseParagraphs = (paras: string[]): (Array<JSX.Element> | JSX.Element)[] => {
            const numOfArticles = articleCounts[countType ?? 'for52Weeks'];
            return paras.map((p) => replaceArticleCount(p, numArticles, numOfArticles, 'banner'));
        };

        const paragraphsContainNonArticleCountPlaceholder = (paras: string[]): boolean =>
            paras.some((p) => containsNonArticleCountPlaceholder(p));

        const componentIds = getComponentIds(bannerId);

        // For safety, this function throws if not all placeholders are replaced
        const buildRenderedContent = (bannerContent: BannerContent): BannerRenderedContent => {
            const buildEnrichedCta = (cta: Cta): BannerEnrichedCta => {
                if (isProfileUrl(cta.baseUrl)) {
                    return {
                        ctaUrl: addTrackingParamsToProfileUrl(cta.baseUrl, tracking),
                        ctaText: cta.text,
                    };
                }

                return {
                    ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(
                        cta.baseUrl,
                        tracking,
                        numArticles,
                        countryCode,
                    ),
                    ctaText: cta.text,
                };
            };

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
                    reminderFields: getReminderFields(countryCode),
                };
            };

            const primaryCta = bannerContent.cta ? buildEnrichedCta(bannerContent.cta) : null;
            const secondaryCta = bannerContent.secondaryCta
                ? buildEnrichedSecondaryCta(bannerContent.secondaryCta)
                : null;

            const cleanHighlightedText =
                bannerContent.highlightedText &&
                replaceNonArticleCountPlaceholders(
                    bannerContent.highlightedText,
                    countryCode,
                    prices,
                ).trim();

            const cleanHeading = replaceNonArticleCountPlaceholders(
                bannerContent.heading,
                countryCode,
                prices,
            ).trim();

            const cleanParagraphs = cleanParagraphsOrMessageText(
                bannerContent.paragraphs,
                bannerContent.messageText,
            );

            const copyHasPlaceholder =
                paragraphsContainNonArticleCountPlaceholder(cleanParagraphs) ||
                (!!cleanHighlightedText &&
                    containsNonArticleCountPlaceholder(cleanHighlightedText)) ||
                (!!cleanHeading && containsNonArticleCountPlaceholder(cleanHeading));

            const numOfArticles = articleCounts[countType ?? 'for52Weeks'];
            const headingWithArticleCount = !!cleanHeading
                ? replaceArticleCount(cleanHeading, numArticles, numOfArticles, 'banner')
                : null;

            const highlightedTextWithArticleCount = !!cleanHighlightedText
                ? replaceArticleCount(cleanHighlightedText, numArticles, numOfArticles, 'banner')
                : null;

            const subheading = buildSubheading(
                articleCounts,
                numArticles,
                !!separateArticleCount,
                countType,
            );

            if (copyHasPlaceholder) {
                throw Error('Banner copy contains placeholders, abandoning.');
            }

            return {
                highlightedText: highlightedTextWithArticleCount,
                paragraphs: finaliseParagraphs(cleanParagraphs),
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

            if (renderedContent && canShow) {
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
                        mobileContent: renderedMobileContent ?? renderedContent,
                    },
                    countryCode,
                    fetchEmail,
                    tickerSettings,
                    isSupporter,
                    numArticles,
                    articleCounts,
                    countType,
                    separateArticleCount,
                    choiceCardAmounts,
                    tracking,
                    submitComponentEvent,
                    design,
                };

                if (renderScrollThreshold > 0) {
                    return (
                        <SlideIn canShow={canShow}>
                            <div ref={setNode}>
                                <Banner {...props} />
                            </div>
                        </SlideIn>
                    );
                }

                return (
                    <div ref={setNode}>
                        <Banner {...props} />
                    </div>
                );
            }
        } catch (err) {
            console.log(err);
        }

        return <></>;
    };

export const bannerWrapper = (
    Banner: ReactComponent<BannerRenderProps>,
    bannerId: BannerId,
): ReactComponent<BannerProps> => withCloseable(withBannerData(Banner, bannerId));

const validate = (props: unknown): props is BannerProps => {
    const result = bannerSchema.safeParse(props);
    return result.success;
};

export const validatedBannerWrapper = (
    Banner: ReactComponent<BannerRenderProps>,
    bannerId: BannerId,
): ReactComponent<BannerProps> => {
    const withoutValidation = bannerWrapper(Banner, bannerId);
    return withParsedProps(withoutValidation, validate);
};
