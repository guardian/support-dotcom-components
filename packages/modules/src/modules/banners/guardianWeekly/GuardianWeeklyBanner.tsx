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
    'https://i.guim.co.uk/img/media/4b36918edf028c506083be0495b31559074c018f/0_0_2562_1360/2562.png?width=2562&height=1360&quality=85&s=7a219628fd6da85f50cd8765f844df45';

const tabletImg =
    'https://i.guim.co.uk/img/media/304298d179d8ce1532bc5b24995cf4cdbe2dc0f2/0_0_1340_1320/1340.png?width=1340&height=1320&quality=85&s=be7c94e0957645ec744a40c1ecdc191b';

const mobileImg =
    'https://i.guim.co.uk/img/media/bcab68214a87819d11297f639ddb3d188ca7a8a6/0_0_1220_658/1220.png?width=1220&height=658&quality=85&s=a6be539e33a4a8afe450eb7c8dda24f1';

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
