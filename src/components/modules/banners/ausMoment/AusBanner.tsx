import React from 'react';
import { css } from '@emotion/core';
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

const ctasContainerStyles = css`
    padding: ${space[1]}px ${space[3]}px ${space[5]}px;

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

const bodyAndCloseButtonContainerStyles = css`
    display: flex;
`;

const AusBanner: React.FC<BannerRenderProps> = ({
    content,
    onCtaClick,
    onSecondaryCtaClick,
    onCloseClick,
}) => {
    const Body = () => (
        <Stack css={bottomContainerStyles} space={5}>
            <div css={bodyAndCloseButtonContainerStyles}>
                <AusBannerBody content={content} />
                <div css={closeButtonContainerStyles}>
                    <AusBannerCloseButton onClose={onCloseClick} />
                </div>
            </div>
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
                <Body />
                <Ctas />
            </Hide>

            <Container>
                <Hide below="tablet">
                    <Hide above="desktop">
                        <Columns>
                            <Column width={8 / 12}>
                                <Body />
                            </Column>
                            <Column width={4 / 12}>
                                <Ctas />
                            </Column>
                        </Columns>
                    </Hide>
                </Hide>

                <Hide below="desktop">
                    <Column width={10 / 14}>
                        <Body />
                        <Ctas />
                    </Column>
                    <Columns>
                        <Column width={4 / 14}>{/* <HeaderAndImage /> */}</Column>
                    </Columns>
                </Hide>
            </Container>
        </div>
    );
};

const unvalidated = bannerWrapper(AusBanner, 'aus-moment-banner', 'contributions');
const validated = validatedBannerWrapper(AusBanner, 'aus-moment-banner', 'contributions');

export { validated as AusBanner, unvalidated as AusBannerUnvalidated };
