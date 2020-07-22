import React, { ReactElement } from 'react';
import { GuardianWeeklyBanner } from './GuardianWeeklyBanner';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';
import { BannerTracking } from '../../../../types/BannerTypes';

export default {
    component: GuardianWeeklyBanner,
    title: 'Components/GuardianWeeklyBanner',
};

const tracking: BannerTracking = {
    ophanPageId: 'kbluzw2csbf83eabettt',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'GuardianWeeklyBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    products: [],
    ophanComponentId: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER', // TODO: Remove once cached components expire
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <GuardianWeeklyBanner tracking={tracking} isSupporter={false} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Guardian Weekly Banner' };
