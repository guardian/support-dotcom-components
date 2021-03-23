import React, { useState } from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { Container } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { SvgArrowDownStraight, SvgArrowUpStraight } from '@guardian/src-icons';
import { createClickEventFromTracking } from '../../../../lib/tracking';
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
    collapseButton,
    heading,
    headingSection,
    hide,
    imageContainer,
    minimisedBanner,
    minimisedContentContainer,
    minimiseHint,
    squaresContainer,
} from './puzzlesBannerStyles';
import { appStore, packshot } from './images';
import { setBannerState, getBannerState } from '../localStorage';

type AppStore = 'apple' | 'google';

const bannerId = 'puzzles-banner';
// const minimiseComponentId = `${bannerId} : minimise/expand`;
const appStoreComponentIds: { [key in AppStore]: string } = {
    apple: `${bannerId} : apple app store`,
    google: `${bannerId} : google play store`,
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
    const isKeyboardUser = useTabDetection();

    const hideOnMinimise = isMinimised ? hide : '';
    const hideOnExpand = isMinimised ? '' : hide;

    function onAppStoreClick(store: AppStore) {
        return function handleAppStoreClick() {
            const componentClickEvent = createClickEventFromTracking(
                tracking,
                appStoreComponentIds[store],
            );
            if (submitComponentEvent) {
                submitComponentEvent(componentClickEvent);
            }
        };
    }

    function collapse() {
        setIsMinimised(!isMinimised);
        setBannerState(!isMinimised);
    }

    const CollapseButton = (
        <Button
            size="small"
            cssOverrides={collapseButton}
            icon={isMinimised ? <SvgArrowUpStraight /> : <SvgArrowDownStraight />}
            onClick={collapse}
            hideLabel
        >
            Minimise
        </Button>
    );

    // Enable keyboard users to collapse the banner quickly
    useEscapeShortcut(() => {
        if (!isMinimised) {
            collapse();
        }
    });

    return (
        <CacheProvider value={emotionCache}>
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
                                <a
                                    href="http://"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={onAppStoreClick('apple')}
                                >
                                    <img
                                        src={appStore.apple}
                                        alt="Download on the Apple App Store"
                                    />
                                </a>
                                <a
                                    href="http://"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={onAppStoreClick('google')}
                                >
                                    <img src={appStore.google} alt="Get it on Google Play" />
                                </a>
                            </div>
                            {isKeyboardUser && (
                                <p css={minimiseHint}>Hit escape to minimise this banner</p>
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
                            <TabletDesktopSquares collapseButton={CollapseButton} />
                        </div>
                    </div>
                </Container>
                <MobileSquares collapseButton={CollapseButton} cssOverrides={hideOnMinimise} />
                <div css={[hideOnExpand, minimisedContentContainer]}>
                    <MinimisedContentSquare collapseButton={CollapseButton} />
                    <MinimisedBorderSquares />
                </div>
            </section>
        </CacheProvider>
    );
};
