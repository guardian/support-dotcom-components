import React from 'react';
import { css } from '@emotion/core';
import { news } from '@guardian/src-foundations/palette';
import { Stack, Hide, Container, Columns, Column } from '@guardian/src-layout';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import G200BannerLogo from './components/G200BannerLogo';
import G200BannerCloseButton from './components/G200BannerCloseButton';
import G200BannerImage from './components/G200BannerImage';
import G200BannerHeader from './components/G200BannerHeader';
import G200BannerBody from './components/G200BannerBody';
import G200BannerCtas from './components/G200BannerCtas';

import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';

const containerStyles = css`
    position: relative;
    background: ${news[400]};
    display: flex;
    flex-direction: column;
    border-top: 1px solid white;

    ${from.tablet} {
        flex-direction: row;
    }

    * {
        box-sizing: border-box;
    }
`;

const topContainerStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${from.tablet} {
        flex-direction: column-reverse;
        border-right: 1px solid white;
        width: calc(100% + 10px);
        height: 100%;
    }

    ${from.leftCol} {
        width: calc(100% + 20px);
        margin-left: -10px;
        border-left: 1px solid white;
    }
`;

const bottomContainerStyles = css`
    padding: ${space[1]}px ${space[3]}px ${space[5]}px;

    ${from.tablet} {
        padding: ${space[3]}px 0 ${space[5]}px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    ${from.wide} {
        width: 100%;
    }
`;

const logoAndHeaderContainerStyles = css`
    position: relative;
`;

const logoContainerStyles = css`
    position: absolute;
    top: ${space[2]}px;
    left: ${space[2]}px;
    width: 88px;

    ${from.tablet} {
        top: auto;
        bottom: -70px;
        left: 0;

        width: 124px;
    }

    ${from.leftCol} {
        position: relative;
        top: auto;
        bottom: auto;
        left: auto;
        right: auto;

        margin-top: 0;
        width: 140px;
    }

    ${from.wide} {
        width: 186px;
    }
`;

const closeButtonContainerStyles = css`
    position: absolute;
    z-index: 200;
    top: ${space[2]}px;
    right: ${space[2]}px;

    ${from.tablet} {
        position: relative;
        top: auto;
        right: auto;

        margin-left: ${space[2]}px;
    }

    ${from.desktop} {
        margin-left: ${space[5]}px;
    }
`;

const imageContainerStyles = css`
    width: 100%;
    position: relative;
    z-index: 100;

    padding: 0 ${space[6]}px;

    ${from.mobileMedium} {
        padding: ${space[3]}px ${space[1]}px 0;
    }

    ${from.tablet} {
        padding: 0;
        margin-top: -33px;
        margin-left: -20px;

        width: 107%;
    }

    ${from.desktop} {
        margin-top: -180px;
        margin-left: -6px;
        width: 480px;
    }

    ${from.leftCol} {
        margin-top: -188px;
        margin-left: 63px;
        width: 420px;
    }
`;

const lineExtensionContainer = css`
    position: absolute;
    width: 50%;
    height: 100%;
`;

const firstLineStyles = css`
    margin-top: 32px;
    border-bottom: 1px solid white;

    ${from.tablet} {
        margin-top: 55px;
    }

    ${from.desktop} {
        margin-top: 64px;
    }
`;

const secondLineStyles = css`
    margin-top: 38px;
    border-bottom: 1px solid white;

    ${from.tablet} {
        margin-top: 55px;
    }

    ${from.desktop} {
        margin-top: 64px;
    }
`;

const thirdLineStyles = css`
    margin-top: 55px;
    border-bottom: 1px solid white;

    ${from.desktop} {
        margin-top: 64px;
    }
`;

const ctasContainerStyles = css`
    ${from.tablet} {
        width: calc(100% + 20px);
    }

    ${from.desktop} {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-right: 56px;
    }
`;

const bodyAndCloseButtonContainerStyles = css`
    display: flex;
`;

const logoColumnStyles = css`
    padding-top: ${space[3]}px;
`;

const G200Banner: React.FC<BannerRenderProps> = ({
    content,
    onCloseClick,
    onCtaClick,
    onSecondaryCtaClick,
}) => {
    const Logo = () => (
        <div css={logoContainerStyles}>
            <G200BannerLogo />
        </div>
    );

    const LogoAndCloseButton = () => (
        <>
            <div css={logoContainerStyles}>
                <Hide above="tablet">
                    <G200BannerLogo />
                </Hide>
            </div>

            <div css={closeButtonContainerStyles}>
                <Hide above="tablet">
                    <G200BannerCloseButton onClose={onCloseClick} />
                </Hide>
            </div>
        </>
    );

    const HeaderAndImage = () => (
        <div css={topContainerStyles}>
            <div css={imageContainerStyles}>
                <G200BannerImage />
            </div>

            <div css={logoAndHeaderContainerStyles}>
                <div css={logoContainerStyles}>
                    <Hide below="tablet">
                        <Hide above="leftCol">
                            <G200BannerLogo />
                        </Hide>
                    </Hide>
                </div>

                <G200BannerHeader />
            </div>
        </div>
    );

    const BodyAndCtas = () => (
        <Stack css={bottomContainerStyles} space={5}>
            <div css={bodyAndCloseButtonContainerStyles}>
                <G200BannerBody content={content} />

                <Hide below="tablet">
                    <div css={closeButtonContainerStyles}>
                        <G200BannerCloseButton onClose={onCloseClick} />
                    </div>
                </Hide>
            </div>

            <div css={ctasContainerStyles}>
                <G200BannerCtas
                    content={content}
                    onPrimaryCtaClick={onCtaClick}
                    onSecondaryCtaClick={onSecondaryCtaClick}
                />
            </div>
        </Stack>
    );

    return (
        <div css={containerStyles}>
            <Hide below="tablet">
                <Hide above="leftCol">
                    <div css={lineExtensionContainer}>
                        <div css={firstLineStyles} />
                        <div css={secondLineStyles} />
                        <div css={thirdLineStyles} />
                    </div>
                </Hide>
            </Hide>

            <Hide above="tablet">
                <LogoAndCloseButton />
                <HeaderAndImage />
                <BodyAndCtas />
            </Hide>

            <Container>
                <Hide below="tablet">
                    <Hide above="leftCol">
                        <Columns>
                            <Column width={6 / 12}>
                                <HeaderAndImage />
                            </Column>

                            <Column width={6 / 12}>
                                <BodyAndCtas />
                            </Column>
                        </Columns>
                    </Hide>
                </Hide>

                <Hide below="leftCol">
                    <Hide above="wide">
                        <Columns>
                            <Column cssOverrides={logoColumnStyles} width={2 / 14}>
                                <Logo />
                            </Column>

                            <Column width={6 / 14}>
                                <HeaderAndImage />
                            </Column>

                            <Column width={6 / 14}>
                                <BodyAndCtas />
                            </Column>
                        </Columns>
                    </Hide>
                </Hide>

                <Hide below="wide">
                    <Columns>
                        <Column cssOverrides={logoColumnStyles} width={3 / 16}>
                            <Logo />
                        </Column>

                        <Column width={6 / 16}>
                            <HeaderAndImage />
                        </Column>

                        <Column width={7 / 16}>
                            <BodyAndCtas />
                        </Column>
                    </Columns>
                </Hide>
            </Container>
        </div>
    );
};

const unvalidated = bannerWrapper(G200Banner, 'g200-banner', 'contributions');
const validated = validatedBannerWrapper(G200Banner, 'g200-banner', 'contributions');

export { validated as G200Banner, unvalidated as G200BannerUnvalidated };
