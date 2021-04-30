import React, { useState, ReactElement } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import { Button, LinkButton, buttonReaderRevenue } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { SvgRoundel } from '@guardian/src-brand';
import { SvgCross } from '@guardian/src-icons';
import {
    banner,
    contentContainer,
    topLeftComponent,
    heading,
    iconAndCloseAlign,
    iconAndClosePosition,
    logoContainer,
    paragraph,
    siteMessage,
    bottomRightComponent,
    packShotContainer,
    packShotTablet,
    packShotMobileAndDesktop,
    linkStyle,
    signInLink,
} from './guardianWeeklyBannerStyles';
import { BannerProps } from '../../../../types/BannerTypes';
import { setChannelClosedTimestamp } from '../localStorage';
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
} from '../../../../lib/tracking';

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

    const onCloseClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
        const componentClickEvent = createClickEventFromTracking(tracking, closeComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setChannelClosedTimestamp(bannerChannel);
    };

    const onNotNowClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
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
                    <Container css={contentContainer}>
                        <Columns collapseBelow="tablet">
                            <Column width={6 / 12} css={topLeftComponent}>
                                <h3 css={heading}>{content?.heading}</h3>
                                <p css={paragraph}>{content?.messageText}</p>
                                <Inline space={1}>
                                    <ThemeProvider theme={buttonReaderRevenue}>
                                        <LinkButton
                                            data-link-name={ctaComponentId}
                                            css={linkStyle}
                                            onClick={onSubscribeClick}
                                            href={subscriptionUrlWithTracking}
                                        >
                                            {content?.cta?.text || 'Subscribe'}
                                        </LinkButton>
                                    </ThemeProvider>
                                    <Button
                                        priority="subdued"
                                        data-link-name={notNowComponentId}
                                        onClick={onNotNowClick}
                                    >
                                        Not now
                                    </Button>
                                </Inline>
                                <div css={siteMessage}>
                                    Already a subscriber?{' '}
                                    <Link
                                        css={signInLink}
                                        data-link-name={signInComponentId}
                                        onClick={onSignInClick}
                                        href={signInUrl}
                                        priority="secondary"
                                        subdued
                                    >
                                        Sign in
                                    </Link>{' '}
                                    to not see this again
                                </div>
                            </Column>
                            <Column width={5 / 12} css={bottomRightComponent}>
                                <div css={packShotContainer}>
                                    <img css={packShotTablet} src={tabletImage} alt="" />
                                    <img
                                        css={packShotMobileAndDesktop}
                                        src={mobileAndDesktopImg}
                                        alt=""
                                    />
                                </div>
                            </Column>
                            <Column width={1 / 12}>
                                <div css={iconAndClosePosition}>
                                    <div css={iconAndCloseAlign}>
                                        <div css={logoContainer}>
                                            <SvgRoundel />
                                        </div>
                                        <CloseButton onClick={onCloseClick} />
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
