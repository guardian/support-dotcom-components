import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ChoiceCardsBannerUnValidated as ChoiceCardsBanner } from './ChoiceCardsBanner';
import { props } from '../utils/storybook';
import { text, array } from '@storybook/addon-knobs';
import { BannerProps } from '@sdc/shared/types';
import { tracking } from '../../epics/utils/storybook';

export default {
    component: ChoiceCardsBanner,
    title: 'Banners/Subscriptions/ChoiceCardsBanner',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <ChoiceCardsBanner {...props} />;

export const Default = Template.bind({});
Default.args = {
    ...props,
    bannerChannel: 'subscriptions',
    content: {
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
    },
    mobileContent: {
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
    },
    isSupporter: false,
    // correctly formatted epic storybook tracking data used here for banner example
    tracking,
    choiceCardAmounts: {
        testName: 'Storybook_test',
        variantName: 'Control',
        amounts: {
            ONE_OFF: {
                amounts: [5, 10, 15, 20],
                defaultAmount: 5,
                hideChooseYourAmount: false,
            },
            MONTHLY: {
                amounts: [6, 12, 18, 24],
                defaultAmount: 12,
                hideChooseYourAmount: true,
            },
            ANNUAL: {
                amounts: [50, 100, 150, 200],
                defaultAmount: 100,
                hideChooseYourAmount: true,
            },
        },
    },
};
