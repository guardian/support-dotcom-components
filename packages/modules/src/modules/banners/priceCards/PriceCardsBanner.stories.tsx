import React, { ReactElement } from 'react';
import { Meta } from '@storybook/react';
import { text, array, withKnobs } from '@storybook/addon-knobs';
import { BannerContent, BannerProps, Tracking } from '@sdc/shared/types';
import { StorybookWrapper } from '../../../utils/StorybookWrapper';
import { PriceCardsBanner } from './PriceCardsBanner';

const content: BannerContent = {
    heading: text('heading', 'Lend us a hand in 2023'),
    messageText: text(
        'messageText',
        'Shareholders or billionaire owner, we report on world events with accuracy, free from political and commercial influence. And unlike many others, we’re committed to keeping our reporting open for all readers. Every contribution, however big or small, makes a difference.',
    ),
    paragraphs: array(
        'paragraphs',
        [
            'Shareholders or billionaire owner, we report on world events with accuracy, free from political and commercial influence. And unlike many others, we’re committed to keeping our reporting open for all readers. Every contribution, however big or small, makes a difference.',
        ],
        '|',
    ),
    highlightedText:
        'Support us from as little as £1. If you can, please consider supporting us with a regular amount each month. Thank you.',
};

const mobileContent: BannerContent = {
    heading: text('heading', 'Lend us a hand in 2023'),
    messageText: text(
        'messageText',
        'Shareholders or billionaire owner, we report on world events with accuracy, free from political and commercial influence. And unlike many others, we’re committed to keeping our reporting open for all readers. Every contribution, however big or small, makes a difference.',
    ),
    paragraphs: array(
        'paragraphs',
        [
            'Shareholders or billionaire owner, we report on world events with accuracy, free from political and commercial influence. And unlike many others, we’re committed to keeping our reporting open for all readers. Every contribution, however big or small, makes a difference.',
        ],
        '|',
    ),
    highlightedText:
        'Support us from as little as £1. If you can, please consider supporting us with a regular amount each month. Thank you.',
};

const tracking: Tracking = {
    ophanPageId: '',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'PriceCardsBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    products: ['CONTRIBUTION'],
};

const props: BannerProps = {
    bannerChannel: 'subscriptions',
    content,
    mobileContent,
    isSupporter: false,
    tracking,
};

export default {
    component: PriceCardsBanner,
    title: 'Banners/Subscriptions/PriceCardsBanner',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
    ],
} as Meta;

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <PriceCardsBanner {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Price Cards Banner' };
