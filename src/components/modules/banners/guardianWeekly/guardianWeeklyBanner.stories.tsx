import React, { ReactElement } from 'react';
import { GuardianWeeklyBanner } from './GuardianWeeklyBanner';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';

export default {
    component: GuardianWeeklyBanner,
    title: 'Components/GuardianWeeklyBanner',
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <GuardianWeeklyBanner subscriptionUrl="/" signInUrl="/" />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Guardian Weekly Banner' };
