import React, { ReactElement } from 'react';
import { GuardianWeeklyBanner } from './GuardianWeeklyBanner';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../utils/StorybookWrapper';
import { BannerContent, BannerProps, Tracking } from '@sdc/shared/types';

export default {
    component: GuardianWeeklyBanner,
    title: 'Banners/Subscriptions/GuardianWeeklyBanner',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
    ],
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

export const defaultStory = (): ReactElement => {
    const content: BannerContent = {
        heading: text('heading', 'Open up your world view'),
        messageText: text(
            'messageText',
            'More people across Europe are reading the Guardian. Pause to consider a whole new perspective with the Guardian’s weekly news magazine. Home delivery available wherever you are.',
        ),
        paragraphs: array(
            'paragraphs',
            [
                'Gain a deeper understanding of the issues that matter with the Guardian Weekly magazine. Every week, take your time over handpicked articles from the Guardian and Observer, delivered for free to wherever you are in the world.',
                '<strong>For a limited time, save 35% on an annual subscription.</strong>',
            ],
            '|',
        ),
    };

    const mobileContent: BannerContent = {
        heading: text('Mobile heading', 'Open up your world view'),
        messageText: text(
            'Mobile messageText',
            'Gain a deeper understanding of the issues that matter with the Guardian Weekly magazine.',
        ),
        paragraphs: array(
            'Mobile paragraphs',
            [
                'Gain a deeper understanding of the issues that matter with the Guardian Weekly magazine. Every week, take your time over handpicked articles from the Guardian and Observer, delivered for free to wherever you are in the world.',
                '<strong>For a limited time, save 35% on an annual subscription.</strong>',
            ],
            '|',
        ),
    };

    const props: BannerProps = {
        bannerChannel: 'subscriptions',
        content,
        mobileContent,
        isSupporter: false,
        tracking,
    };
    return (
        <StorybookWrapper>
            <GuardianWeeklyBanner {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Guardian Weekly Banner' };
