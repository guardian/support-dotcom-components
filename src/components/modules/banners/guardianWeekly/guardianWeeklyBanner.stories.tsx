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
    products: ['PRINT_SUBSCRIPTION'],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <GuardianWeeklyBanner
                bannerChannel="subscriptions"
                tracking={tracking}
                isSupporter={false}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Guardian Weekly Banner' };
