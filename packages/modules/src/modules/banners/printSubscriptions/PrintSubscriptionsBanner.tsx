import React, { ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import { Button, LinkButton, buttonReaderRevenue } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { SvgRoundelDefault } from '@guardian/src-brand';
import { SvgArrowRightStraight, SvgCross } from '@guardian/src-icons';
import {
    banner,
    closeButtonStyles,
    copyColumn,
    heading,
    iconAndClosePosition,
    imageColumn,
    imageContainer,
    logoContainer,
    paragraph,
    siteMessage,
} from './printSubscriptionsBannerStyles';
import { ResponsiveImage } from '../../shared/ResponsiveImage';
import { BannerText } from '../common/BannerText';
import { BannerContentRenderer } from '../common/BannerContentRenderer';
import { BannerRenderProps } from '../common/types';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import { SecondaryCtaType } from '@sdc/shared/types';

const signInUrl = 'https://profile.theguardian.com/signin';
const bannerId = 'print-subscriptions-banner';
const ctaComponentId = `${bannerId} : cta`;
const notNowComponentId = `${bannerId} : not now`;
const closeComponentId = `${bannerId} : close`;
const signInComponentId = `${bannerId} : sign in`;

const desktopImg =
    'https://media.guim.co.uk/980a964504a5f1e5988a39762f7f9861c9cf6b35/0_0_8041_5440/2000.png';

const tabletImg =
    'https://media.guim.co.uk/6776db3b6596d6c07d7aa9338d1b7104a74c7919/0_0_5360_5280/1000.png';

const mobileImg =
    'https://media.guim.co.uk/1d7c215052b2582d6627ed4be3675eae1e3c950e/0_0_4880_2640/500.png';

// Responsive image props
const baseImg = {
    url: desktopImg,
    media: '(min-width: 980px)',
    alt: 'Newspaper packshot',
};

const images = [
    {
        url: mobileImg,
        media: '(max-width: 739px)',
    },
    {
        url: tabletImg,
        media: '(min-width: 740px) and (max-width: 979px)',
    },
    baseImg,
];

const defaultCta = 'Subscribe now';
const defaultSecondaryCta = 'Not now';

type ButtonPropTypes = {
    onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const CloseButton = (props: ButtonPropTypes): ReactElement => (
    <Button
        css={closeButtonStyles}
        data-link-name={closeComponentId}
        onClick={props.onClick}
        icon={<SvgCross />}
        size="small"
        priority="tertiary"
        hideLabel
    >
        Close this banner
    </Button>
);

const PrintSubscriptionsBanner: React.FC<BannerRenderProps> = ({
    onCtaClick,
    onCloseClick,
    onSignInClick,
    onNotNowClick,
    content,
}) => {
    return (
        <section css={banner} data-target={bannerId}>
            <Container>
                <Columns>
                    <Column width={1} cssOverrides={iconAndClosePosition}>
                        <Inline space={1}>
                            <div css={logoContainer}>
                                <SvgRoundelDefault />
                            </div>
                            <CloseButton onClick={onCloseClick} />
                        </Inline>
                    </Column>
                </Columns>
                <Columns collapseBelow="tablet">
                    <Column width={1 / 2} cssOverrides={copyColumn}>
                        <BannerText
                            styles={{
                                desktop: {
                                    heading,
                                    copy: paragraph,
                                },
                            }}
                            content={content}
                        />
                        <BannerContentRenderer
                            content={content}
                            render={({ renderContent }) => {
                                const { primaryCta, secondaryCta } = renderContent;
                                return (
                                    <Inline space={3}>
                                        <ThemeProvider theme={buttonReaderRevenue}>
                                            <LinkButton
                                                href={primaryCta?.ctaUrl}
                                                data-link-name={ctaComponentId}
                                                icon={<SvgArrowRightStraight />}
                                                iconSide="right"
                                                onClick={onCtaClick}
                                                tabIndex={0}
                                                className="link-button"
                                            >
                                                {primaryCta?.ctaText || defaultCta}
                                            </LinkButton>
                                        </ThemeProvider>
                                        <Button
                                            priority="subdued"
                                            data-link-name={notNowComponentId}
                                            onClick={onNotNowClick}
                                        >
                                            {(secondaryCta?.type === SecondaryCtaType.Custom &&
                                                secondaryCta.cta.ctaText) ||
                                                defaultSecondaryCta}
                                        </Button>
                                    </Inline>
                                );
                            }}
                        />
                        <div css={siteMessage}>
                            Already a subscriber?{' '}
                            <Link
                                data-link-name={signInComponentId}
                                onClick={onSignInClick}
                                href={signInUrl}
                                subdued
                            >
                                Sign in
                            </Link>{' '}
                            to not see this again
                        </div>
                    </Column>
                    <Column width={1 / 2} cssOverrides={imageColumn}>
                        <div css={imageContainer}>
                            <ResponsiveImage images={images} baseImage={baseImg} />
                        </div>
                    </Column>
                </Columns>
            </Container>
        </section>
    );
};

const validated = validatedBannerWrapper(PrintSubscriptionsBanner, bannerId);

export { validated as PrintSubscriptionsBanner };
