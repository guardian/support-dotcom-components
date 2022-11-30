import React from 'react';
import { Story, Meta } from '@storybook/react';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { neutral } from '@guardian/src-foundations';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

export default {
    title: 'Banners/MomentTemplate/AUS_EOY_2022',
    args: props,
} as Meta;

const AusEoyMomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        backgroundColour: '#DCDCDC',
        primaryCtaSettings: {
            default: {
                backgroundColour: neutral[7],
                textColour: 'white',
            },
            hover: {
                backgroundColour: neutral[20],
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
                backgroundColour: 'transparent',
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
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/83caba4bb9889827f34d2f1e7c2c4d7749d40474/0_0_336_136/336.png?quality=85&s=4ed39dc708e969e7dec9cb0197c8d410',
            mobileUrl:
                'https://i.guim.co.uk/img/media/83caba4bb9889827f34d2f1e7c2c4d7749d40474/0_0_336_136/336.png?quality=85&s=4ed39dc708e969e7dec9cb0197c8d410',
            tabletUrl:
                'https://i.guim.co.uk/img/media/c2f8d48210542c26d85a026481f518d1a90cf3af/0_0_1012_764/500.png?quality=85&s=b9118479c1ca7f4dcda0e2d0df8b1f39',
            desktopUrl:
                'https://i.guim.co.uk/img/media/f173ccaae6ee9647af256829189578c461808ab4/0_0_1344_920/500.png?quality=85&s=3b4244ce3f02f2413c856c2d07394ac8',
            leftColUrl:
                'https://i.guim.co.uk/img/media/4fd5eec5077978103a1ab382c2d908c038dcf7c1/0_0_1620_1144/1000.png?quality=85&s=9033535bc32e07e1ac888927879e9a22',
            wideUrl:
                'https://i.guim.co.uk/img/media/4fd5eec5077978103a1ab382c2d908c038dcf7c1/0_0_1620_1144/1000.png?quality=85&s=9033535bc32e07e1ac888927879e9a22',
            altText: 'Guardian Australia End Of Year 2022 Moment Banner',
        },
        tickerStylingSettings: {
            textColour: '#AB0613',
            filledProgressColour: '#AB0613',
            progressBarBackgroundColour: '#fff',
            goalMarkerColour: '#AB0613',
        },
        bannerId: 'aus-eoy-banner',
    }),
    'aus-eoy-banner',
);

const AusEoyMomentBannerTemplate: Story<BannerProps> = (props: BannerProps) => (
    <AusEoyMomentBanner {...props} />
);

export const WithUnderfundedTicker = AusEoyMomentBannerTemplate.bind({});
WithUnderfundedTicker.args = {
    ...props,
    content: {
        heading: 'Resist powerlessness. Protect democracy. Support the Guardian.',
        messageText:
            'From rising authoritarianism to climate collapse to an erosion of democratic norms, the issues facing us are daunting. Fearless, independent journalism that relentlessly reports the truth, uncovers injustice and exposes misinformation is essential to fighting back. We need your help to keep going – and help keep Guardian journalism free for everyone.',
        paragraphs: [
            'From rising authoritarianism to climate collapse to an erosion of democratic norms, the issues facing us are daunting. Fearless, independent journalism that relentlessly reports the truth, uncovers injustice and exposes misinformation is essential to fighting back. We need your help to keep going – and help keep Guardian journalism free for everyone.',
        ],
        highlightedText: 'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
        cta: {
            text: 'Support independent journalism',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Hear from our editor',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    mobileContent: {
        heading: 'Resist powerlessness. Protect democracy. Support the Guardian.',
        messageText:
            'From rising authoritarianism to climate collapse to an erosion of democratic norms, the issues facing us are daunting. Fearless, independent journalism that relentlessly reports the truth, uncovers injustice and exposes misinformation is essential to fighting back. We need your help to keep going – and help keep Guardian journalism free for everyone.',
        paragraphs: [
            'From rising authoritarianism to climate collapse to an erosion of democratic norms, the issues facing us are daunting. Fearless, independent journalism that relentlessly reports the truth, uncovers injustice and exposes misinformation is essential to fighting back. We need your help to keep going – and help keep Guardian journalism free for everyone.',
        ],
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Learn more',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    separateArticleCount: true,
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

export const WithOverfundedTicker = AusEoyMomentBannerTemplate.bind({});
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
