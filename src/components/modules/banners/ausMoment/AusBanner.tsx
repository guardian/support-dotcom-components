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

const mobileContainerStyles = css`
    padding: ${space[1]}px ${space[3]}px ${space[1]}px;
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

const closeButtonContainerStyles = css`
    position: absolute;
    z-index: 200;
    top: ${space[2]}px;
    right: ${space[2]}px;

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
        <div css={bodyAndCloseButtonContainerStyles}>
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

    return (
        <div css={containerStyles}>
            <Hide above="tablet">
                <div css={mobileContainerStyles}>
                    <Body />
                    <CloseButton />
                    <Ctas />
                </div>
            </Hide>

            <Container>
                <Hide below="tablet">
                    <Hide above="desktop">
                        <Columns>
                            <Column width={8 / 12}>
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
                        <Column width={10 / 14}>
                            <Body />
                            <Ctas />
                        </Column>
                        <Column width={4 / 14}>
                            <CloseButton />
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
