import React from 'react';
import { PuzzlesCanvas } from './PuzzlesCanvas';
import {
    appStoreBadges,
    container,
    contentContainer,
    heading,
    packshot,
} from './puzzlesOverlayStyles';

export const PuzzlesOverlay: React.FC = () => {
    return (
        <section css={container}>
            <PuzzlesCanvas />
            <div css={contentContainer}>
                <h1 css={heading}>Discover The&nbsp;Guardian Puzzles&nbsp;App</h1>
                <div css={appStoreBadges}>
                    <img
                        height="40"
                        src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"
                        alt="Download on the Apple App Store"
                    />
                    <img
                        height="60"
                        src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                        alt="Get it on Google Play"
                    />
                </div>

                <div css={packshot}>
                    <img
                        width="385"
                        src="https://trello-attachments.s3.amazonaws.com/57f61bbc38fc029c0eee67e8/6018251c4f839231776243a2/0b03d7f36431e7ab58ac1a1ea6c2405c/Packshot.png"
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
};
