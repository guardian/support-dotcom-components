import React from 'react';
import { Story, Meta } from '@storybook/react';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { brand, brandAlt, neutral } from '@guardian/src-foundations';

export default {
    title: 'Banners/MomentTemplate',
    args: props,
} as Meta;

const AusBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: neutral[93],
        },
        headerSettings: {
            textColour: brand[400],
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: brandAlt[400],
                textColour: 'black',
            },
            hover: {
                backgroundColour: brandAlt[400],
                textColour: 'black',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: 'transparent',
                textColour: 'black',
            },
            hover: {
                backgroundColour: 'transparent',
                textColour: 'black',
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: '#F1F8FC',
                textColour: brand[400],
                border: `1px solid ${brand[400]}`,
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: brand[400],
            },
            theme: 'brand',
        },
        highlightedTextSettings: {
            textColour: neutral[0],
            highlightColour: neutral[100],
        },
        imageSettings: {
            mainUrl:
                'https://media.guim.co.uk/25970fa37adbda03502302f36d351014b0679ed8/0_0_279_193/279.png',
            mobileUrl:
                'https://media.guim.co.uk/25970fa37adbda03502302f36d351014b0679ed8/0_0_279_193/279.png',
            tabletUrl:
                'https://media.guim.co.uk/25970fa37adbda03502302f36d351014b0679ed8/0_0_279_193/279.png',
            desktopUrl:
                'https://media.guim.co.uk/e7bc725ca9b4b21f4ac63ef9c015010318b6dcea/0_0_401_281/401.png',
            wideUrl:
                'https://media.guim.co.uk/b395f62f7001cb76d68b0d74ed31465129b77ef4/0_0_506_375/506.png',
            altText: 'Guardian logo being held up by supporters of the Guardian',
        },
        tickerStylingSettings: {
            textColour: '#052962',
            filledProgressColour: '#052962',
            progressBarBackgroundColour: '#fff',
            goalMarkerColour: 'black',
        },
        bannerId: 'aus-moment-banner',
    }),
    'aus-moment-banner',
);

const AusBannerTemplate: Story<BannerProps> = (props: BannerProps) => <AusBanner {...props} />;

export const Aus10yrAnniversaryMomentBanner = AusBannerTemplate.bind({});
Aus10yrAnniversaryMomentBanner.args = {
    ...props,
    content: {
        heading: 'Show your support for reader-funded journalism',
        messageText:
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations. We do not shy away. And we provide all this for free, for everyone.',
        paragraphs: [
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
            'We do not shy away. And we provide all this for free, for everyone.',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support once',
            baseUrl: 'https://support.theguardian.com/contribute/one-off',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support monthly',
                baseUrl: 'https://support.theguardian.com/contribute/recurring',
            },
        },
    },
    mobileContent: {
        heading: 'Show your support for reader-funded journalism',
        messageText:
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations. We do not shy away. And we provide all this for free, for everyone.',
        paragraphs: [
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
            'We do not shy away. And we provide all this for free, for everyone.',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute/one-off',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Learn more',
                baseUrl: 'https://support.theguardian.com/contribute/recurring',
            },
        },
    },
    numArticles: 50,
    tickerSettings: {
        countType: TickerCountType.money,
        endType: TickerEndType.hardstop,
        currencySymbol: '$',
        copy: {
            countLabel: 'raised',
            goalReachedPrimary: "We've met our goal - thank you!",
            goalReachedSecondary: '',
        },
        tickerData: {
            total: 1_200_000,
            goal: 1_250_000,
        },
        name: 'AU_2022',
    },
};
