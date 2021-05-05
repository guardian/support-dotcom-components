import React, { useEffect, useState } from 'react';
import { Container } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { SvgArrowDownStraight, SvgArrowUpStraight, SvgInfo } from '@guardian/src-icons';
import {
    createClickEventFromTracking,
    createViewEventFromTracking,
} from '../../../../lib/tracking';
import { PuzzlesBannerProps } from '../../../../types/BannerTypes';
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
    headingSection,
    hide,
    imageContainer,
    minimisedBanner,
    minimiseButton,
    minimisedContentContainer,
    minimiseHint,
    squaresContainer,
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

const desktopPackshot = {
    url: packshot.desktop,
    media: '(min-width: 980px)',
};

const tabletPackshot = {
    url: packshot.tablet,
    media: '(max-width: 979px)',
    alt: 'The Guardian Puzzles app on mobile devices',
};

export const PuzzlesBanner: React.FC<PuzzlesBannerProps> = ({ tracking, submitComponentEvent }) => {
    const [isMinimised, setIsMinimised] = useState<boolean>(getBannerState());
    const isKeyboardUser = useTabDetection();

    const hideOnMinimise = isMinimised ? hide : '';
    const hideOnExpand = isMinimised ? '' : hide;

    // Exclude IE
    if (window?.navigator?.userAgent?.match(/MSIE|Trident/)) {
        return null;
    }

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

    const MinimiseButton = (
        <Button
            size="small"
            cssOverrides={minimiseButton}
            icon={isMinimised ? <SvgArrowUpStraight /> : <SvgArrowDownStraight />}
            onClick={minimise}
            hideLabel
        >
            Minimise
        </Button>
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
        <section css={[banner, isMinimised ? minimisedBanner : '']}>
            <Container css={hideOnMinimise}>
                <div css={[bannerContents, hideOnMinimise]}>
                    <div css={[headingSection, hideOnMinimise]}>
                        <h3 css={heading}>
                            Discover
                            <br />
                            The&nbsp;Guardian
                            <br />
                            Puzzles&nbsp;App
                        </h3>
                        <div css={appStoreButtonContainer}>
                            <Link
                                href="https://apps.apple.com/app/apple-store/id1487780661?pt=304191&ct=Puzzles_Banner&mt=8"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleAppStoreClickFor('apple')}
                            >
                                <img src={appStore.apple} alt="Download on the Apple App Store" />
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
                        {isKeyboardUser && (
                            <p css={minimiseHint}>
                                <SvgInfo /> You can minimise this banner using the escape key
                            </p>
                        )}
                    </div>
                    <div css={[squaresContainer, hideOnMinimise]}>
                        <ContentSquares />
                        <div css={imageContainer}>
                            <ResponsiveImage
                                images={[tabletPackshot, desktopPackshot]}
                                baseImage={tabletPackshot}
                            />
                        </div>
                        <TabletDesktopSquares minimiseButton={MinimiseButton} />
                    </div>
                </div>
            </Container>
            <MobileSquares minimiseButton={MinimiseButton} cssOverrides={hideOnMinimise} />
            <div css={[hideOnExpand, minimisedContentContainer]}>
                <MinimisedContentSquare minimiseButton={MinimiseButton} />
                <MinimisedBorderSquares />
            </div>
        </section>
    );
};
