import React, { useEffect, useState } from 'react';
import { PuzzlesCanvas } from './PuzzlesCanvas';
import {
    appStoreBadges,
    container,
    contentContainer,
    heading,
    packshot,
} from './puzzlesOverlayStyles';

export const PuzzlesOverlay: React.FC = () => {
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Wait until fonts are loaded before drawing the tiles
        document.fonts.ready.then(() => {
            setFontsLoaded(true);
        });
    }, []);

    return (
        <section css={container}>
            {fontsLoaded && <PuzzlesCanvas />}
            <div css={contentContainer}>
                <h1 css={heading}>Discover The&nbsp;Guardian Puzzles&nbsp;App</h1>
                <div css={appStoreBadges}>
                    <a href="https://apps.apple.com/us/app/guardian-puzzles-crosswords/id1487780661?itsct=apps_box&itscg=30200">
                        <img
                            height="40"
                            src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"
                            alt="Download on the Apple App Store"
                        />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=uk.co.guardian.puzzles">
                        <img
                            height="60"
                            src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                            alt="Get it on Google Play"
                        />
                    </a>
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
