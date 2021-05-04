import React, { useState, ReactElement } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import { Button, LinkButton, buttonReaderRevenue } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { SvgRoundel } from '@guardian/src-brand';
import { SvgCross } from '@guardian/src-icons';
import {
    banner,
    columns,
    topLeftComponent,
    heading,
    iconAndClosePosition,
    logoContainer,
    paragraph,
    siteMessage,
    bottomRightComponent,
    packShotContainer,
} from './guardianWeeklyBannerStyles';
import { BannerProps } from '../../../../types/BannerTypes';
import { setChannelClosedTimestamp } from '../localStorage';
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
} from '../../../../lib/tracking';
import { ResponsiveImage } from '../../../ResponsiveImage';

const subscriptionUrl = 'https://support.theguardian.com/subscribe/weekly';
const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_gWeekly&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'weekly-banner';
const ctaComponentId = `${bannerId} : cta`;
const notNowComponentId = `${bannerId} : not now`;
const closeComponentId = `${bannerId} : close`;
const signInComponentId = `${bannerId} : sign in`;

const mobileAndDesktopImg =
    'https://i.guim.co.uk/img/media/d544f4e24e4275d3434e6465d8676d2b5bcd0851/128_122_3218_1543/500.png?quality=85&s=718ce35eab4f021fcba8893be654cfda';

const tabletImage =
    'https://i.guim.co.uk/img/media/a213adf3f68f788b3f9434a1e88787fce1fa10bd/322_0_2430_1632/500.png?quality=85&s=70749c1c97ffaac614c1e357d3e7f616';

// Responsive image props
const baseImg = {
    url: mobileAndDesktopImg,
    media: '(min-width: 980px)',
    alt: 'The Guardian Weekly magazine',
};

const images = [
    {
        url: mobileAndDesktopImg,
        media: '(max-width: 739px)',
    },
    {
        url: tabletImage,
        media: '(min-width: 740px) and (max-width: 979px)',
    },
    baseImg,
];

const defaultCta = 'Subscribe';
const defaultSecondaryCta = 'Not now';

type ButtonPropTypes = {
    onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const CloseButton = (props: ButtonPropTypes): ReactElement => (
    <Button
        data-link-name={closeComponentId}
        onClick={props.onClick}
        icon={<SvgCross />}
        size="small"
        priority="tertiary"
        hideLabel
    >
        Close
    </Button>
);

export const GuardianWeeklyBanner: React.FC<BannerProps> = ({
    bannerChannel,
    content,
    tracking,
    submitComponentEvent,
    countryCode,
}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);
    const subscriptionUrlWithTracking = addRegionIdAndTrackingParamsToSupportUrl(
        content?.cta?.baseUrl || subscriptionUrl,
        tracking,
        countryCode,
    );

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

    return (
        <>
            {showBanner ? (
                <section css={banner} data-target={bannerId}>
                    <Container>
                        <Columns cssOverrides={columns} collapseBelow="tablet">
                            <Column width={5 / 12} css={topLeftComponent}>
                                <h3 css={heading}>{content?.heading}</h3>
                                <p css={paragraph}>{content?.messageText}</p>
                                <Inline space={3}>
                                    <ThemeProvider theme={buttonReaderRevenue}>
                                        <LinkButton
                                            data-link-name={ctaComponentId}
                                            onClick={onSubscribeClick}
                                            href={subscriptionUrlWithTracking}
                                        >
                                            {content?.cta?.text || defaultCta}
                                        </LinkButton>
                                    </ThemeProvider>
                                    <Button
                                        priority="subdued"
                                        data-link-name={notNowComponentId}
                                        onClick={onNotNowClick}
                                    >
                                        {content?.secondaryCta?.text || defaultSecondaryCta}
                                    </Button>
                                </Inline>
                                <div css={siteMessage}>
                                    Already a subscriber?{' '}
                                    <Link
                                        data-link-name={signInComponentId}
                                        onClick={onSignInClick}
                                        href={signInUrl}
                                        subdued
                                    >
                                        Sign in
                                    </Link>{' '}
                                    to not see this again
                                </div>
                            </Column>
                            <Column cssOverrides={bottomRightComponent}>
                                <div css={packShotContainer}>
                                    <ResponsiveImage images={images} baseImage={baseImg} />
                                </div>
                            </Column>
                            <div css={iconAndClosePosition}>
                                <Inline space={1}>
                                    <div css={logoContainer}>
                                        <SvgRoundel />
                                    </div>
                                    <CloseButton onClick={onCloseClick} />
                                </Inline>
                            </div>
                        </Columns>
                    </Container>
                </section>
            ) : null}
        </>
    );
};
