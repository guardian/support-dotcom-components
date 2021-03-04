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
import {
    appStoreButtonContainer,
    banner,
    bannerContents,
    collapseButton,
    heading,
    headingSection,
    imageContainer,
    squaresContainer,
} from './puzzlesBannerStyles';
import { packshot } from './images';

// A custom Emotion cache to allow us to run a custom prefixer for CSS grid on IE11
const emotionCache = createCache({
    stylisPlugins: [gridPrefixerPlugin()],
});

const desktopPackshot = {
    url: packshot.desktop,
    media: '(min-width: 980px)',
    alt: 'The Guardian Puzzles app on mobile devices',
};

const tabletPackshot = {
    url: packshot.tablet,
    media: '(min-width: 740px)',
};

export const PuzzlesBanner: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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
            <section css={banner}>
                <Container>
                    <div css={bannerContents}>
                        <div css={headingSection}>
                            <h1 css={heading}>
                                Discover
                                <br />
                                The&nbsp;Guardian
                                <br />
                                Puzzles&nbsp;App
                            </h1>
                            <div css={appStoreButtonContainer}>
                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="https://i.guim.co.uk/img/media/a0787d3b313f03ed87a16ced224ab4022f794bc5/0_0_554_160/140.png?width=140&quality=85&s=48f11f40c766e44cadc6e30f01e1e089"
                                        alt="Download on the Apple App Store"
                                    />
                                </a>
                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="https://i.guim.co.uk/img/media/0a3eda7d719ad8ebe3a13a9bab8fd2b3348d1f20/0_0_554_160/140.png?width=140&quality=85&s=613c12a8c5a5be1fa48f3d36dfdd3ad3"
                                        alt="Get it on Google Play"
                                    />
                                </a>
                            </div>
                        </div>
                        <div css={squaresContainer}>
                            <ContentSquares />
                            <TabletDesktopSquares collapseButton={CollapseButton} />
                            <div css={imageContainer}>
                                <ResponsiveImage
                                    images={[desktopPackshot, tabletPackshot]}
                                    baseImage={desktopPackshot}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
                <MobileSquares collapseButton={CollapseButton} />
            </section>
        </CacheProvider>
    );
};
