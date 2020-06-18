import React, { ReactElement } from 'react';
import { AusMomentContributionsBanner } from './modules/contributionsBanners/AusMomentContributionsBanner';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: AusMomentContributionsBanner,
    title: 'Components/AusMomentContributionsBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    const isSupporter = boolean('isSupporter', false);
    const totalSupporters = number('totalSuppoters', 120001);

    return (
        <StorybookWrapper>
            <AusMomentContributionsBanner
                isSupporter={isSupporter}
                totalSupporters={totalSupporters}
                showSupportMessaging
                isRecurringContributor={false}
                numberOfSupporters={33423}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Aus Moment' };
