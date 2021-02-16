import React, { ReactElement } from 'react';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBanner';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StorybookWrapper, BannerWrapper } from '../../../../utils/StorybookWrapper';
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
        heading: text('heading', 'Start a digital subscription today'),
        messageText: text(
            'messageText',
            "You've read %%ARTICLE_COUNT%% articles in the last year. Subscribe to enjoy our journalism <strong>without ads</strong>, as well as Premium access to <strong>our Live and Editions apps</strong>.",
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

defaultStory.story = {
    name: 'Digital Subscriptions Banner',
    decorators: [
        (Story: React.FC): ReactElement => (
            <BannerWrapper>
                <Story />
            </BannerWrapper>
        ),
    ],
};
