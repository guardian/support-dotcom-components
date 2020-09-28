import React, { ReactElement } from 'react';
import { EnvironmentMomentBanner } from './EnvironmentMomentBanner';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';
import { BannerTracking } from '../../../../types/BannerTypes';

export default {
    component: EnvironmentMomentBanner,
    title: 'Components/EnvironmentMomentBanner',
    decorators: [withKnobs],
};

const tracking: BannerTracking = {
    ophanPageId: 'kbluzw2csbf83eabedel',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'AusMomentContributionsBanner',
    abTestVariant: 'control',
    campaignCode: 'AusMomentContributionsBanner_control',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
};

export const defaultStory = (): ReactElement => {
    const isSupporter = boolean('isSupporter', false);
    const isAus = boolean('isAus', false);

    return (
        <StorybookWrapper>
            <EnvironmentMomentBanner
                isSupporter={isSupporter}
                countryCode={isAus ? 'AU' : 'GB'}
                tracking={tracking}
                submitComponentEvent={(event): void => console.log(event)}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Environment Moment - Fancy Banner' };
