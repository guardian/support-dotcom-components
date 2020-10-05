import React, { ReactElement } from 'react';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBanner';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';
import { BannerContent, BannerProps, BannerTracking } from '../../../../types/BannerTypes';

export default {
    component: DigitalSubscriptionsBanner,
    title: 'Components/DigitalSubscriptionsBanner',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
    ],
};

const tracking: BannerTracking = {
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
        heading: text('heading', 'Enjoy ad-free reading and the best of our apps'),
        messageText: text(
            'messageText',
            'Support the Guardian with a Digital Subscription, enjoy our reporting without ads and get premium access to our Live app and The Daily.',
        ),
    };

    const props: BannerProps = {
        bannerChannel: 'subscriptions',
        content,
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

defaultStory.story = { name: 'Digital Subscriptions Banner' };
