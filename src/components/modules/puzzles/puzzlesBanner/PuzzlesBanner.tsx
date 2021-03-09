import React, { useState } from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { Container } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { SvgArrowDownStraight, SvgArrowUpStraight } from '@guardian/src-icons';
import { gridPrefixerPlugin } from '../../../../utils/gridPrefixerPlugin';
import { ResponsiveImage } from '../../../ResponsiveImage';
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
    squaresContainer,
} from './puzzlesBannerStyles';
import { appStore, packshot } from './images';

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

export const PuzzlesBanner: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const hideOnCollapse = isCollapsed ? hide : '';
    const hideOnExpand = isCollapsed ? '' : hide;

    function collapse() {
        setIsCollapsed(!isCollapsed);
    }

    const CollapseButton = (
        <Button
            size="small"
            cssOverrides={collapseButton}
            icon={isCollapsed ? <SvgArrowUpStraight /> : <SvgArrowDownStraight />}
            onClick={collapse}
            hideLabel
        >
            Minimise
        </Button>
    );

    return (
        <CacheProvider value={emotionCache}>
            <section css={[banner, isCollapsed ? minimisedBanner : '']}>
                <Container>
                    <div css={[bannerContents, hideOnCollapse]}>
                        <div css={[headingSection, hideOnCollapse]}>
                            <h3 css={heading}>
                                Discover
                                <br />
                                The&nbsp;Guardian
                                <br />
                                Puzzles&nbsp;App
                            </h3>
                            <div css={appStoreButtonContainer}>
                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={appStore.apple}
                                        alt="Download on the Apple App Store"
                                    />
                                </a>
                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                    <img src={appStore.google} alt="Get it on Google Play" />
                                </a>
                            </div>
                        </div>
                        <div css={[squaresContainer, hideOnCollapse]}>
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
                <div css={[hideOnExpand, minimisedContentContainer]}>
                    <MinimisedContentSquare collapseButton={CollapseButton} />
                    <MinimisedBorderSquares />
                </div>
                <MobileSquares collapseButton={CollapseButton} isCollapsed={isCollapsed} />
            </section>
        </CacheProvider>
    );
};
