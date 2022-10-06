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
} from './guardianWeeklyBannerStyles';
import { ResponsiveImage } from '../../shared/ResponsiveImage';
import { BannerText } from '../common/BannerText';
import { BannerContentRenderer } from '../common/BannerContentRenderer';
import { BannerRenderProps } from '../common/types';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import { SecondaryCtaType } from '@sdc/shared/types';

const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_gWeekly&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'weekly-banner';
const ctaComponentId = `${bannerId} : cta`;
const notNowComponentId = `${bannerId} : not now`;
const closeComponentId = `${bannerId} : close`;
const signInComponentId = `${bannerId} : sign in`;

const desktopImg =
    'https://i.guim.co.uk/img/media/060da9911ab00cab8ba1cbea1ef1f3e0aa3a5b3d/0_0_2652_1360/master/2652.png?width=2652&height=1360&quality=85&s=2d196b52268a96862f08cf069d02f3fd';

const tabletImg =
    'https://i.guim.co.uk/img/media/dcec52aa7c6bc86a40707ef13d2f0f0cd3ecae5d/0_0_1340_1320/1340.png?width=1340&height=1320&quality=85&s=c6e2bad18f00b1c5919551d1708e334b ';

const mobileImg =
    'https://i.guim.co.uk/img/media/f28953842cda0a17b77eda99fd7afb7c95f669b1/0_0_1220_658/1220.png?width=1220&height=658&quality=85&s=14c48d29ff01b16ba3cc0259f4368115';

// Responsive image props
const baseImg = {
    url: desktopImg,
    media: '(min-width: 980px)',
    alt: 'The Guardian Weekly magazine',
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

const GuardianWeeklyBanner: React.FC<BannerRenderProps> = ({
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

const validated = validatedBannerWrapper(GuardianWeeklyBanner, bannerId);

export { validated as GuardianWeeklyBanner };
