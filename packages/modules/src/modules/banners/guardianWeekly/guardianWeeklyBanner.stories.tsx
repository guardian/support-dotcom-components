import React, { ReactElement } from 'react';
import { GuardianWeeklyBanner } from './GuardianWeeklyBanner';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../utils/StorybookWrapper';
import { BannerContent, BannerProps, Tracking } from '@sdc/shared/types';

export default {
    component: GuardianWeeklyBanner,
    title: 'Banners/GuardianWeeklyBanner',
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
        heading: text('heading', 'A new year calls for new thinking'),
        messageText: text(
            'messageText',
            "Support The Guardian's independent journalism by subscribing to The Guardian getWeeklyArticleHistory, our essential world news magazine. Home delivery available wherever you are.",
        ),
        paragraphs: array(
            'paragraphs',
            [
                "Support The Guardian's independent journalism by subscribing to The Guardian getWeeklyArticleHistory, our essential world news magazine. Home delivery available wherever you are.",
            ],
            '|',
        ),
    };

    const mobileContent: BannerContent = {
        heading: text('Mobile heading', 'A new year calls for new thinking'),
        messageText: text(
            'Mobile messageText',
            "Support The Guardian's independent journalism by subscribing to The Guardian getWeeklyArticleHistory, our essential world news magazine. Home delivery available wherever you are.",
        ),
        paragraphs: array(
            'Mobile paragraphs',
            [
                "Support The Guardian's independent journalism by subscribing to The Guardian getWeeklyArticleHistory, our essential world news magazine. Home delivery available wherever you are.",
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
