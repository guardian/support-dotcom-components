import React, { ReactElement } from 'react';
import { EnvironmentMomentSimpleBanner } from './EnvironmentMomentSimpleBanner';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';
import { BannerTracking } from '../../../../types/BannerTypes';

export default {
    component: EnvironmentMomentSimpleBanner,
    title: 'Components/EnvironmentMomentBannerSimple',
    decorators: [withKnobs],
};

const tracking: BannerTracking = {
    ophanPageId: 'kbluzw2csbf83eabedel',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'EnvironmentMomentBanner',
    abTestVariant: 'control',
    campaignCode: 'EnvironmentMomentBanner_simple',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
};

export const defaultStory = (): ReactElement => {
    const isSupporter = boolean('isSupporter', false);
    const isAus = boolean('isAus', false);

    return (
        <StorybookWrapper>
            <EnvironmentMomentSimpleBanner
                isSupporter={isSupporter}
                countryCode={isAus ? 'AU' : 'GB'}
                tracking={tracking}
                submitComponentEvent={(event): void => console.log(event)}
                bannerChannel="contributions"
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Environment Moment - Simple Banner' };
