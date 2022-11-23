import React from 'react';
import { Story, Meta } from '@storybook/react';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { neutral } from '@guardian/src-foundations';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

export default {
    title: 'Banners/MomentTemplate/US_GivingTues_2022',
    args: props,
} as Meta;

const UsEoyGivingTuesBanner = bannerWrapper(
    getMomentTemplateBanner({
        backgroundColour: '#e2e1e0',
        // Checked
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
        // Checked
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
            mobile: {
                backgroundColour: 'transparent',
                textColour: neutral[100],
                border: `1px solid ${neutral[100]}`,
            },
            desktop: {
                backgroundColour: 'transparent',
                textColour: neutral[7],
                border: `1px solid ${neutral[7]}`,
            },
        },
        highlightedTextSettings: {
            textColour: neutral[0],
            highlightColour: neutral[100],
        },
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/06e22c77193c7d5bc3229c4819b103ade4306579/0_0_1400_1400/500.png?quality=85&s=23b7ac6db68c9f8a373cf43f23d77a22',
            mobileUrl:
                'https://i.guim.co.uk/img/media/56e7d6bae1e012c12105c639862829489ef366dd/0_0_751_271/751.jpg?quality=85&s=91549fd65e116f9240c6c14a9eb94bd0',
            altText: 'The World On Fire',
        },
        bannerId: 'us-eoy-giving-tues-banner',
    }),
    'us-eoy-giving-tues-banner',
);

const UsEoy2022Template: Story<BannerProps> = (props: BannerProps) => (
    <UsEoyGivingTuesBanner {...props} />
);

export const WithUnderfundedTicker = UsEoy2022Template.bind({});
WithUnderfundedTicker.args = {
    ...props,
    content: {
        heading: 'The story is global. Support the Guardian.',
        messageText:
            'From climate collapse to rising authoritarianism, a cost of living crisis to the pandemic: the world’s crises are intertwined. Guardian journalists report from all over the globe – uncovering the truth, exposing injustice and countering misinformation. We keep our reporting free so that everyone, everywhere can access high-quality journalism. We need your help to keep going. Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – because we’re all in this together. Thank you.',
        paragraphs: [
            'From climate collapse to rising authoritarianism, a cost of living crisis to the pandemic: the world’s crises are intertwined. Guardian journalists report from all over the globe – uncovering the truth, exposing injustice and countering misinformation. We keep our reporting free so that everyone, everywhere can access high-quality journalism. We need your help to keep going. ',
        ],
        highlightedText:
            'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – because we’re all in this together. Thank you.',
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
            'From rising authoritarianism to climate collapse to an erosion of democratic norms, the issues facing us are daunting. Fearless, independent journalism that relentlessly reports the truth, uncovers injustice and exposes misinformation is essential to fighting back. We need your help to keep going – and help keep Guardian journalism free for everyone. Support the Guardian from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
        paragraphs: [
            'From rising authoritarianism to climate collapse to an erosion of democratic norms, the issues facing us are daunting. Fearless, independent journalism that relentlessly reports the truth, uncovers injustice and exposes misinformation is essential to fighting back. We need your help to keep going – and help keep Guardian journalism free for everyone. ',
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

export const WithOverfundedTicker = UsEoy2022Template.bind({});
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
