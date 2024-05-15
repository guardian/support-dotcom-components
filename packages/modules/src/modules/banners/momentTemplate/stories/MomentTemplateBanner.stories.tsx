import { Meta } from '@storybook/react';
import { props } from '../../utils/storybook';
import { SecondaryCtaType, TickerCountType } from '@sdc/shared/types';
import { BannerWithReminderTemplate } from './WithReminder';
import { BannerWithHeaderImageTemplate } from './WithHeaderImage';
import { BannerWithChoiceCardsTemplate } from './WithChoiceCards';
import { DefaultTemplate } from './Default';
import { BannerWithTickerTemplate } from './WithTicker';
import { BannerWithChoiceCardsHeaderImageTemplate } from './WithChoiceCardsHeaderImage';
import { WithBackDropTemplate } from './WithBackDrop';

export default {
    title: 'Banners/MomentTemplate',
    args: props,
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
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

export const WithBackDrop = WithBackDropTemplate.bind({});
Default.args = {
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

export const WithChoiceCardsHeaderImage = BannerWithChoiceCardsHeaderImageTemplate.bind({});
WithChoiceCardsHeaderImage.args = {
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

export const WithTicker = BannerWithTickerTemplate.bind({});
WithTicker.args = {
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
        currencySymbol: '',
        copy: {
            countLabel: 'Contributions in May so far',
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
