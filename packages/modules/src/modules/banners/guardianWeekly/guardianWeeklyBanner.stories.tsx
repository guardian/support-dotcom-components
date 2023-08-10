import React from 'react';
import { GuardianWeeklyBanner } from './GuardianWeeklyBanner';
import { BannerContent, BannerProps, Tracking } from '@sdc/shared/types';
import { StoryFn } from '@storybook/react';

export default {
    component: GuardianWeeklyBanner,
    title: 'Banners/Subscriptions/GuardianWeeklyBanner',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
};

const tracking: Tracking = {
    ophanPageId: 'kbluzw2csbf83eabettt',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'GuardianWeeklyBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    products: ['PRINT_SUBSCRIPTION'],
};

const content: BannerContent = {
    heading: 'Open up your world view',
    messageText:
        'More people across Europe are reading the Guardian. Pause to consider a whole new perspective with the Guardian’s weekly news magazine. Home delivery available wherever you are.',
    paragraphs: [
        'Gain a deeper understanding of the issues that matter with the Guardian Weekly magazine. Every week, take your time over handpicked articles from the Guardian and Observer, delivered for free to wherever you are in the world.',
        '<strong>For a limited time, save 35% on an annual subscription.</strong>',
    ],
};

const mobileContent: BannerContent = {
    heading: 'Open up your world view',
    messageText:
        'Gain a deeper understanding of the issues that matter with the Guardian Weekly magazine.',
    paragraphs: [
        'Gain a deeper understanding of the issues that matter with the Guardian Weekly magazine. Every week, take your time over handpicked articles from the Guardian and Observer, delivered for free to wherever you are in the world.',
        '<strong>For a limited time, save 35% on an annual subscription.</strong>',
    ],
};

const Template: StoryFn<BannerProps> = (props: BannerProps) => <GuardianWeeklyBanner {...props} />;

export const DefaultStory = Template.bind({});

DefaultStory.args = {
    bannerChannel: 'subscriptions',
    content,
    mobileContent,
    isSupporter: false,
    tracking,
};

DefaultStory.storyName = 'Guardian Weekly Banner';
