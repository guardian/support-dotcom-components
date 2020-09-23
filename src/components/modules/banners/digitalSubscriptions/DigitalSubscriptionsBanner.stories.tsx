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
        heading: text('heading', 'Progressive journalism'),
        secondaryHeading: text('secondHeading', 'Powered by you'),
        highlightedText: text(
            'highlightedText',
            'Two apps, to discover at your pace, uninterrupted by advertising.',
        ),
        messageText: text(
            'messageText',
            'The Guardian digital subscription gives you full access to the Guardian’s Live and Daily app for you to enjoy whenever and wherever you like.',
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
