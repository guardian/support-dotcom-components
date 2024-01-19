import React from 'react';
import { neutral, brand, brandAlt, culture } from '@guardian/source-foundations';
import { bannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { BannerProps } from '@sdc/shared/src/types';
import { Meta, Story } from '@storybook/react';
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

const ChoiceCardsMomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#F1F8FC',
        },
        headerSettings: {
            showHeader: { text: true },
            textColour: brand[400],
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: brandAlt[400],
                textColour: 'black',
            },
            hover: {
                backgroundColour: brandAlt[200],
                textColour: 'black',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: culture[800],
                textColour: brand[400],
                border: `1px solid ${brand[400]}`,
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: brand[400],
                border: `1px solid ${brand[400]}`,
            },
            theme: 'brand',
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
            textColour: 'black',
            highlightColour: brandAlt[400],
        },
        choiceCards: true,
        choiceCardSettings: {
            buttonColour: neutral[100],
        },
        bannerId: 'choice-cards-moment-banner',
    }),
    'choice-cards-moment-banner',
);

const ChoiceCardsMomentTemplate: Story<BannerProps> = (props: BannerProps) => (
    <ChoiceCardsMomentBanner {...props} />
);

export const ChoiceCardsMoment2023 = ChoiceCardsMomentTemplate.bind({});
ChoiceCardsMoment2023.args = {
    ...props,
    content: {
        heading: 'As 2023 unfolds, will you support us?',
        messageText:
            'We’re a reader-funded news organisation, with more than 1.5 million supporters in 180 countries. With this vital support, our reporting remains fiercely independent, and is never manipulated by commercial or political ties. And it’s free, for everyone. But if you can support us, we need you.',
        paragraphs: [
            'We’re a reader-funded news organisation, with more than 1.5 million supporters in 180 countries. With this vital support, our reporting remains fiercely independent, and is never manipulated by commercial or political ties. And it’s free, for everyone. But if you can support us, we need you.',
        ],
        highlightedText:
            'Give just once from £1, or better yet, power us every month with a little more. Thank you.',
        cta: {
            text: 'Continue',
            baseUrl: 'https://support.theguardian.com/contribute/one-off',
        },
    },
    mobileContent: {
        heading: 'The only pocket we’re in is yours',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, semi. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, semi. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. ',
        ],
        highlightedText:
            'Nullam dictum felis eu pede mollis pretium. Integeir tincidunt. Thank you.',
        cta: {
            text: 'Continue',
            baseUrl: 'https://support.theguardian.com/contribute/one-off',
        },
    },
    choiceCardAmounts: {
        testName: 'Storybook_test',
        variantName: 'CONTROL',
        defaultContributionType: 'MONTHLY',
        displayContributionType: ['ONE_OFF', 'MONTHLY', 'ANNUAL'],
        amountsCardData: {
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
    },
    numArticles: 50,
    tickerSettings: undefined,
};
