import { Meta } from '@storybook/react';
import { props } from '../../utils/storybook';
import { HexColour, SecondaryCtaType } from '@sdc/shared/types';
import { DefaultTemplate } from './Default';
import { ConfigurableDesign } from '@sdc/shared/dist/types';

export default {
    title: 'Banners/Custom',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
    args: props,
} as Meta;

// Unsafe - do not use outside of storybook
const hexColourFromString = (s: string): HexColour =>
    ({
        r: s[0] + s[1],
        g: s[2] + s[3],
        b: s[4] + s[5],
        kind: 'hex',
    }) as HexColour;

const design: ConfigurableDesign = {
    image: {
        mobileUrl:
            'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
        tabletDesktopUrl:
            'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
        wideUrl:
            'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
        altText: 'Example alt text',
    },
    colours: {
        basic: {
            background: hexColourFromString('F1F8FC'),
            bodyText: hexColourFromString('000000'),
            headerText: hexColourFromString('000000'),
            articleCountText: hexColourFromString('000000'),
        },
        highlightedText: {
            text: hexColourFromString('000000'),
            highlight: hexColourFromString('FFE500'),
        },
        primaryCta: {
            default: {
                text: hexColourFromString('FFFFFF'),
                background: hexColourFromString('0077B6'),
            },
            hover: {
                text: hexColourFromString('FFFFFF'),
                background: hexColourFromString('004E7C'),
            },
        },
        secondaryCta: {
            default: {
                text: hexColourFromString('004E7C'),
                background: hexColourFromString('F1F8FC'),
                border: hexColourFromString('FFFFFF'),
            },
            hover: {
                text: hexColourFromString('004E7C'),
                background: hexColourFromString('E5E5E5'),
                border: hexColourFromString('222527'),
            },
        },
        closeButton: {
            default: {
                text: hexColourFromString('052962'),
                background: hexColourFromString('F1F8FC'),
                border: hexColourFromString('052962'),
            },
            hover: {
                text: hexColourFromString('052962'),
                background: hexColourFromString('E5E5E5'),
            },
        },
    },
};

export const Designable = DefaultTemplate.bind({});
Designable.args = {
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
    design,
};
