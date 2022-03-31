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
    'https://media.guim.co.uk/4413eae445d16661af1487c47a874618cdd23c2c/0_0_2684_1704/1000.png'
    // 'https://i.guim.co.uk/img/media/a5a4a122de965a757d062c4e251f0e64688132e2/0_0_500_240/500.png?quality=85&s=0b091b93297e3d820ace76eef810e904';

const tabletImg =
    'https://media.guim.co.uk/564514bf8aa47f89424ad0449f35c1f5fd64c547/0_0_1316_1796/1316.png'
    // 'https://i.guim.co.uk/img/media/c943c58125ecdf9c41c5d48b72ccf94514702821/0_0_500_336/500.png?quality=85&s=00139fa37b5087ec021a88469110ced4';

// Responsive image props
const baseImg = {
    url: mobileAndDesktopImg,
    media: '(min-width: 980px)',
    alt: 'The Guardian Weekly magazine',
};

const images = [
    {
        url: mobileAndDesktopImg,
        media: '(max-width: 739px)',
    },
    {
        url: tabletImg,
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
