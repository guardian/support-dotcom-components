import React from 'react';
import { Story, Meta } from '@storybook/react';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { brand, brandAlt, neutral } from '@guardian/source-foundations';

export default {
    title: 'Banners/Moment',
    args: props,
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
} as Meta;

const AusMomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: neutral[93],
        },
        headerSettings: {
            showHeader: { text: true },
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
                backgroundColour: neutral[93],
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
            highlightColour: brandAlt[400],
        },
        imageSettings: {
            mainUrl:
                'https://media.guim.co.uk/2922aee59bd3d36f920e1849137e92bfa212bd4d/0_0_540_308/540.png',
            altText: 'Guardian logo being held up by supporters of the Guardian',
        },
        tickerStylingSettings: {
            textColour: '#052962',
            filledProgressColour: '#052962',
            progressBarBackgroundColour: '#fff',
            goalMarkerColour: 'black',
        },
        bannerId: 'aus-anniversary-moment-banner',
    }),
    'aus-anniversary-moment-banner',
);

const AusMomentBannerTemplate: Story<BannerProps> = (props: BannerProps) => (
    <AusMomentBanner {...props} />
);

export const AusAnniversaryMoment2023 = AusMomentBannerTemplate.bind({});
AusAnniversaryMoment2023.args = {
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
        currencySymbol: '',
        copy: {
            countLabel: 'contributions in May',
            goalReachedPrimary: "We've met our goal - thank you!",
            goalReachedSecondary: '',
        },
        tickerData: {
            total: 4_000,
            goal: 50_000,
        },
        name: 'AU',
    },
};
