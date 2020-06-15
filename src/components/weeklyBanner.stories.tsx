import React, { ReactElement, useState } from 'react';
import { WeeklyBanner } from './modules/weeklyBanner/WeeklyBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: WeeklyBanner,
    title: 'Components/WeeklyBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    const [showBanner, toggleBanner] = useState(true);
    return (
        <StorybookWrapper>
            <>
                {showBanner && (
                    <WeeklyBanner
                        subscriptionUrl="/"
                        signInUrl="/"
                        closeBanner={(): void => toggleBanner(false)}
                    />
                )}
            </>
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Weekly Banner' };
