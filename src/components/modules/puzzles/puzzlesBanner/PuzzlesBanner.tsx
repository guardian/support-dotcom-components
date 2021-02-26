import React, { useState } from 'react';
import { Container } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { SvgArrowDownStraight } from '@guardian/src-icons';
import { Square } from './Square';
import {
    backgroundSquares,
    banner,
    bannerContents,
    buttonContainer,
    collapseButton,
    collapseButtonContainer,
    heading,
    headingSection,
    removeSquareBorder,
} from './puzzlesBannerStyles';

export const PuzzlesBanner: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    function collapse() {
        setIsCollapsed(!isCollapsed);
    }

    return (
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
                    <div css={backgroundSquares}>
                        <Square colour="grey" />
                        <Square colour="white" />
                        <Square colour="pink" />
                        <Square colour="pink" cssOverrides={removeSquareBorder} />
                        <Square colour="white" cssOverrides={removeSquareBorder} />
                        <Square
                            colour="purple"
                            cssOverrides={[removeSquareBorder, collapseButtonContainer]}
                        >
                            <Button
                                cssOverrides={collapseButton}
                                icon={<SvgArrowDownStraight />}
                                onClick={collapse}
                                hideLabel
                            >
                                Collapse
                            </Button>
                        </Square>
                    </div>
                </div>
            </Container>
        </section>
    );
};
