import React, { ReactElement } from 'react';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBanner';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { StorybookWrapper, BannerWrapper } from '../../../utils/StorybookWrapper';
import { BannerContent, BannerProps, SecondaryCtaType, Tracking } from '@sdc/shared/types';

export default {
    component: DigitalSubscriptionsBanner,
    title: 'Components/DigitalSubscriptionsBanner',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
    ],
};

const tracking: Tracking = {
    ophanPageId: 'kbluzw2csbf83eaberrr',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'DigitalSubscriptionsBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    products: ['DIGITAL_SUBSCRIPTION'],
};

export const defaultStory = (): ReactElement => {
    const content: BannerContent = {
        heading: text('heading', "You've read %%ARTICLE_COUNT%% articles in the last year"),
        messageText: text(
            'messageText',
            "And you're not alone. Millions have turned to the Guardian for vital, independent journalism in the last year. Reader funding powers our reporting. It protects our independence and ensures we can remain open for all. With <strong>a digital subscription starting from £5.99 a month</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps.",
        ),
        paragraphs: array(
            'paragraphs',
            ["And you're not alone. Millions have turned to the Guardian for vital, independent journalism in the last year. Reader funding powers our reporting. It protects our independence and ensures we can remain open for all.", "With <strong>a digital subscription starting from £5.99 a month</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps."],
            '|'
        ),
    };

    const mobileContent: BannerContent = {
        heading: text('mobileHeading', "We're powered by you"),
        messageText: text(
            'mobileMessageText',
            'Reader funding powers our reporting. It protects our independence and ensures we can remain open for all. With <strong>a digital subscription starting from £5.99 a month</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps.',
        ),
        paragraphs: array(
            'mobileParagraphs',
            ['Reader funding powers our reporting. It protects our independence and ensures we can remain open for all. With <strong>a digital subscription starting from £5.99 a month</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps.'],
            '|'
        ),
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Hide this',
                baseUrl: '',
            },
        },
    };

    const props: BannerProps = {
        bannerChannel: 'subscriptions',
        content,
        mobileContent,
        isSupporter: false,
        tracking,
        countryCode: 'GB',
    };

    return (
        <StorybookWrapper>
            <DigitalSubscriptionsBanner {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = {
    name: 'Digital Subscriptions Banner',
    decorators: [
        (Story: React.FC): ReactElement => (
            <BannerWrapper>
                <Story />
            </BannerWrapper>
        ),
    ],
};
