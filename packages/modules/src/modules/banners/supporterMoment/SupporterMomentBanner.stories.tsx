import React from 'react';
import { neutral, brand, culture } from '@guardian/source-foundations';
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

const SupporterMomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#FDF1F8',
        },
        headerSettings: {
            showHeader: { text: true },
            textColour: '#721765',
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: '#721765',
                textColour: 'white',
            },
            hover: {
                backgroundColour: '#55114C',
                textColour: 'white',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: culture[800],
                textColour: brand[400],
                border: '1px solid #052962',
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: brand[400],
                border: '1px solid #052962',
            },
            theme: 'brand',
        },
        closeButtonSettings: {
            default: {
                backgroundColour: '#FDF1F8',
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
            textColour: 'white',
            highlightColour: '#721765',
        },
        choiceCards: true,
        choiceCardSettings: {
            buttonColour: neutral[100],
        },
        bannerId: 'supporter-moment-banner',
    }),
    'supporter-moment-banner',
);

const SupporterMomentTemplate: Story<BannerProps> = (props: BannerProps) => (
    <SupporterMomentBanner {...props} />
);

export const SupporterMoment2023 = SupporterMomentTemplate.bind({});
SupporterMoment2023.args = {
    ...props,
    content: {
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
