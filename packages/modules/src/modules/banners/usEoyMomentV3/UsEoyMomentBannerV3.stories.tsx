import React from 'react';
import { Story, Meta } from '@storybook/react';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { neutral } from '@guardian/src-foundations';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { UsEoyMomentBannerVisualV3 } from './UsEoyMomentBannerVisualV3';

export default {
    title: 'Banners/MomentTemplate/US_EOY_V3_2022',
    args: props,
} as Meta;

const UsEoyMomentBannerV3 = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#EDEDED',
        },
        headerSettings: {
            textColour: '#7D0068',
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: '#7D0068',
                textColour: 'white',
            },
            hover: {
                backgroundColour: '#932881',
                textColour: 'white',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: neutral[86],
                textColour: neutral[7],
            },
            hover: {
                backgroundColour: neutral[100],
                textColour: neutral[7],
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: neutral[86],
                textColour: neutral[7],
                border: `1px solid ${neutral[7]}`,
            },
            hover: {
                backgroundColour: 'white',
                textColour: neutral[0],
            },
        },
        highlightedTextSettings: {
            textColour: neutral[0],
            highlightColour: neutral[100],
        },
        alternativeVisual: <UsEoyMomentBannerVisualV3 />,
        tickerStylingSettings: {
            textColour: '#7D0068',
            filledProgressColour: '#7D0068',
            progressBarBackgroundColour: '#fff',
            goalMarkerColour: '#000',
        },
        bannerId: 'us-eoy-banner-v3',
    }),
    'us-eoy-banner-v3',
);

const UsEoyTemplateV3: Story<BannerProps> = (props: BannerProps) => (
    <UsEoyMomentBannerV3 {...props} />
);

export const WithUnderfundedTicker = UsEoyTemplateV3.bind({});
WithUnderfundedTicker.args = {
    ...props,
    content: {
        heading: 'Lend us a hand in 2023',
        messageText:
            "We're proud to say that the Guardian is a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. Support from readers keeps us fiercely independent, with no shareholders to please or a billionaire owner. It allows us to keep our reporting open for all, because not everyone is in a position to pay for news. But if you can afford it, we need you. <strong>We are raising $1m to fund our journalism in 2023.</strong> Make an investment in quality journalism, so millions more can benefit.",
        paragraphs: [
            "We're proud to say that the Guardian is a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. Support from readers keeps us fiercely independent, with no shareholders to please or a billionaire owner. It allows us to keep our reporting open for all, because not everyone is in a position to pay for news. But if you can afford it, we need you. <strong>We are raising $1m to fund our journalism in 2023.</strong> Make an investment in quality journalism, so millions more can benefit.",
        ],
        highlightedText: 'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
        cta: {
            text: 'Support us monthly',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support just once',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    mobileContent: undefined,
    separateArticleCount: false,
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
            total: 1_000_000,
            goal: 1_250_000,
        },
        name: 'US_2022',
    },
};

export const WithOverfundedTicker = UsEoyTemplateV3.bind({});
WithOverfundedTicker.args = {
    ...WithUnderfundedTicker.args,
    tickerSettings: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- underfunded tickerSettings will not be undefined
        ...WithUnderfundedTicker.args.tickerSettings!,
        tickerData: {
            total: 1_500_000,
            goal: 1_250_000,
        },
    },
};
