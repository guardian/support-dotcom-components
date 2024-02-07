import { Meta } from '@storybook/react';
import { props } from '../../utils/storybook';
import {
    BannerDesignImage,
    HexColour,
    SecondaryCtaType,
    TickerCountType,
    TickerEndType,
    TickerSettings,
    SelectedAmountsVariant,
    ConfigurableDesign,
} from '@sdc/shared/types';
import { DefaultTemplate } from './Default';

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

const contentNoHeading = {
    paragraphs: [
        'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
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

const contentWithHeading = {
    ...contentNoHeading,
    heading: 'Show your support for reader-funded journalism',
};

const mobileContentNoHeading = {
    paragraphs: [
        'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. <strong>We have no shareholders.</strong> No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
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

const mobileContentWithHeading = {
    ...mobileContentNoHeading,
    heading: 'Show your support for reader-funded journalism',
};

const tickerSettings: TickerSettings = {
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
};

const regularChoiceCardAmounts: SelectedAmountsVariant = {
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
};

const edgeCaseChoiceCardAmounts: SelectedAmountsVariant = {
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
};

const headerImage: BannerDesignImage = {
    kind: 'Image',
    mobileUrl:
        'https://i.guim.co.uk/img/media/036510bc15ecdba97355f464006e3db5fbde9129/0_0_620_180/master/620.jpg?width=310&height=90&quality=100&s=01c604815a2f9980a1227c0d91ffa6b1',
    tabletDesktopUrl:
        'https://i.guim.co.uk/img/media/7030f9d98e368d6e5c7a34c643c76d7d1f5ac63c/0_0_1056_366/master/1056.jpg?width=528&height=183&quality=100&s=f0c02cddda84dfaf4ef261d91bd26159',
    wideUrl:
        'https://i.guim.co.uk/img/media/3c1cb611785d3dccc2674636a6f692da1e2fcdb6/0_0_1392_366/master/1392.jpg?width=696&height=183&quality=100&s=5935c1ae5e8cbc5d9ed616bbadb3b09e',
    altText: "Guardian: Our Planet can't Speak for itself",
};

const regularImage: BannerDesignImage = {
    kind: 'Image',
    mobileUrl:
        'https://i.guim.co.uk/img/media/058e7bd9d7a37983eb01cf981f67bd6efe42f95d/0_0_500_300/500.jpg?width=500&height=300&quality=75&s=632c02ed370780425b323aeb1e98cd80',
    tabletDesktopUrl:
        'https://i.guim.co.uk/img/media/cb654baf73bec78a73dbd656e865dedc3807ec74/0_0_300_300/300.jpg?width=300&height=300&quality=75&s=28324a5eb4f5f18eabd8c7b1a59ed150',
    wideUrl:
        'https://i.guim.co.uk/img/media/058e7bd9d7a37983eb01cf981f67bd6efe42f95d/0_0_500_300/500.jpg?width=500&height=300&quality=75&s=632c02ed370780425b323aeb1e98cd80',
    altText: 'Example alt text',
};

const design: ConfigurableDesign = {
    colours: {
        basic: {
            background: stringToHexColour('F1F8FC'),
            bodyText: stringToHexColour('000000'),
            headerText: stringToHexColour('000000'),
            articleCountText: stringToHexColour('000000'),
            logo: stringToHexColour('000000'),
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
        ticker: {
            text: stringToHexColour('052962'),
            filledProgress: stringToHexColour('052962'),
            progressBarBackground: stringToHexColour('cccccc'),
            goalMarker: stringToHexColour('000000'),
        },
    },
};

export const DesignOneImageOnly = DefaultTemplate.bind({});
DesignOneImageOnly.args = {
    ...props,
    content: contentWithHeading,
    mobileContent: mobileContentWithHeading,
    numArticles: 50,
    tickerSettings,
    design: {
        ...design,
        visual: regularImage,
    },
};

export const DesignTwoRegularAmounts = DefaultTemplate.bind({});
DesignTwoRegularAmounts.args = {
    ...props,
    content: contentWithHeading,
    mobileContent: mobileContentWithHeading,
    numArticles: 50,
    tickerSettings,
    design: {
        ...design,
        visual: {
            kind: 'ChoiceCards',
            buttonColour: stringToHexColour('E5E5E5'),
        },
    },
    choiceCardAmounts: regularChoiceCardAmounts,
};

export const DesignTwoEdgeCaseAmounts = DefaultTemplate.bind({});
DesignTwoEdgeCaseAmounts.args = {
    ...props,
    content: contentWithHeading,
    mobileContent: mobileContentWithHeading,
    numArticles: 50,
    tickerSettings,
    design: {
        ...design,
        visual: {
            kind: 'ChoiceCards',
            buttonColour: stringToHexColour('883333'),
            buttonTextColour: stringToHexColour('FFFFFF'),
            buttonBorderColour: stringToHexColour('8888FF'),
            buttonSelectColour: stringToHexColour('338833'),
            buttonSelectTextColour: stringToHexColour('FFFF88'),
            buttonSelectBorderColour: stringToHexColour('88FF88'),
        },
    },
    choiceCardAmounts: edgeCaseChoiceCardAmounts,
};

export const DesignThreeHeaderImageOnly = DefaultTemplate.bind({});
DesignThreeHeaderImageOnly.args = {
    ...props,
    content: contentNoHeading,
    mobileContent: mobileContentNoHeading,
    numArticles: 50,
    tickerSettings,
    design: {
        ...design,
        headerImage,
        visual: {
            kind: 'ChoiceCards',
            buttonColour: stringToHexColour('E5E5E5'),
        },
        colours: {
            ...design.colours,
            basic: {
                ...design.colours.basic,
                background: stringToHexColour('FFFFFF'),
            },
        },
    },
    choiceCardAmounts: regularChoiceCardAmounts,
};

export const DesignFourHeaderImageAndCopy = DefaultTemplate.bind({});
DesignFourHeaderImageAndCopy.args = {
    ...props,
    content: contentWithHeading,
    mobileContent: mobileContentWithHeading,
    numArticles: 50,
    tickerSettings,
    design: {
        ...design,
        headerImage,
        visual: {
            kind: 'ChoiceCards',
            buttonColour: stringToHexColour('E5E5E5'),
        },
        colours: {
            ...design.colours,
            basic: {
                ...design.colours.basic,
                background: stringToHexColour('FFFFFF'),
            },
        },
    },
    choiceCardAmounts: regularChoiceCardAmounts,
};

export const NoChoiceCardOrImage = DefaultTemplate.bind({});
NoChoiceCardOrImage.args = {
    ...props,
    content: contentWithHeading,
    mobileContent: mobileContentWithHeading,
    numArticles: 50,
    design: {
        ...design,
        visual: undefined,
    },
    tickerSettings: undefined,
};

export const WithNonSupportUrl = DefaultTemplate.bind({});
WithNonSupportUrl.args = {
    ...props,
    content: {
        ...contentWithHeading,
        cta: {
            baseUrl: 'theguardian.com',
            text: 'Continue to the Guardian',
        },
    },
    numArticles: 50,
    design: {
        ...design,
        visual: undefined,
    },
    tickerSettings: undefined,
};
