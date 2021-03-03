import React, { useState } from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { Container } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { SvgArrowDownStraight, SvgArrowUpStraight } from '@guardian/src-icons';
import { ResponsiveImage } from '../../../ResponsiveImage';
import { MobileSquares } from './squares/MobileSquares';
import { TabletDesktopSquares } from './squares/TabletDesktopSquares';
import { ContentSquares } from './squares/ContentSquares';
import {
    banner,
    bannerContents,
    buttonContainer,
    collapseButton,
    heading,
    headingSection,
    imageContainer,
    squaresContainer,
} from './puzzlesBannerStyles';
import { gridPrefixerPlugin } from './gridPrefixerPlugin';

const emotionCache = createCache({
    stylisPlugins: [gridPrefixerPlugin()],
});

const desktopPackshot = {
    url:
        'https://i.guim.co.uk/img/media/8759e22d5a920f73253e73ac593956760b7c58d9/0_0_1224_1076/500.png?width=300&quality=85&s=3e78a054770de9e16024517cd727ed47',
    media: '(min-width: 980px)',
    alt: 'The Guardian Puzzles app on mobile devices',
};

const tabletPackshot = {
    url:
        'https://i.guim.co.uk/img/media/8759e22d5a920f73253e73ac593956760b7c58d9/0_0_1224_1076/500.png?width=230&quality=85&s=86d3b846ec56cd7662e3cb187b787c49',
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
                            <div css={buttonContainer}>
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
