import React, { ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, Columns, Column, Inline } from '@guardian/source-react-components';
import { Button, LinkButton, buttonThemeReaderRevenue } from '@guardian/source-react-components';
import { Link } from '@guardian/source-react-components';
import { SvgRoundelDefault } from '@guardian/source-react-components';
import { SvgArrowRightStraight, SvgCross } from '@guardian/source-react-components';
import {
    SvgDisplay,
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
import type { ReactComponent } from '../../../types';

const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_gWeekly&CMP_TU=mrtn&CMP_BUNIT=subs';
const bannerId = 'weekly-banner';
const ctaComponentId = `${bannerId} : cta`;
const notNowComponentId = `${bannerId} : not now`;
const closeComponentId = `${bannerId} : close`;
const signInComponentId = `${bannerId} : sign in`;

const desktopImg =
    'https://i.guim.co.uk/img/media/daaaa96ca3631c38a8747cb2146c1bc558197fc2/0_0_1268_798/1268.png?width=1268&height=798&quality=85&s=906cd95f35443e0bf0b8c60456597a7e';

const tabletImg =
    'https://i.guim.co.uk/img/media/304298d179d8ce1532bc5b24995cf4cdbe2dc0f2/0_0_1340_1320/1340.png?width=1340&height=1320&quality=85&s=be7c94e0957645ec744a40c1ecdc191b';

const mobileImg =
    'https://i.guim.co.uk/img/media/63b65f509267bc0e4308f978b8277d4618723eab/0_0_1220_555/1220.png?width=1220&0height=555&quality=85&s=f930da88ccda9c97febd83a00db3251b';

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
        cssOverrides={[closeButtonStyles, SvgDisplay]}
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

const GuardianWeeklyBanner: ReactComponent<BannerRenderProps> = ({
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
                            <div css={[logoContainer, SvgDisplay]}>
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
                                        <ThemeProvider theme={buttonThemeReaderRevenue}>
                                            <LinkButton
                                                href={primaryCta?.ctaUrl}
                                                cssOverrides={SvgDisplay}
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
