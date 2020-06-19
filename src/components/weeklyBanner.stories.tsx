import React, { ReactElement } from 'react';
import { WeeklyBanner } from './modules/weeklyBanner/WeeklyBanner';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: WeeklyBanner,
    title: 'Components/WeeklyBanner',
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <WeeklyBanner subscriptionUrl="/" signInUrl="/" />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Weekly Banner' };
