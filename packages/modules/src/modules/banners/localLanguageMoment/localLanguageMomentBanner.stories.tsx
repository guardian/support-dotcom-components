import React from 'react';
import { Story, Meta } from '@storybook/react';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { props } from '../utils/storybook';
import { BannerProps } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { brand, brandAlt, neutral } from '@guardian/src-foundations';
import { HeaderVisual } from './components/headerVisual';

export default {
    title: 'Banners/MomentTemplate',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
    args: props,
} as Meta;

const LocalLanguageMomentBanner = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#F1F8FC',
        },
        headerSettings: {
            textColour: '#052962',
            image: <HeaderVisual />,
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
        // choiceCards: true,
        bannerId: 'local-language-moment-banner',
    }),
    'local-language-moment-banner',
);

const LocalLanguageMomentTemplate: Story<BannerProps> = (props: BannerProps) => (
    <LocalLanguageMomentBanner {...props} />
);

export const LocalLanguageMoment = LocalLanguageMomentTemplate.bind({});
LocalLanguageMoment.args = {
    ...props,
    content: {
        heading: 'Local Language Replace',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, semi. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, semi. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. ',
        ],
        highlightedText:
            'Nullam dictum felis eu pede mollis pretium. Integeir tincidunt. Thank you.',
        cta: {
            text: 'Contribute',
            baseUrl: 'https://support.theguardian.com/contribute/one-off',
        },
    },
    mobileContent: {
        heading: 'Local Language Replace (mobile)',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, semi. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, semi. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. ',
        ],
        highlightedText:
            'Nullam dictum felis eu pede mollis pretium. Integeir tincidunt. Thank you.',
        cta: {
            text: 'Contribute',
            baseUrl: 'https://support.theguardian.com/contribute/one-off',
        },
    },
    // choiceCardAmounts: {
    //     testName: 'Storybook_localLanguage',
    //     variantName: 'Control',
    //     amounts: {
    //         ONE_OFF: {
    //             amounts: [5, 10, 15, 20],
    //             defaultAmount: 5,
    //             hideChooseYourAmount: false,
    //         },
    //         MONTHLY: {
    //             amounts: [3, 6, 10],
    //             defaultAmount: 10,
    //             hideChooseYourAmount: true,
    //         },
    //         ANNUAL: {
    //             amounts: [100],
    //             defaultAmount: 100,
    //             hideChooseYourAmount: true,
    //         },
    //     },
    // },
    numArticles: 50,
    tickerSettings: undefined,
};
