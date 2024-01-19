import React from 'react';
import { brand, neutral, specialReport } from '@guardian/source-foundations';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/dist/types';
import { Meta, Story } from '@storybook/react';
import { bannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { props } from '../utils/storybook';

export default {
    title: 'Banners/Moment',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
    args: props,
} as Meta;

const Scotus2023MomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: specialReport[100],
            textColor: neutral[100],
        },
        headerSettings: {
            showHeader: { text: true },
            textColour: neutral[100],
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: brand[500],
                textColour: neutral[100],
            },
            hover: {
                backgroundColour: neutral[100],
                textColour: brand[500],
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: specialReport[100],
                textColour: neutral[100],
                border: `1px solid ${neutral[100]}`,
            },
            hover: {
                backgroundColour: neutral[100],
                textColour: specialReport[100],
                border: `1px solid ${specialReport[100]}`,
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: neutral[100],
                textColour: specialReport[100],
                border: `1px solid ${specialReport[100]}`,
            },
            hover: {
                backgroundColour: specialReport[100],
                textColour: neutral[100],
                border: `1px solid ${neutral[100]}`,
            },
            guardianRoundel: 'inverse',
        },
        highlightedTextSettings: {
            textColour: specialReport[100],
            highlightColour: neutral[100],
        },
        articleCountTextColour: neutral[100],
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/752_639_3258_1303/1000.jpg?width=500&quality=75&s=f19e815a62c8550748d9514d39298683',
            mobileUrl:
                'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/752_639_3258_1303/1000.jpg?width=500&quality=75&s=f19e815a62c8550748d9514d39298683',
            tabletUrl:
                'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/1400_406_1772_1773/1000.jpg?width=500&quality=75&s=16e4aebfcbad771ee40c9b6f9fd99056',
            desktopUrl:
                'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/1400_406_1772_1773/1000.jpg?width=500&quality=75&s=16e4aebfcbad771ee40c9b6f9fd99056',
            leftColUrl:
                'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/1395_636_1953_1302/1953.jpg?width=900&quality=75&s=133c6e21b3a43c57f91fd16ecbe942ec',
            wideUrl:
                'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/1395_636_1953_1302/1953.jpg?width=900&quality=75&s=133c6e21b3a43c57f91fd16ecbe942ec',
            altText: 'APPROPRIATE ALT TEXT HERE',
        },
        bannerId: 'scotus-2023-moment-banner',
    }),
    'scotus-2023-moment-banner',
);

const Scotus2023MomentTemplate: Story<BannerProps> = (props: BannerProps) => (
    <Scotus2023MomentBanner {...props} />
);

export const USSupremeCourtMoment2023 = Scotus2023MomentTemplate.bind({});
USSupremeCourtMoment2023.args = {
    ...props,
    content: {
        heading: 'One year ago, they set women’s rights back by half a century',
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'From abortion to guns to environmental protections, the US Supreme Court is increasingly out of step with the American people. In recent years, a far-right movement has helped seat justices who are redefining public life and undermining democracy. Independent journalism is critical to holding this institution to account.',
        ],
        highlightedText:
            'Our journalism is free for everyone, but if you can support us, we need you. Give just once from %%CURRENCY_SYMBOL%%1, or power us every month with a little more. Thank you.',
        cta: {
            text: 'Support monthly',
            baseUrl: 'https://support.theguardian.com/contribute/recurring',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support once',
                baseUrl: 'https://support.theguardian.com/contribute/one-off',
            },
        },
    },
    mobileContent: {
        heading: "One year ago, they set women's rights back by half a century",
        messageText: `You've read %%ARTICLE_COUNT%% articles in the last year`,
        paragraphs: [
            'From abortion to guns to environmental protections, the US Supreme Court is increasingly out of step with the American people. In recent years, a far-right movement has helped seat justices who are redefining public life and undermining democracy. Independent journalism is critical to holding this institution to account.',
        ],
        highlightedText:
            'Our journalism is free for everyone, but if you can support us, we need you. Give just once from %%CURRENCY_SYMBOL%%1, or power us every month with a little more. Thank you.',
        cta: {
            text: 'Support monthly',
            baseUrl: 'https://support.theguardian.com/contribute/recurring',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Support once',
                baseUrl: 'https://support.theguardian.com/contribute/one-off',
            },
        },
    },
    numArticles: 50,
    tickerSettings: undefined,
};
