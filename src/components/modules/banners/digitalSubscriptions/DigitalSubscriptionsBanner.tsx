// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
} from '../../../../lib/tracking';
import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import { Button, LinkButton, buttonBrand, buttonReaderRevenue } from '@guardian/src-button';
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
import { useEscapeShortcut } from '../../../hooks/useEscapeShortcut';
import { BannerProps } from '../../../../types/BannerTypes';
import { setChannelClosedTimestamp } from '../localStorage';
import { ResponsiveImage } from '../../../ResponsiveImage';
import { replaceArticleCount } from '../../../../lib/replaceArticleCount';
import { containsNonArticleCountPlaceholder } from '../../../../lib/placeholders';

const subscriptionUrl = 'https://support.theguardian.com/subscribe/digital';
const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'subscription-banner';
const ctaComponentId = `${bannerId} : cta`;
const notNowComponentId = `${bannerId} : not now`;
const closeComponentId = `${bannerId} : close`;
const signInComponentId = `${bannerId} : sign in`;

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

const fallbackHeading = 'Start a digital subscription today';
const fallbackMessageText =
    'Millions have turned to the Guardian for vital, independent journalism in the last year. Reader funding powers our reporting. It protects our independence and ensures we can remain open for all. With <strong>a digital subscription starting from £5.99 a month</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps.';
const fallbackCta = 'Subscribe';
const fallbackSecondaryCta = 'Not now';

export const DigitalSubscriptionsBanner: React.FC<BannerProps> = ({
    bannerChannel,
    content,
    tracking,
    submitComponentEvent,
    countryCode,
    numArticles = 0,
}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);

    const mobileImg = getMobileImg(countryCode);
    const baseImg = getBaseImg(countryCode);
    const subscriptionUrlWithTracking = addRegionIdAndTrackingParamsToSupportUrl(
        subscriptionUrl,
        tracking,
        countryCode,
    );

    const cleanHeadingText = containsNonArticleCountPlaceholder(content?.heading || '')
        ? fallbackHeading
        : content?.heading || '';

    const cleanMessageText = containsNonArticleCountPlaceholder(content?.messageText || '')
        ? fallbackMessageText
        : content?.messageText || '';

    const onSubscribeClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(tracking, ctaComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
    };

    const onSignInClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(tracking, signInComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
    };

    const onCloseClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(tracking, closeComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setChannelClosedTimestamp(bannerChannel);
    };

    const onNotNowClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(tracking, notNowComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setChannelClosedTimestamp(bannerChannel);
    };

    useEscapeShortcut(onCloseClick, []);

    return (
        <>
            {showBanner ? (
                <section css={banner} data-target={bannerId}>
                    <Container>
                        <Columns cssOverrides={columns} collapseBelow="tablet">
                            <Column cssOverrides={topLeftComponent} width={7 / 12}>
                                <h3 css={heading}>
                                    {replaceArticleCount(
                                        cleanHeadingText || '',
                                        numArticles,
                                        'banner',
                                    )}
                                </h3>
                                <p css={messageText}>
                                    {replaceArticleCount(
                                        cleanMessageText || '',
                                        numArticles,
                                        'banner',
                                    )}
                                </p>
                                <Inline space={3}>
                                    <ThemeProvider theme={buttonReaderRevenue}>
                                        <LinkButton
                                            href={subscriptionUrlWithTracking}
                                            onClick={onSubscribeClick}
                                        >
                                            {content?.cta?.text || fallbackCta}
                                        </LinkButton>
                                    </ThemeProvider>
                                    <ThemeProvider theme={buttonBrand}>
                                        <Button
                                            priority="subdued"
                                            data-link-name={notNowComponentId}
                                            onClick={onNotNowClick}
                                        >
                                            {content?.secondaryCta?.text || fallbackSecondaryCta}
                                        </Button>
                                    </ThemeProvider>
                                </Inline>
                                <div css={siteMessage}>
                                    Already a subscriber?{' '}
                                    <ThemeProvider theme={linkBrand}>
                                        <Link
                                            href={signInUrl}
                                            data-link-name={signInComponentId}
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
                                            data-link-name={closeComponentId}
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
            ) : null}
        </>
    );
};
