import React from 'react';
import { PrintSubscriptionsBanner } from './PrintSubscriptionsBanner';
import { BannerContent, BannerProps, Tracking } from '@sdc/shared/types';
import { StoryFn } from '@storybook/react';

export default {
    component: PrintSubscriptionsBanner,
    title: 'Banners/Subscriptions/PrintSubscriptionsBanner',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
};

const tracking: Tracking = {
    ophanPageId: '',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'PrintSubscriptionsBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    products: ['PRINT_SUBSCRIPTION'],
};

const content: BannerContent = {
    heading: 'A new year calls for new thinking',
    messageText:
        'Discover our award-winning newspapers and magazines for less than you might think. Subscribe to one of our flexible packages, with up to 42% off the retail price.',
    paragraphs: [
        'Discover our award-winning newspapers and magazines for less than you might think. Subscribe to one of our flexible packages, with up to 42% off the retail price.',
    ],
};

const mobileContent: BannerContent = {
    heading: 'A new year calls for new thinking',
    messageText:
        'Discover our award-winning newspapers and magazines for less than you might think. Subscribe to one of our flexible packages, with up to 42% off the retail price.',
    paragraphs: [
        'Discover our award-winning newspapers and magazines for less than you might think. Subscribe to one of our flexible packages, with up to 42% off the retail price.',
    ],
};

const Template: StoryFn<BannerProps> = (props: BannerProps) => (
    <PrintSubscriptionsBanner {...props} />
);

const DefaultStory = Template.bind({});

DefaultStory.args = {
    bannerChannel: 'subscriptions',
    content,
    mobileContent,
    isSupporter: false,
    tracking,
};

DefaultStory.storyName = 'Print Subscriptions Banner';
