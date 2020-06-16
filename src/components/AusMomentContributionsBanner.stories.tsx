import React, { ReactElement } from 'react';
import { AusMomentContributionsBanner } from './modules/contributionsBanners/AusMomentContributionsBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: AusMomentContributionsBanner,
    title: 'Components/AusMomentContributionsBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <AusMomentContributionsBanner
                showSupportMessaging
                isRecurringContributor={false}
                numberOfSupporters={33423}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Aus Moment - non-supporters' };

export const supporter = (): ReactElement => {
    return (
        <StorybookWrapper>
            <AusMomentContributionsBanner
                showSupportMessaging
                isRecurringContributor
                numberOfSupporters={23431}
            />
        </StorybookWrapper>
    );
};

supporter.story = { name: 'Aus Moment - supporters' };
