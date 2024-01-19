import React, { useEffect, useState } from 'react';
import { Container } from '@guardian/source-react-components';
import { Button } from '@guardian/source-react-components';
import { Link } from '@guardian/source-react-components';
import {
    SvgArrowDownStraight,
    SvgArrowUpStraight,
    SvgInfo,
} from '@guardian/source-react-components';
import { createClickEventFromTracking, createViewEventFromTracking } from '@sdc/shared/lib';
import { PuzzlesBannerProps } from '@sdc/shared/types';
import { ResponsiveImage } from '../../shared/ResponsiveImage';
import { useEscapeShortcut } from '../../../hooks/useEscapeShortcut';
import { useTabDetection } from '../../../hooks/useTabDetection';
import { MobileSquares } from './squares/MobileSquares';
import { TabletDesktopSquares } from './squares/TabletDesktopSquares';
import { ContentSquares } from './squares/ContentSquares';
import { MinimisedContentSquare } from './squares/MinimisedContentSquare';
import { MinimisedBorderSquares } from './squares/MinimisedBorderSquares';
import {
    appStoreButtonContainer,
    puzzlesBanner,
    bannerContents,
    heading,
    headerFlex,
    headingSection,
    hide,
    imageContainer,
    minimisedBanner,
    minimiseButton,
    minimiseButtonMax,
    minimiseButtonMin,
    mobileMinimiseButton,
    minimisedContentContainer,
    minimiseHint,
    squaresContainer,
    siteMessage,
    signInLink,
    showOnDesktop,
} from './puzzlesBannerStyles';
import { appStore, packshot } from './images';
import { setBannerState, getBannerState } from '../localStorage';
import type { ReactComponent } from '../../../types';

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

const desktopPackshot = {
    url: packshot.desktop,
    media: '(min-width: 980px)',
};

const tabletPackshot = {
    url: packshot.tablet,
    media: '(max-width: 979px)',
    alt: 'The Guardian Puzzles app on mobile devices',
};

const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=PuzzleSignin&CMP_TU=mrtn&CMP_BUNIT=digipac';
const signInComponentId = `${bannerId} : sign in`;

export const PuzzlesBanner: ReactComponent<PuzzlesBannerProps> = ({
    tracking,
    submitComponentEvent,
}) => {
    const [isMinimised, setIsMinimised] = useState<boolean>(getBannerState());
    const isKeyboardUser = useTabDetection();

    const hideOnMinimise = isMinimised ? hide : '';
    const hideOnExpand = isMinimised ? '' : hide;

    // Exclude IE
    if (window?.navigator?.userAgent?.match(/MSIE|Trident/)) {
        return <></>;
    }

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

    const onSignInClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(tracking, signInComponentId);
        if (submitComponentEvent) {
            submitComponentEvent(componentClickEvent);
        }
    };

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

    const MinimiseHint = (
        <p css={minimiseHint}>
            <SvgInfo /> You can minimise this banner using the escape key
        </p>
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
        <section css={[puzzlesBanner, isMinimised ? minimisedBanner : '']}>
            <Container css={hideOnMinimise}>
                <div css={[bannerContents, hideOnMinimise]}>
                    <div css={[headingSection, hideOnMinimise]}>
                        <div css={headerFlex}>
                            <h3 css={heading}>
                                Discover
                                <br />
                                The&nbsp;Guardian
                                <br />
                                Puzzles&nbsp;App
                            </h3>
                            <div css={mobileMinimiseButton}>{MinimiseButton}</div>
                        </div>
                        <div css={appStoreButtonContainer}>
                            <Link
                                href="https://app.adjust.com/smu5odi?adgroup=CrosswordSectionBanner"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleAppStoreClickFor('apple')}
                            >
                                <img src={appStore.apple} alt="Download on the Apple App Store" />
                            </Link>
                            <Link
                                href="https://app.adjust.com/smu5odi?adgroup=CrosswordSectionBanner"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleAppStoreClickFor('google')}
                            >
                                <img src={appStore.google} alt="Get it on Google Play" />
                            </Link>
                        </div>
                        <div css={siteMessage}>
                            Already a subscriber?
                            <br css={showOnDesktop} />{' '}
                            <Link
                                href={signInUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                css={signInLink}
                                data-link-name={signInComponentId}
                                onClick={onSignInClick}
                            >
                                Sign in
                            </Link>{' '}
                            to not see this again
                        </div>
                    </div>
                    <div css={[squaresContainer, hideOnMinimise]}>
                        <ContentSquares minimiseButton={MinimiseButton} />
                        <div css={imageContainer}>
                            <ResponsiveImage
                                images={[tabletPackshot, desktopPackshot]}
                                baseImage={tabletPackshot}
                            />
                        </div>
                        <TabletDesktopSquares
                            minimiseHint={MinimiseHint}
                            isKeyboardUser={isKeyboardUser}
                        />
                    </div>
                </div>
            </Container>
            <MobileSquares cssOverrides={hideOnMinimise} />
            <div css={[hideOnExpand, minimisedContentContainer]}>
                <MinimisedContentSquare />
                <MinimisedBorderSquares minimiseButton={MinimiseButton} />
            </div>
        </section>
    );
};
