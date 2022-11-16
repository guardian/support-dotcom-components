import React from 'react';
import { Story, Meta } from '@storybook/react';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { neutral } from '@guardian/src-foundations';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

export default {
    title: 'Banners/MomentTemplate',
    args: props,
} as Meta;

const UsEoyMomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        backgroundColour: neutral[86],
        primaryCtaSettings: {
            default: {
                backgroundColour: neutral[7],
                textColour: 'white',
            },
            hover: {
                backgroundColour: neutral[46],
                textColour: 'white',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: neutral[86],
                textColour: neutral[7],
            },
            hover: {
                backgroundColour: neutral[93],
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
        imageSettings: {
            mainUrl:
                'https://media.guim.co.uk/56d31914ea2f5bb335c4a2b69c6711903e999c86/0_0_820_932/820.png',
            mobileUrl:
                'https://media.guim.co.uk/2494b0dd21a753c373fcb85c26d4c461e13c6b5b/149_0_1195_588/500.png',
            altText: 'The United States Capitol Building',
            bannerId: 'us-eoy-banner',
        },
    }),
    'us-eoy-banner',
);

const UsEoy2022Template: Story<BannerProps> = (props: BannerProps) => (
    <UsEoyMomentBanner {...props} />
);

export const UsEoy2022Capitol = UsEoy2022Template.bind({});
UsEoy2022Capitol.args = {
    ...props,
    content: {
        heading: 'Resist powerlessness. Protect democracy. Support the Guardian.',
        messageText:
            'From rising authoritarianism to climate collapse to an erosion of democratic norms, the issues facing us are daunting. Fearless, independent journalism that relentlessly reports the truth, uncovers injustice and exposes misinformation is essential to fighting back. We need your help to keep going – and help keep Guardian journalism free for everyone. Support the Guardian from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
        paragraphs: [
            'From rising authoritarianism to climate collapse to an erosion of democratic norms, the issues facing us are daunting. Fearless, independent journalism that relentlessly reports the truth, uncovers injustice and exposes misinformation is essential to fighting back. We need your help to keep going – and help keep Guardian journalism free for everyone. ',
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
        //
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
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
        //
        tickerData: {
            total: 1_299_999,
            goal: 1_250_000,
        },
    },
};
