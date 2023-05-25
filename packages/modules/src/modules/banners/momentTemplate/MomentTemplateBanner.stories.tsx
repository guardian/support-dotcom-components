import React from 'react';
import { Story, Meta } from '@storybook/react';
import { getMomentTemplateBanner } from './MomentTemplateBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { brand, brandAlt, neutral } from '@guardian/src-foundations';
import { TopImage } from '../worldPressFreedomDay/components/TopImage';

export default {
    title: 'Banners/MomentTemplate',
    args: props,
} as Meta;

const BannerWithReminder = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#e4e4e3',
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: '#121212',
                textColour: 'white',
            },
            hover: {
                backgroundColour: '#454545',
                textColour: 'white',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: '#e4e4e3',
                textColour: neutral[7],
            },
            hover: {
                backgroundColour: '#e4e4e3',
                textColour: neutral[7],
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: '#e4e4e3',
                textColour: neutral[0],
                border: `1px solid ${neutral[0]}`,
            },
            hover: {
                backgroundColour: 'white',
                textColour: neutral[0],
            },
        },
        highlightedTextSettings: {
            textColour: neutral[0],
        },
        setReminderCtaSettings: {
            default: {
                backgroundColour: '#e4e4e3',
                textColour: neutral[0],
                border: `1px solid ${neutral[0]}`,
            },
            hover: {
                backgroundColour: 'white',
                textColour: neutral[0],
            },
        },
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/ad0166d7724eb2dfc6aa16fea50fe41c02324eb8/0_0_281_131/281.png?quality=85&s=7639d39b1492f5e2f4883496fcc5740c',
            mobileUrl:
                'https://i.guim.co.uk/img/media/ad0166d7724eb2dfc6aa16fea50fe41c02324eb8/0_0_281_131/281.png?quality=85&s=7639d39b1492f5e2f4883496fcc5740c',
            tabletUrl:
                'https://i.guim.co.uk/img/media/8da1d854dee753e006afc5677a09a13bc84b4eb9/0_0_1524_1652/923.png?quality=85&s=7df1807f0583e942744bdda49b0503b7',
            desktopUrl:
                'https://i.guim.co.uk/img/media/6daf1817afa379d842b10eb91d7bcda3c4c5fdad/0_0_2028_1648/1000.png?quality=85&s=86cc64b3196566587cf0b9bffc30828e',
            leftColUrl:
                'https://i.guim.co.uk/img/media/4fa98ca4b70ee9b21b74d16f2586b5d6c513297f/0_195_2836_1961/2000.png?quality=85&s=0ce3473523516664ed9a7f9cde095073',
            wideUrl:
                'https://i.guim.co.uk/img/media/4fa98ca4b70ee9b21b74d16f2586b5d6c513297f/0_319_2836_1837/2000.png?quality=85&s=3ef36bd5ab569f310b0f975372f54d29',
            altText:
                'Head shots of Anthony Albanese, leader of the Australian Labor Party, and Scott Morrison, current Prime Minister and leader of the Liberal Party of Australia, who are running for the office of Prime Minister in the Australian federal election, to be held on 21 May 2022.',
        },
    }),
    'aus-eoy-banner',
);

const BannerWithReminderTemplate: Story<BannerProps> = (props: BannerProps) => (
    <BannerWithReminder {...props} />
);

export const WithReminder = BannerWithReminderTemplate.bind({});
WithReminder.args = {
    ...props,
    content: {
        heading: 'As 2022 begins, will you support us?',
        messageText:
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations. We do not shy away. And we provide all this for free, for everyone.',
        paragraphs: [
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
            'We do not shy away. And we provide all this for free, for everyone.',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
    mobileContent: {
        heading: 'As 2022 begins, will you support us?',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
    numArticles: 50,
};

const BannerWithHeaderImage = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#F1F8FC',
        },
        headerSettings: {
            textColour: '#0077B6',
            image: <TopImage />,
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: '#0077B6',
                textColour: 'white',
            },
            hover: {
                backgroundColour: '#004E7C',
                textColour: 'white',
                border: '1px solid #004E7C',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: '#F1F8FC',
                textColour: '#004E7C',
                border: '1px solid #004E7C',
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: '#004E7C',
                border: '1px solid #004E7C',
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
            highlightColour: brandAlt[400],
        },
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
            mobileUrl:
                'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
            tabletUrl:
                'https://i.guim.co.uk/img/media/d1af2bcab927ca0ad247522105fe41a52a474d27/0_0_1080_1000/500.png?width=500&quality=75&s=af39fa30f36fce453eabaef3063a3180',
            desktopUrl:
                'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
            wideUrl:
                'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
            altText: 'Guardian logo being held up by supporters of the Guardian',
        },
        bannerId: 'global-new-year-banner',
    }),
    'global-new-year-banner',
);

const BannerWithHeaderImageTemplate: Story<BannerProps> = (props: BannerProps) => (
    <BannerWithHeaderImage {...props} />
);

export const WithHeaderImage = BannerWithHeaderImageTemplate.bind({});
WithHeaderImage.args = {
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
    tickerSettings: undefined,
};

const BannerWithChoiceCards = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#F1F8FC',
        },
        headerSettings: {
            textColour: '#0077B6',
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: '#0077B6',
                textColour: 'white',
            },
            hover: {
                backgroundColour: '#004E7C',
                textColour: 'white',
                border: '1px solid #004E7C',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: '#F1F8FC',
                textColour: '#004E7C',
                border: '1px solid #004E7C',
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: '#004E7C',
                border: '1px solid #004E7C',
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
            highlightColour: brandAlt[400],
        },
        choiceCards: true,
        bannerId: 'global-new-year-banner',
    }),
    'global-new-year-banner',
);

const BannerWithChoiceCardsTemplate: Story<BannerProps> = (props: BannerProps) => (
    <BannerWithChoiceCards
        {...props}
        choiceCardAmounts={{
            testName: 'Storybook_test',
            variantName: 'Control',
            amounts: {
                ONE_OFF: {
                    amounts: [5, 10, 15, 20],
                    defaultAmount: 5,
                    hideChooseYourAmount: false,
                },
                MONTHLY: {
                    amounts: [3, 6, 10],
                    defaultAmount: 10,
                    hideChooseYourAmount: true,
                },
                ANNUAL: {
                    amounts: [100],
                    defaultAmount: 100,
                    hideChooseYourAmount: true,
                },
            },
        }}
    />
);

export const WithChoiceCards = BannerWithChoiceCardsTemplate.bind({});
WithChoiceCards.args = {
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
    tickerSettings: undefined,
};
