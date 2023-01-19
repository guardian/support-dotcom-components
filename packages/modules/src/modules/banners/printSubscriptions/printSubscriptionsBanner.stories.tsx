import React, { ReactElement } from 'react';
import { PrintSubscriptionsBanner } from './PrintSubscriptionsBanner';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../utils/StorybookWrapper';
import { BannerContent, BannerProps, Tracking } from '@sdc/shared/types';

export default {
    component: PrintSubscriptionsBanner,
    title: 'Banners/PrintSubscriptionsBanner',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
    ],
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

export const defaultStory = (): ReactElement => {
    const content: BannerContent = {
        heading: text('heading', 'A new year calls for new thinking'),
        messageText: text(
            'messageText',
            'Discover our award-winning newspapers and magazines for less than you might think. Subscribe to one of our flexible packages, with up to 42% off the retail price.',
        ),
        paragraphs: array(
            'paragraphs',
            [
                'Discover our award-winning newspapers and magazines for less than you might think. Subscribe to one of our flexible packages, with up to 42% off the retail price.',
            ],
            '|',
        ),
    };

    const mobileContent: BannerContent = {
        heading: text('Mobile heading', 'A new year calls for new thinking'),
        messageText: text(
            'Mobile messageText',
            'Discover our award-winning newspapers and magazines for less than you might think. Subscribe to one of our flexible packages, with up to 42% off the retail price.',
        ),
        paragraphs: array(
            'Mobile paragraphs',
            [
                'Discover our award-winning newspapers and magazines for less than you might think. Subscribe to one of our flexible packages, with up to 42% off the retail price.',
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
            <PrintSubscriptionsBanner {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Print Subscriptions Banner' };
