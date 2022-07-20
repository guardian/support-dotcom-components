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

export enum TopReaderArticleCountTestVariant {
    CONTROL,
    V1_AC_LEAD,
    V2_CONGRATS_LEAD,
}

// A separate article count is rendered as a subheading
const buildSubheading = (
    numArticles: number,
    separateArticleCount: boolean,
    topReaderAcTestVariant: TopReaderArticleCountTestVariant,
): JSX.Element | JSX.Element[] | null => {
    if (separateArticleCount && numArticles >= 5) {
        return replaceArticleCount(
            getArticleCountSubheading(numArticles, topReaderAcTestVariant),
            numArticles,
            'banner',
        );
    }
    return null;
};

const getArticleCountSubheading = (
    numArticles: number,
    variant: TopReaderArticleCountTestVariant,
): string => {
    if (numArticles < 50 || variant === TopReaderArticleCountTestVariant.CONTROL) {
        return "You've read %%ARTICLE_COUNT%% articles in the last year";
    }

    if (variant === TopReaderArticleCountTestVariant.V1_AC_LEAD) {
        return "You've read %%ARTICLE_COUNT%% articles in the last year - congratulations on being one of our top readers";
    }

    // else variant is V2_CONGRATS_LEAD
    return "Congratulations on being one of our top readers - you've read %%ARTICLE_COUNT%% articles in the last year ";
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

const withBannerData = (
    Banner: React.FC<BannerRenderProps>,
    bannerId: BannerId,
    topReaderAcTestVariant: TopReaderArticleCountTestVariant,
): React.FC<CloseableBannerProps> => bannerProps => {
    const {
        tracking,
        submitComponentEvent,
        onClose,
        content,
        mobileContent,
        countryCode,
        prices,
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

    const cleanParagraphsOrMessageText = (
        paras: string[] | undefined,
        text: string | undefined,
    ): string[] => {
        const originalCopy = getParagraphsOrMessageText(paras, text);

        return originalCopy.map(p =>
            replaceNonArticleCountPlaceholders(p, countryCode, prices).trim(),
        );
    };

    const finaliseParagraphs = (paras: string[]): (Array<JSX.Element> | JSX.Element)[] => {
        return paras.map(p => replaceArticleCount(p, numArticles, 'banner'));
    };

    const paragraphsContainNonArticleCountPlaceholder = (paras: string[]): boolean =>
        paras.some(p => containsNonArticleCountPlaceholder(p));

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
            (!!cleanHighlightedText && containsNonArticleCountPlaceholder(cleanHighlightedText)) ||
            (!!cleanHeading && containsNonArticleCountPlaceholder(cleanHeading));

        const headingWithArticleCount = !!cleanHeading
            ? replaceArticleCount(cleanHeading, numArticles, 'banner')
            : null;

        const highlightedTextWithArticleCount = !!cleanHighlightedText
            ? replaceArticleCount(cleanHighlightedText, numArticles, 'banner')
            : null;

        const subheading = buildSubheading(
            numArticles,
            !!separateArticleCount,
            topReaderAcTestVariant,
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
                    mobileContent: renderedMobileContent ?? renderedContent,
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
    topReaderAcTestVariant: TopReaderArticleCountTestVariant = TopReaderArticleCountTestVariant.CONTROL,
): React.FC<BannerProps> => withCloseable(withBannerData(Banner, bannerId, topReaderAcTestVariant));

const validate = (props: unknown): props is BannerProps => {
    const result = bannerSchema.safeParse(props);
    return result.success;
};

export const validatedBannerWrapper = (
    Banner: React.FC<BannerRenderProps>,
    bannerId: BannerId,
    topReaderAcTestVariant: TopReaderArticleCountTestVariant = TopReaderArticleCountTestVariant.CONTROL,
): React.FC<BannerProps> => {
    const withoutValidation = bannerWrapper(Banner, bannerId, topReaderAcTestVariant);
    return withParsedProps(withoutValidation, validate);
};
