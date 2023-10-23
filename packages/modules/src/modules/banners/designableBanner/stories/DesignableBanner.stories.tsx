import { Meta } from '@storybook/react';
import { props } from '../../utils/storybook';
import { HexColour, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';
import { DefaultTemplate } from './Default';
import { ConfigurableDesign } from '@sdc/shared/dist/types';

export default {
    title: 'Banners/Designable',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
    args: props,
} as Meta;

const hexColourStringRegex = /^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
const stringToHexColour = (colourString: string): HexColour => {
    if (hexColourStringRegex.test(colourString)) {
        const matches = hexColourStringRegex.exec(colourString);
        return {
            r: (matches?.[1] as string).toUpperCase(),
            g: (matches?.[2] as string).toUpperCase(),
            b: (matches?.[3] as string).toUpperCase(),
            kind: 'hex',
        } as HexColour;
    } else {
        throw new Error('Invalid hex colour string!');
    }
};

const design: ConfigurableDesign = {
    visual: {
        kind: 'Image',
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
            background: stringToHexColour('F1F8FC'),
            bodyText: stringToHexColour('000000'),
            headerText: stringToHexColour('000000'),
            articleCountText: stringToHexColour('000000'),
        },
        highlightedText: {
            text: stringToHexColour('000000'),
            highlight: stringToHexColour('FFE500'),
        },
        primaryCta: {
            default: {
                text: stringToHexColour('FFFFFF'),
                background: stringToHexColour('0077B6'),
            },
            hover: {
                text: stringToHexColour('FFFFFF'),
                background: stringToHexColour('004E7C'),
            },
        },
        secondaryCta: {
            default: {
                text: stringToHexColour('004E7C'),
                background: stringToHexColour('F1F8FC'),
                border: stringToHexColour('004E7C'),
            },
            hover: {
                text: stringToHexColour('004E7C'),
                background: stringToHexColour('E5E5E5'),
                border: stringToHexColour('004E7C'),
            },
        },
        closeButton: {
            default: {
                text: stringToHexColour('052962'),
                background: stringToHexColour('F1F8FC'),
                border: stringToHexColour('052962'),
            },
            hover: {
                text: stringToHexColour('052962'),
                background: stringToHexColour('E5E5E5'),
            },
        },
        guardianRoundel: 'inverse',
        ticker: {
            text: stringToHexColour('052962'),
            filledProgress: stringToHexColour('052962'),
            progressBarBackground: stringToHexColour('ffffff'),
            goalMarker: stringToHexColour('000000'),
        },
    },
};

const content = {
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
};

const mobileContent = {
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
};

export const WithImage = DefaultTemplate.bind({});
WithImage.args = {
    ...props,
    content,
    mobileContent,
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
    design,
};

export const WithChoiceCards = DefaultTemplate.bind({});
WithChoiceCards.args = {
    ...props,
    content,
    mobileContent,
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
    design: {
        ...design,
        visual: {
            kind: 'ChoiceCards',
            buttonColour: stringToHexColour('E5E5E5'),
        },
    },
    // Note: the CTA will show "Support once" - this is an artefact of sharing content data across several tests and can be set by users to more appropriate copy in RRCP
    choiceCardAmounts: {
        testName: 'Storybook_test',
        variantName: 'CONTROL',
        defaultContributionType: 'MONTHLY',
        displayContributionType: ['ONE_OFF', 'MONTHLY', 'ANNUAL'],
        amountsCardData: {
            // Card should show £5 (default), £10 and "other" buttons
            ONE_OFF: {
                amounts: [5, 10, 15, 20],
                defaultAmount: 5,
                hideChooseYourAmount: false,
            },
            // Card should initially display showing Monthly amounts
            // Card should show £3, £6 and £10 (default) buttons
            MONTHLY: {
                amounts: [3, 6, 10],
                defaultAmount: 10,
                hideChooseYourAmount: true,
            },
            // Card should only show £100 (default) with no "other" button
            ANNUAL: {
                amounts: [100],
                defaultAmount: 100,
                hideChooseYourAmount: true,
            },
        },
    },
};

export const WithChoiceCardsEdgeCases = DefaultTemplate.bind({});
WithChoiceCardsEdgeCases.args = {
    ...props,
    content,
    mobileContent,
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
    design: {
        ...design,
        visual: {
            kind: 'ChoiceCards',
            buttonColour: stringToHexColour('E5E5E5'),
        },
    },
    choiceCardAmounts: {
        testName: 'Storybook_test',
        variantName: 'CONTROL',
        defaultContributionType: 'ANNUAL',
        displayContributionType: ['ONE_OFF', 'ANNUAL'],
        amountsCardData: {
            // Card should show only the "other" button (overrides hidden requirement)
            ONE_OFF: {
                amounts: [],
                defaultAmount: 1,
                hideChooseYourAmount: true,
            },
            // Card should not include a monthly tab or monthly amounts
            MONTHLY: {
                amounts: [3, 6, 10],
                defaultAmount: 10,
                hideChooseYourAmount: true,
            },
            // Card should initially display showing Annual amounts
            // Card should show £100 (default), £200 and £300 buttons
            ANNUAL: {
                amounts: [100, 200, 300],
                defaultAmount: 100,
                hideChooseYourAmount: true,
            },
        },
    },
};
