import React from 'react';
import { css } from '@emotion/core';
import { Hide, Container, Columns, Column } from '@guardian/src-layout';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
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
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { tickerSettings } from '../utils/storybook';

const containerStyles = css`
    position: relative;
    background: #052962;
    display: flex;
    flex-direction: column;
    border-top: 1px solid white;
    padding: ${space[1]}px ${space[3]}px ${space[1]}px;

    ${from.tablet} {
        flex-direction: row;
        padding-left: 0;
        padding-bottom: ${space[4]}px;
    }

    ${from.desktop} {
        padding-right: 0;
        margin: 0;
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
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const rightContainerStyles = css`
    /* padding-right: 0; */
`;

const bodyContainerStyles = css`
    display: flex;
`;

const currentSupportersContainerStyles = css`
    position: absolute;
    z-index: 100;
`;

const goalContainerStyles = css`
    position: absolute;
    z-index: 100;
    right: 50px;
    top: 50px;
`;

const AusBanner: React.FC<BannerRenderProps> = ({
    content,
    onCtaClick,
    onSecondaryCtaClick,
    onCloseClick,
}) => {
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
        return <AusBannerTicker settings={tickerSettings} accentColour={'#04FFFF'} />;
    };

    const CurrentSupporters = () => {
        return (
            <div css={currentSupportersContainerStyles}>
                <CurrentSupporterNumber />
            </div>
        );
    };

    const Goal = () => {
        return (
            <div css={goalContainerStyles}>
                <GoalSupporterNumber />
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
                <Ctas />
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
                                <Ctas />
                            </Column>
                        </Columns>
                    </Hide>
                </Hide>

                <Hide below="desktop">
                    <Columns>
                        <Column width={7 / 14}>
                            <Header />
                            <Body />
                            <Ctas />
                        </Column>
                        <Column width={7 / 14} css={rightContainerStyles}>
                            <CloseButton />
                            <CurrentSupporters />
                            <Goal />

                            <AusBannerAnimation />
                        </Column>
                    </Columns>
                </Hide>
            </Container>
        </div>
    );
};

const unvalidated = bannerWrapper(AusBanner, 'aus-moment-banner', 'contributions');
const validated = validatedBannerWrapper(AusBanner, 'aus-moment-banner', 'contributions');

export { validated as AusBanner, unvalidated as AusBannerUnvalidated };
