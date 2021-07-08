import React from 'react';
import { css } from '@emotion/core';
import { news } from '@guardian/src-foundations/palette';
import { Stack, Hide, Container, Columns, Column } from '@guardian/src-layout';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import AusBannerBody from './components/AusBannerBody';
import AusBannerCtas from './components/AusBannerCtas';
import AusBannerCloseButton from './components/AusBannerCloseButton';

import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';

const containerStyles = css`
    position: relative;
    background: #052962;
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

const AusBanner: React.FC<BannerRenderProps> = ({
    content,
    onCtaClick,
    onSecondaryCtaClick,
    onCloseClick,
}) => {
    // const Logo = () => (
    //     <div css={logoContainerStyles}>
    //         <G200BannerLogo />
    //     </div>
    // );

    // const LogoAndCloseButton = () => (
    //     <>
    //         <div css={logoContainerStyles}>
    //             <Hide above="tablet">
    //                 <G200BannerLogo />
    //             </Hide>
    //         </div>

    //         <div css={closeButtonContainerStyles}>
    //             <Hide above="tablet">
    //                 <G200BannerCloseButton onClose={onCloseClick} />
    //             </Hide>
    //         </div>
    //     </>
    // );

    // const HeaderAndImage = () => (
    //     <div css={topContainerStyles}>
    //         <div css={imageContainerStyles}>
    //             <G200BannerImage />
    //         </div>

    //         <div css={logoAndHeaderContainerStyles}>
    //             <div css={logoContainerStyles}>
    //                 <Hide below="tablet">
    //                     <Hide above="leftCol">
    //                         <G200BannerLogo />
    //                     </Hide>
    //                 </Hide>
    //             </div>

    //             <G200BannerHeader />
    //         </div>
    //     </div>
    // );

    const BodyAndCtas = () => (
        <Stack css={bottomContainerStyles} space={5}>
            <div css={bodyAndCloseButtonContainerStyles}>
                <AusBannerBody content={content} />
                <div css={closeButtonContainerStyles}>
                    <AusBannerCloseButton onClose={onCloseClick} />
                </div>
            </div>

            {/* <div css={ctasContainerStyles}>
                <AusBannerCtas
                    content={content}
                    onPrimaryCtaClick={onCtaClick}
                    onSecondaryCtaClick={onSecondaryCtaClick}
                />
            </div> */}
        </Stack>
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

    return (
        <div css={containerStyles}>
            <Hide above="tablet">
                {/* <LogoAndCloseButton />
                <HeaderAndImage /> */}
                <BodyAndCtas />
            </Hide>

            <Container>
                <Hide below="tablet">
                    <Hide above="leftCol">
                        <Columns>
                            <Column width={8 / 12}>
                                <BodyAndCtas />
                            </Column>
                            <Column width={4 / 12}>
                                <Ctas />
                            </Column>
                        </Columns>
                    </Hide>
                </Hide>

                <Hide below="leftCol">
                    <Hide above="wide">
                        <Columns>
                            <Column cssOverrides={logoColumnStyles} width={2 / 14}>
                                {/* <Logo /> */}
                            </Column>

                            <Column width={6 / 14}>{/* <HeaderAndImage /> */}</Column>

                            <Column width={6 / 14}>
                                <BodyAndCtas />
                            </Column>
                        </Columns>
                    </Hide>
                </Hide>

                <Hide below="wide">
                    <Columns>
                        <Column cssOverrides={logoColumnStyles} width={3 / 16}>
                            {/* <Logo /> */}
                        </Column>

                        <Column width={6 / 16}>{/* <HeaderAndImage /> */}</Column>

                        <Column width={7 / 16}>
                            <BodyAndCtas />
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
