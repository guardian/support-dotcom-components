import React, { ReactElement } from 'react';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';
import { BannerTracking } from '../../../../types/BannerTypes';

export default {
    component: DigitalSubscriptionsBanner,
    title: 'Components/DigitalSubscriptionsBanner',
    decorators: [withKnobs],
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
    products: [],
    ophanComponentId: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER', // TODO: Remove once cached components expire
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <DigitalSubscriptionsBanner tracking={tracking} isSupporter={false} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Digital Subscriptions Banner' };
