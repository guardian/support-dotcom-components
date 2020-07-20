import React, { ReactElement } from 'react';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';

export default {
    component: DigitalSubscriptionsBanner,
    title: 'Components/DigitalSubscriptionsBanner',
    decorators: [withKnobs],
};

const tracking = {
    ophanPageId: 'kbluzw2csbf83eaberrr',
    ophanComponentId: 'SUBSCRIPTIONS_BANNER',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'DigitalSubscriptionsBanner',
    abTestVariant: 'control',
    campaignCode: '',
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <DigitalSubscriptionsBanner tracking={tracking} isSupporter={false} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Digital Subscriptions Banner' };
