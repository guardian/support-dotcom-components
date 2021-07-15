import React from 'react';
import { css } from '@emotion/core';
import { Hide, Container, Columns, Column } from '@guardian/src-layout';
import { space } from '@guardian/src-foundations';
import { from, between } from '@guardian/src-foundations/mq';
import AusBannerHeader from './components/AusBannerHeader';
import AusBannerBody from './components/AusBannerBody';
import AusBannerCtas from './components/AusBannerCtas';
import AusBannerCloseButton from './components/AusBannerCloseButton';
import {
    AusBannerTicker,
    CurrentSupporterNumber,
    GoalSupporterNumber,
} from './components/AusBannerTicker';
import AusBannerAnimation from './components/AusBannerAnimation';
import { SocialShareIcons, SocialShareLabel } from './components/AusBannerSocialShare';
import { BannerRenderProps } from '../common/types';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import { brand } from '@guardian/src-foundations';

// -- styles -- //
const containerStyles = css`
    position: relative;
    background: ${brand[400]};
    display: flex;
    flex-direction: column;
    padding: ${space[1]}px ${space[3]}px ${space[1]}px;

    ${from.tablet} {
        flex-direction: row;
        padding-left: 0;
        padding-bottom: ${space[4]}px;
    }

    ${from.desktop} {
        padding-right: 0;
        margin: 0;
        min-height: 350px;
        border-top: 1px solid #04ffff;
    }

    * {
        box-sizing: border-box;
    }
`;

const desktopContainerStyles = css`
    margin-right: 0;
`;

const closeButtonContainerStyles = css`
    position: absolute;
    z-index: 200;
    top: ${space[2]}px;
    right: ${space[2]}px;

    ${from.tablet} {
        padding: ${space[1]}px;
    }

    ${from.tablet} {
        position: relative;
        top: auto;
        right: auto;
    }
`;

const ctasContainerStyles = css`
    padding: ${space[3]}px 0 ${space[3]}px;

    ${from.tablet} {
        width: calc(100% + 20px);
        position: absolute;
        bottom: 0;
    }

    ${from.desktop} {
        width: 100%;
        position: relative;
    }

    ${from.wide} {
        width: 100%;
        padding: ${space[3]}px 0 ${space[5]}px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const bodyContainerStyles = css`
    display: flex;
`;

const animationWrapper = css`
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
`;

const currentSupportersContainerStyles = css`
    position: absolute;
    z-index: 100;
    left: 22%;
    bottom: 25%;

    ${from.wide} {
        left: 30%;
    }
`;

const goalContainerStyles = css`
    position: absolute;
    z-index: 100;
    left: 40%;
    bottom: 55%;

    ${from.leftCol} {
        left: 50%;
    }
`;

const socialShareStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: ${space[4]}px auto ${space[2]}px;

    ${between.tablet.and.desktop} {
        flex-direction: column;
        align-items: baseline;
        position: absolute;
        margin-left: ${space[4]}px;
        bottom: ${space[2]}px;
    }
`;

// -- components --//

const AusMomentBanner: React.FC<BannerRenderProps> = ({
    content,
    onCtaClick,
    onSecondaryCtaClick,
    onCloseClick,
    tickerSettings,
    isSupporter,
}) => {
    const tickerData = tickerSettings?.tickerData;

    if (!tickerSettings || !tickerData) {
        return null;
    }

    const Header = () => <AusBannerHeader content={content} />;

    const Body = () => (
        <div css={bodyContainerStyles}>
            <AusBannerBody content={content} />
        </div>
    );

    const CloseButton = () => (
        <div css={closeButtonContainerStyles}>
            <AusBannerCloseButton onClose={onCloseClick} />
        </div>
    );

    const Ctas = () => (
        <div css={ctasContainerStyles}>
            <AusBannerCtas
                content={content}
                onPrimaryCtaClick={onCtaClick}
                onSecondaryCtaClick={onSecondaryCtaClick}
            />
        </div>
    );

    const Ticker = () => {
        return (
            <AusBannerTicker
                settings={tickerSettings}
                accentColour={'#04FFFF'}
                tickerData={tickerData}
            />
        );
    };

    const CurrentSupporters = () => {
        return (
            <div css={currentSupportersContainerStyles}>
                <CurrentSupporterNumber tickerData={tickerData} />
            </div>
        );
    };

    const Goal = () => {
        return (
            <div css={goalContainerStyles}>
                <GoalSupporterNumber goal={tickerData.goal} />
            </div>
        );
    };

    const SocialShare = () => {
        return (
            <div css={socialShareStyles}>
                <SocialShareIcons />
                <SocialShareLabel />
            </div>
        );
    };

    return (
        <div css={containerStyles}>
            <Hide above="tablet">
                <Header />
                <Ticker />
                <Body />
                <CloseButton />

                {isSupporter ? <SocialShare /> : <Ctas />}
            </Hide>

            <Container css={desktopContainerStyles}>
                <Hide below="tablet">
                    <Hide above="desktop">
                        <Columns>
                            <Column width={8 / 12}>
                                <Header />
                                <Ticker />
                                <Body />
                            </Column>
                            <Column width={4 / 12}>
                                <CloseButton />
                                {isSupporter ? <SocialShare /> : <Ctas />}
                            </Column>
                        </Columns>
                    </Hide>
                </Hide>

                <Hide below="desktop">
                    <Columns>
                        <Column width={8 / 14}>
                            <Header />
                            <Body />
                            {isSupporter ? <SocialShare /> : <Ctas />}
                        </Column>
                        <Column width={6 / 14}>
                            <CloseButton />
                            <div css={animationWrapper}>
                                <CurrentSupporters />
                                <Goal />

                                <AusBannerAnimation />
                            </div>
                        </Column>
                    </Columns>
                </Hide>
            </Container>
        </div>
    );
};

const validated = validatedBannerWrapper(AusMomentBanner, 'aus-moment-banner', 'contributions');

export { validated as AusMomentBanner };
