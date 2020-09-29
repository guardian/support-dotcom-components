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
        heading: text('heading', 'Start a Digital Subscription today'),
        messageText: text(
            'messageText',
            'Enjoy our journalism <strong>without ads</strong>, as well as Premium access to <strong>our Live and Editions apps</strong>. And for a few weeks only, read <strong>Edition Earth</strong>, a digital exclusive showcase of the best Guardian journalism on climate, wildlife, air pollution, environmental justice – and solutions too.',
        ),
    };

    const props: BannerProps = {
        bannerChannel: 'subscriptions',
        content,
        isSupporter: false,
        tracking,
    };

    return (
        <StorybookWrapper>
            <DigitalSubscriptionsBanner {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Digital Subscriptions Banner' };
