import React from 'react';
import { PuzzlesCanvas } from './PuzzlesCanvas';
import { appStoreBadges, container, contentContainer, heading } from './puzzlesOverlayStyles';

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
            </div>
        </section>
    );
};
