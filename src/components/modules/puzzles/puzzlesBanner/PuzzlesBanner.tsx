import React, { useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { Container } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { SvgArrowDownStraight, SvgArrowUpStraight, SvgInfo } from '@guardian/src-icons';
import {
    createClickEventFromTracking,
    createViewEventFromTracking,
} from '../../../../lib/tracking';
import { PuzzlesBannerProps } from '../../../../types/BannerTypes';
import { gridPrefixerPlugin } from '../../../../utils/gridPrefixerPlugin';
import { ResponsiveImage } from '../../../ResponsiveImage';
import { useEscapeShortcut } from '../../../hooks/useEscapeShortcut';
import { useTabDetection } from '../../../hooks/useTabDetection';
import { MobileSquares } from './squares/MobileSquares';
import { TabletDesktopSquares } from './squares/TabletDesktopSquares';
import { ContentSquares } from './squares/ContentSquares';
import { MinimisedContentSquare } from './squares/MinimisedContentSquare';
import { MinimisedBorderSquares } from './squares/MinimisedBorderSquares';
import {
    appStoreButtonContainer,
    banner,
    bannerContents,
    heading,
    headerFlex,
    headingSection,
    hide,
    imageContainer,
    minimisedBanner,
    minimiseButton,
    minimiseButtonMax,
    minimiseButtonMin,
    mobileMinimiseButton,
    minimisedContentContainer,
    minimiseHint,
    squaresContainer,
    siteMessage,
    signInLink,
    desktopText,
} from './puzzlesBannerStyles';
import { appStore, packshot } from './images';
import { setBannerState, getBannerState } from '../localStorage';

type AppStore = 'apple' | 'google';
type BannerState = 'minimised' | 'expanded';
type BannerStateChange = 'minimise' | 'expand';

const bannerId = 'puzzles-banner';

const appStoreComponentIds: { [key in AppStore]: string } = {
    apple: `${bannerId} : apple app store`,
    google: `${bannerId} : google play store`,
};

const bannerStateComponentIds: { [key in BannerState]: string } = {
    minimised: `${bannerId} : minimised`,
    expanded: `${bannerId} : expanded`,
};

const bannerStateChangeComponentIds: { [key in BannerStateChange]: string } = {
    minimise: `${bannerId} : minimise`,
    expand: `${bannerId} : expand`,
};

// A custom Emotion cache to allow us to run a custom prefixer for CSS grid on IE11
const emotionCache = createCache({
    stylisPlugins: [gridPrefixerPlugin()],
});

const desktopPackshot = {
    url: packshot.desktop,
    media: '(min-width: 980px)',
};

const tabletPackshot = {
    url: packshot.tablet,
    media: '(max-width: 979px)',
    alt: 'The Guardian Puzzles app on mobile devices',
};

const signInUrl = `https://profile.theguardian.com/signin?`; // Need to add appropriate utm tracking to this link
const signInComponentId = `${bannerId} : sign in`;

export const PuzzlesBanner: React.FC<PuzzlesBannerProps> = ({ tracking, submitComponentEvent }) => {
    const [isMinimised, setIsMinimised] = useState<boolean>(getBannerState());

    const hideOnMinimise = isMinimised ? hide : '';
    const hideOnExpand = isMinimised ? '' : hide;
    const isKeyboardUser = useTabDetection();

    function handleAppStoreClickFor(store: AppStore) {
        return function onAppStoreClick() {
            const componentClickEvent = createClickEventFromTracking(
                tracking,
                appStoreComponentIds[store],
            );
            if (submitComponentEvent) {
                submitComponentEvent(componentClickEvent);
            }
        };
    }

    function onBannerView(bannerState: BannerState) {
        const componentViewEvent = createViewEventFromTracking(
            tracking,
            bannerStateComponentIds[bannerState],
        );
        if (submitComponentEvent) {
            submitComponentEvent(componentViewEvent);
        }
    }

    function onMinimiseClick(stateChange: BannerStateChange) {
        const componentClickEvent = createClickEventFromTracking(
            tracking,
            bannerStateChangeComponentIds[stateChange],
        );
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
    }

    function minimise() {
        const stateChange: BannerStateChange = isMinimised ? 'expand' : 'minimise';
        setIsMinimised(!isMinimised);
        setBannerState(!isMinimised);
        onMinimiseClick(stateChange);
    }

    const onSignInClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        evt.preventDefault();
        const componentClickEvent = createClickEventFromTracking(tracking, signInComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
        window.location.href = signInUrl;
    };

    const MinimiseButton = (
        <Button
            size="xsmall"
            cssOverrides={
                isMinimised
                    ? [minimiseButton, minimiseButtonMin]
                    : [minimiseButton, minimiseButtonMax]
            }
            icon={isMinimised ? <SvgArrowUpStraight /> : <SvgArrowDownStraight />}
            onClick={minimise}
            hideLabel
        >
            Minimise
        </Button>
    );

    const MinimiseHint = (
        <p css={minimiseHint}>
            <SvgInfo /> You can minimise this banner using the escape key
        </p>
    );

    // Enable keyboard users to minimise the banner quickly
    useEscapeShortcut(() => {
        if (!isMinimised) {
            minimise();
        }
    }, [isMinimised]);

    useEffect(() => {
        const bannerLoadState: BannerState = isMinimised ? 'minimised' : 'expanded';
        onBannerView(bannerLoadState);
    }, []);

    return (
        <CacheProvider value={emotionCache}>
            <section css={[banner, isMinimised ? minimisedBanner : '']}>
                <Container css={hideOnMinimise}>
                    <div css={[bannerContents, hideOnMinimise]}>
                        <div css={[headingSection, hideOnMinimise]}>
                            <div css={headerFlex}>
                                <h3 css={heading}>
                                    Discover
                                    <br />
                                    The&nbsp;Guardian
                                    <br />
                                    Puzzles&nbsp;App
                                </h3>
                                <div css={mobileMinimiseButton}>{MinimiseButton}</div>
                            </div>
                            <div css={appStoreButtonContainer}>
                                <Link
                                    href="https://apps.apple.com/app/apple-store/id1487780661?pt=304191&ct=Puzzles_Banner&mt=8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleAppStoreClickFor('apple')}
                                >
                                    <img
                                        src={appStore.apple}
                                        alt="Download on the Apple App Store"
                                    />
                                </Link>
                                <Link
                                    href="https://play.google.com/store/apps/details?id=uk.co.guardian.puzzles&referrer=utm_source%3Dtheguardian.com%26utm_medium%3Dpuzzle_banner%26utm_campaign%3DUS2020"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleAppStoreClickFor('google')}
                                >
                                    <img src={appStore.google} alt="Get it on Google Play" />
                                </Link>
                            </div>
                            <div css={siteMessage}>
                                Already a subscriber?{' '}
                                <Link
                                    href={signInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    css={signInLink}
                                    data-link-name={signInComponentId}
                                    onClick={onSignInClick}
                                >
                                    Sign in
                                </Link>{' '}
                                to not see this <span css={desktopText}>again</span>
                            </div>
                        </div>
                        <div css={[squaresContainer, hideOnMinimise]}>
                            <ContentSquares minimiseButton={MinimiseButton} />
                            <div css={imageContainer}>
                                <ResponsiveImage
                                    images={[tabletPackshot, desktopPackshot]}
                                    baseImage={tabletPackshot}
                                />
                            </div>
                            <TabletDesktopSquares
                                minimiseHint={MinimiseHint}
                                isKeyboardUser={isKeyboardUser}
                            />
                        </div>
                    </div>
                </Container>
                <MobileSquares cssOverrides={hideOnMinimise} />
                <div css={[hideOnExpand, minimisedContentContainer]}>
                    <MinimisedContentSquare />
                    <MinimisedBorderSquares minimiseButton={MinimiseButton} />
                </div>
            </section>
        </CacheProvider>
    );
};
