import React from 'react';
import { Link } from '@guardian/src-link';
import { SvgInfo } from '@guardian/src-icons';
import {
    appStoreButtonContainer,
    heading,
    headingSection,
    headerFlex,
    mobileMinimiseButton,
    minimiseHint,
} from './puzzlesBannerStyles';
import { appStore } from './images';
import { useTabDetection } from '../../../hooks/useTabDetection';

type PuzzlesBannerHeaderProps = {
    minimiseButton: React.ReactNode;
    hideOnMinimise: boolean;
    handleAppStoreClickFor: () => void;
};

const PuzzlesBannerHeader: React.FC<PuzzlesBannerHeaderProps> = ({
    minimiseButton,
    hideOnMinimise,
    handleAppStoreClickFor,
}) => {
    const isKeyboardUser = useTabDetection();
    return (
        <div css={[headingSection, hideOnMinimise]}>
            <div css={headerFlex}>
                <h3 css={heading}>
                    Discover
                    <br />
                    The&nbsp;Guardian
                    <br />
                    Puzzles&nbsp;App
                </h3>
                <div css={mobileMinimiseButton}>{minimiseButton}</div>
            </div>
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
    );
};

export default PuzzlesBannerHeader;
