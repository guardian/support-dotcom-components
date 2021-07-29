// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
	addRegionIdAndTrackingParamsToSupportUrl,
	createClickEventFromTracking,
} from '@sdc/shared/lib';
import React from 'react';
import {
	BannerChannel,
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

const withBannerData =
	(
		Banner: React.FC<BannerRenderProps>,
		bannerId: BannerId,
	): React.FC<CloseableBannerProps> =>
	(bannerProps) => {
		const {
			tracking,
			submitComponentEvent,
			onClose,
			content,
			mobileContent,
			countryCode,
			email,
			numArticles = 0,
			tickerSettings,
			isSupporter,
		} = bannerProps;

		const componentIds = getComponentIds(bannerId);

		// For safety, this function throws if not all placeholders are replaced
		const buildRenderedContent = (
			bannerContent: BannerContent,
		): BannerRenderedContent => {
			const buildEnrichedCta = (cta: Cta): BannerEnrichedCta => ({
				ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(
					cta.baseUrl,
					tracking,
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

			const primaryCta = bannerContent.cta
				? buildEnrichedCta(bannerContent.cta)
				: null;
			const secondaryCta = bannerContent.secondaryCta
				? buildEnrichedSecondaryCta(bannerContent.secondaryCta)
				: null;

			const cleanHighlightedText =
				bannerContent.highlightedText &&
				replaceNonArticleCountPlaceholders(
					bannerContent.highlightedText,
					countryCode,
				).trim();

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
				(!!cleanHighlightedText &&
					containsNonArticleCountPlaceholder(cleanHighlightedText)) ||
				(!!cleanHeading &&
					containsNonArticleCountPlaceholder(cleanHeading));

			const headingWithArticleCount = !!cleanHeading
				? replaceArticleCount(cleanHeading, numArticles, 'banner')
				: null;
			const messageTextWithArticleCount = replaceArticleCount(
				cleanMessageText,
				numArticles,
				'banner',
			);
			const highlightedTextWithArticleCount = !!cleanHighlightedText
				? replaceArticleCount(
						cleanHighlightedText,
						numArticles,
						'banner',
				  )
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
				const componentClickEvent = createClickEventFromTracking(
					tracking,
					componentId,
				);
				if (submitComponentEvent) {
					submitComponentEvent(componentClickEvent);
				}
			};
		};

		const onCtaClick = clickHandlerFor(componentIds.cta);
		const onSecondaryCtaClick = clickHandlerFor(componentIds.secondaryCta);
		const onReminderCtaClick = clickHandlerFor(componentIds.reminderCta);
		const onReminderSetClick = clickHandlerFor(componentIds.reminderSet);
		const onReminderCloseClick = clickHandlerFor(
			componentIds.reminderClose,
		);

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
			const renderedMobileContent =
				mobileContent && buildRenderedContent(mobileContent);

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
					tickerSettings,
					isSupporter,
				};
				return <Banner {...props} />;
			}
		} catch (err) {
			console.log(err);
		}

		return null;
	};

export const bannerWrapper = (
	Banner: React.FC<BannerRenderProps>,
	bannerId: BannerId,
	bannerChannel: BannerChannel,
): React.FC<BannerProps> =>
	withCloseable(withBannerData(Banner, bannerId), bannerChannel);

const validate = (props: unknown): props is BannerProps => {
	const result = bannerSchema.safeParse(props);
	return result.success;
};

export const validatedBannerWrapper = (
	Banner: React.FC<BannerRenderProps>,
	bannerId: BannerId,
	bannerChannel: BannerChannel,
): React.FC<BannerProps> => {
	const withoutValidation = bannerWrapper(Banner, bannerId, bannerChannel);
	return withParsedProps(withoutValidation, validate);
};
