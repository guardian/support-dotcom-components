import React, { ReactElement } from 'react';
import { MainContributionsBanner } from './modules/contributionsBanners/MainContributionsBanner';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: MainContributionsBanner,
    title: 'Components/MainContributionsBanner',
    decorators: [withKnobs],
};

const tracking = {
    ophanPageId: 'kbluzw2csbf83eabedel',
    ophanComponentId: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'MainContributionsBanner',
    abTestVariant: 'control',
    campaignCode: 'MainContributionsBanner_control',
};

const targeting = {
    alreadyVisitedCount: 0,
    shouldHideReaderRevenue: false,
    isPaidContent: false,
    showSupportMessaging: false,
    engagementBannerLastClosedAt: Date.now().toString(10),
    mvtId: 0,
    countryCode: 'GB',
};

export const defaultStory = (): ReactElement => {
    const isSupporter = boolean('isSupporter', false);

    return (
        <StorybookWrapper>
            <MainContributionsBanner
                isSupporter={isSupporter}
                tracking={tracking}
                targeting={targeting}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Main Contributions Banner' };
