import React, { ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import { Button, LinkButton, buttonReaderRevenue } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { SvgRoundelDefault } from '@guardian/src-brand';
import { SvgCross } from '@guardian/src-icons';
import {
    banner,
    columns,
    topLeftComponent,
    heading,
    iconAndClosePosition,
    logoContainer,
    paragraph,
    siteMessage,
    bottomRightComponent,
    packShotContainer,
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

const mobileAndDesktopImg =
    'https://i.guim.co.uk/img/media/0682b069cf2e32b987ddcfbb2b549a93be61ae36/0_0_500_240/500.png?quality=85&s=1bf9bd8af343813bd6db3f009fccf385';

const tabletImage =
    'https://i.guim.co.uk/img/media/6d601169360b35c705412fbfa163c15f140efc2f/0_0_500_336/500.png?quality=85&s=21fb33ade343b7db222823c4d3160b7f';

const mobileAndDesktopImgJan22 =
    'https://i.guim.co.uk/img/media/670c3033e71f48296798480ac22a1123602e8466/0_0_500_240/500.png?quality=85&s=c1456ddb21a061ac1a199670637b5c5a';

const tabletImageJan22 =
    'https://i.guim.co.uk/img/media/8d1fea851030b24328e05267fdb9bcd767248aeb/0_0_500_336/500.png?quality=85&s=102abc54f37796d6f668416bdbb993f1';

const bannerMobileAndDesktopImg =
    new Date() >= new Date('2022-01-24T08:00:00') ? mobileAndDesktopImgJan22 : mobileAndDesktopImg;
const bannerTabletImg =
    new Date() >= new Date('2022-01-24T08:00:00') ? tabletImageJan22 : tabletImage;

// Responsive image props
const baseImg = {
    url: bannerMobileAndDesktopImg,
    media: '(min-width: 980px)',
    alt: 'The Guardian Weekly magazine',
};

const images = [
    {
        url: bannerMobileAndDesktopImg,
        media: '(max-width: 739px)',
    },
    {
        url: bannerTabletImg,
        media: '(min-width: 740px) and (max-width: 979px)',
    },
    baseImg,
];

const defaultCta = 'Subscribe';
const defaultSecondaryCta = 'Not now';

type ButtonPropTypes = {
    onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const CloseButton = (props: ButtonPropTypes): ReactElement => (
    <Button
        data-link-name={closeComponentId}
        onClick={props.onClick}
        icon={<SvgCross />}
        size="small"
        priority="tertiary"
        hideLabel
    >
        Close
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
                <Columns cssOverrides={columns} collapseBelow="tablet">
                    <Column width={5 / 12} css={topLeftComponent}>
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
                                                onClick={onCtaClick}
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
                    <Column cssOverrides={bottomRightComponent}>
                        <div css={packShotContainer}>
                            <ResponsiveImage images={images} baseImage={baseImg} />
                        </div>
                    </Column>
                    <div css={iconAndClosePosition}>
                        <Inline space={1}>
                            <div css={logoContainer}>
                                <SvgRoundelDefault />
                            </div>
                            <CloseButton onClick={onCloseClick} />
                        </Inline>
                    </div>
                </Columns>
            </Container>
        </section>
    );
};

// const wrapped = bannerWrapper(GuardianWeeklyBanner, bannerId, 'subscriptions');
const validated = validatedBannerWrapper(GuardianWeeklyBanner, bannerId);

export { validated as GuardianWeeklyBanner };
