import React, { ReactElement } from 'react';
import { GuardianWeeklyBanner } from './GuardianWeeklyBanner';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';

export default {
    component: GuardianWeeklyBanner,
    title: 'Components/GuardianWeeklyBanner',
};

const tracking = {
    ophanPageId: 'kbluzw2csbf83eabettt',
    ophanComponentId: 'SUBSCRIPTIONS_BANNER',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'GuardianWeeklyBanner',
    abTestVariant: 'control',
    campaignCode: '',
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <GuardianWeeklyBanner tracking={tracking} isSupporter={false} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Guardian Weekly Banner' };
