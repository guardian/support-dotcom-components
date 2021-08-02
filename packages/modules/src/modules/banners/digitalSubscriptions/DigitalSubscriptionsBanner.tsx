// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import {
	Button,
	LinkButton,
	buttonBrand,
	buttonReaderRevenue,
} from '@guardian/src-button';
import { Link, linkBrand } from '@guardian/src-link';
import { SvgGuardianLogo } from '@guardian/src-brand';
import { SvgCross } from '@guardian/src-icons';
import {
	banner,
	columns,
	topLeftComponent,
	bottomRightComponent,
	heading,
	messageText,
	siteMessage,
	packShotContainer,
	packShot,
	iconPanel,
	logoContainer,
	closeButton,
	closeButtonContainer,
} from './digitalSubscriptionsBannerStyles';
import { ResponsiveImage } from '../../shared/ResponsiveImage';
import { BannerText } from '../common/BannerText';
import { BannerContentRenderer } from '../common/BannerContentRenderer';
import { BannerRenderProps } from '../common/types';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import { getComponentIds } from '../common/getComponentIds';
import { SecondaryCtaType } from '@sdc/shared/types';

const signInUrl =
	'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'subscription-banner';
const componentIds = getComponentIds(bannerId);

const ausMobImg =
	'https://i.guim.co.uk/img/media/155b9ad007e59571fe9c60218246ddf8c758e1f8/0_12_1894_1137/500.png?width=400&quality=85&s=206fa8b876a4929ed268504a9bc1695e';
const ausBaseImg =
	'https://i.guim.co.uk/img/media/287779fce55ae40d86d0041d93d259ce9bcf631b/0_0_2320_1890/500.png?width=500&quality=85&s=19f098f42624a9efc6758413e83a86c0';
const rowMobImg =
	'https://i.guim.co.uk/img/media/3e6ecc7e48f11c5476fc2d7fad4b3af2aaff4263/4001_0_1986_1193/500.png?width=400&quality=85&s=dd8a60d6bd0bf82ff17807736f016b56';
const rowBaseImg =
	'https://i.guim.co.uk/img/media/22841f3977aedb85be7b0cf442747b1da51f780f/0_0_2320_1890/500.png?width=500&quality=85&s=ea72f5bae5069da178db8bacc11de720';

interface Img {
	url: string;
	media: string;
}

const getMobileImg = (countryCode: string | undefined): Img => ({
	url: countryCode === 'AU' ? ausMobImg : rowMobImg,
	media: '(max-width: 739px)',
});

const getBaseImg = (countryCode: string | undefined): Img => ({
	url: countryCode === 'AU' ? ausBaseImg : rowBaseImg,
	media: '(min-width: 740px)',
});

const fallbackCta = 'Subscribe';
const fallbackSecondaryCta = 'Not now';

const DigitalSubscriptionsBanner: React.FC<BannerRenderProps> = ({
	onCtaClick,
	onCloseClick,
	onNotNowClick,
	onSignInClick,
	countryCode,
	content,
}) => {
	const mobileImg = getMobileImg(countryCode);
	const baseImg = getBaseImg(countryCode);

	return (
		<section css={banner} data-target={bannerId}>
			<Container>
				<Columns cssOverrides={columns} collapseBelow="tablet">
					<Column cssOverrides={topLeftComponent} width={7 / 12}>
						<BannerText
							styles={{
								desktop: {
									heading,
									copy: messageText,
								},
							}}
							content={content}
						/>
						<BannerContentRenderer
							content={content}
							render={({ renderContent }) => {
								const { primaryCta, secondaryCta } =
									renderContent;
								return (
									<Inline space={3}>
										<ThemeProvider
											theme={buttonReaderRevenue}
										>
											<LinkButton
												href={primaryCta?.ctaUrl}
												data-link-name={
													componentIds.cta
												}
												onClick={onCtaClick}
											>
												{primaryCta?.ctaText ||
													fallbackCta}
											</LinkButton>
										</ThemeProvider>
										<ThemeProvider theme={buttonBrand}>
											<Button
												priority="subdued"
												data-link-name={
													componentIds.notNow
												}
												onClick={onNotNowClick}
											>
												{(secondaryCta?.type ===
													SecondaryCtaType.Custom &&
													secondaryCta.cta.ctaText) ||
													fallbackSecondaryCta}
											</Button>
										</ThemeProvider>
									</Inline>
								);
							}}
						/>
						<div css={siteMessage}>
							Already a subscriber?{' '}
							<ThemeProvider theme={linkBrand}>
								<Link
									href={signInUrl}
									data-link-name={componentIds.signIn}
									onClick={onSignInClick}
									subdued
								>
									Sign in
								</Link>{' '}
							</ThemeProvider>
							to not see this again
						</div>
					</Column>
					<Column cssOverrides={bottomRightComponent}>
						<div css={packShotContainer}>
							<div css={packShot}>
								<ResponsiveImage
									images={[mobileImg, baseImg]}
									baseImage={baseImg}
								/>
							</div>
						</div>
					</Column>
					<Column width={1 / 12} cssOverrides={closeButtonContainer}>
						<div css={iconPanel}>
							<ThemeProvider theme={buttonBrand}>
								<Button
									size="small"
									cssOverrides={closeButton}
									priority="tertiary"
									onClick={onCloseClick}
									data-link-name={componentIds.close}
									icon={<SvgCross />}
									hideLabel
								>
									Close
								</Button>
							</ThemeProvider>
							<div css={logoContainer}>
								<SvgGuardianLogo />
							</div>
						</div>
					</Column>
				</Columns>
			</Container>
		</section>
	);
};

const wrapped = validatedBannerWrapper(DigitalSubscriptionsBanner, bannerId);

export { wrapped as DigitalSubscriptionsBanner };
