import React, { useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { Container } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { SvgArrowDownStraight, SvgArrowUpStraight } from '@guardian/src-icons';
import {
    createClickEventFromTracking,
    createViewEventFromTracking,
} from '../../../../lib/tracking';
import { PuzzlesBannerProps } from '../../../../types/BannerTypes';
import { gridPrefixerPlugin } from '../../../../utils/gridPrefixerPlugin';
import { ResponsiveImage } from '../../../ResponsiveImage';
import { useEscapeShortcut } from '../../../hooks/useEscapeShortcut';
import { MobileSquares } from './squares/MobileSquares';
import { TabletDesktopSquares } from './squares/TabletDesktopSquares';
import { ContentSquares } from './squares/ContentSquares';
import { MinimisedContentSquare } from './squares/MinimisedContentSquare';
import { MinimisedBorderSquares } from './squares/MinimisedBorderSquares';
import {
    banner,
    bannerContents,
    hide,
    imageContainer,
    minimisedBanner,
    minimiseButton,
    minimiseButtonMin,
    minimiseButtonMax,
    minimisedContentContainer,
    squaresContainer,
} from './puzzlesBannerStyles';
import { packshot } from './images';
import { setBannerState, getBannerState } from '../localStorage';
import PuzzlesBannerHeader from './PuzzlesBannerHeader';

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

export const PuzzlesBanner: React.FC<PuzzlesBannerProps> = ({ tracking, submitComponentEvent }) => {
    const [isMinimised, setIsMinimised] = useState<boolean>(getBannerState());

    const hideOnMinimise = isMinimised ? hide : '';
    const hideOnExpand = isMinimised ? '' : hide;

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
                        <PuzzlesBannerHeader
                            handleAppStoreClickFor={handleAppStoreClickFor}
                            minimiseButton={MinimiseButton}
                            hideOnMinimise={hideOnMinimise}
                        />
                        <div css={[squaresContainer, hideOnMinimise]}>
                            <ContentSquares minimiseButton={MinimiseButton} />
                            <div css={imageContainer}>
                                <ResponsiveImage
                                    images={[tabletPackshot, desktopPackshot]}
                                    baseImage={tabletPackshot}
                                />
                            </div>
                            <TabletDesktopSquares />
                        </div>
                    </div>
                </Container>
                <MobileSquares cssOverrides={hideOnMinimise} />
                <div css={[hideOnExpand, minimisedContentContainer]}>
                    <MinimisedContentSquare minimiseButton={MinimiseButton} />
                    <MinimisedBorderSquares />
                </div>
            </section>
        </CacheProvider>
    );
};
