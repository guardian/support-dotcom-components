import React, { ReactElement } from 'react';
import { WeeklyBanner } from './modules/weeklyBanner/WeeklyBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: WeeklyBanner,
    title: 'Components/WeeklyBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <WeeklyBanner subscriptionUrl="/" signInUrl="/" />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Weekly Banner' };
